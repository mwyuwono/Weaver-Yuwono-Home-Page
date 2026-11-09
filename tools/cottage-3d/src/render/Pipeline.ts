/**
 * Pipeline — the two-stage "drawing" renderer.
 *  1. The scene is rendered once into a multiple-render-target buffer: attachment 0 = wash colour (pigment multiplier),
 *     attachment 1 = view normal.xy / ink weight / opacity (written by WashMaterial); plus a depth texture. No MSAA (it would average normals/depth).
 *  2. A full-screen composite (composite.ts) lays the wash on the paper, adds paper grain and draws the ink lines.
 *  3. Both run at a supersampled internal size (up to 2x the canvas, within a pixel budget); a tent filter brings the result to the canvas.
 * Rendering stays on demand: RenderLoop calls `render` only when something changed.
 */
import * as THREE from 'three';
import { COMPOSITE_FRAGMENT, COMPOSITE_VERTEX } from './composite';

/** Phones and small tablets skip the widest (pigment pooling) pass. */
const LITE_BELOW_PX = 600;
/** Supersampling: the G-buffer and ink pass run at SS x the canvas, a filter pass brings them down. Internal pixel budget caps SS. */
const MAX_SS = 2;
const PIXEL_BUDGET = 9e6;

const DOWN_FRAGMENT = /* glsl */ `
precision highp float;
uniform sampler2D tSrc;
uniform vec2 uOut;
uniform float uSS;
void main() {
  vec2 uv = gl_FragCoord.xy / uOut;
  if (uSS < 1.001) { gl_FragColor = vec4(texture2D(tSrc, uv).rgb, 1.0); return; }
  // 4x4 tent (radius 1 canvas px) built from bilinear taps; the output pixel centre maps exactly onto the source centre.
  vec3 sum = vec3(0.0);
  float wsum = 0.0;
  for (int j = 0; j < 4; j++) for (int i = 0; i < 4; i++) {
    vec2 o = vec2(float(i), float(j)) * 0.5 - 0.75;
    float w = (1.0 - abs(o.x) * 0.9) * (1.0 - abs(o.y) * 0.9);
    sum += w * texture2D(tSrc, uv + o / uOut).rgb;
    wsum += w;
  }
  gl_FragColor = vec4(sum / wsum, 1.0);
}
`;

/** G-buffer + ink composite targets at one internal scale. */
class Buffers {
  readonly g: THREE.WebGLRenderTarget;
  readonly comp: THREE.WebGLRenderTarget;
  constructor(readonly ss: number, w: number, h: number) {
    const depth = new THREE.DepthTexture(w, h);
    // No MSAA: resolving would average normals and depth across an edge. Supersampling plus a final filter does the smoothing.
    this.g = new THREE.WebGLRenderTarget(w, h, { count: 2, samples: 0, type: THREE.HalfFloatType, depthTexture: depth, minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter });
    this.g.textures[1].minFilter = this.g.textures[1].magFilter = THREE.NearestFilter;
    this.comp = new THREE.WebGLRenderTarget(w, h, { type: THREE.UnsignedByteType, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, depthBuffer: false });
  }
  dispose(): void { this.g.dispose(); this.g.depthTexture?.dispose(); this.comp.dispose(); }
}

export class Pipeline {
  readonly domElement: HTMLCanvasElement;
  private buffers = new Map<number, Buffers>();
  private readonly quad: THREE.Mesh;
  private readonly down: THREE.ShaderMaterial;
  private readonly quadScene = new THREE.Scene();
  private readonly quadCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private readonly uniforms: Record<string, THREE.IUniform>;
  private readonly downUniforms: Record<string, THREE.IUniform>;
  private lite: boolean | null = null;
  private size = new THREE.Vector2(1, 1);
  private fullSS = 1;
  /** Internal scale of the last frame (diagnostics). */
  lastSS = 1;

  constructor(private readonly renderer: THREE.WebGLRenderer) {
    this.domElement = renderer.domElement;
    this.uniforms = {
      tColor: { value: null },
      tNorm: { value: null },
      tDepth: { value: null },
      uRes: { value: new THREE.Vector2(1, 1) },
      uDpr: { value: 1 },
      uSS: { value: 1 },
      uNear: { value: 1 },
      uFar: { value: 1000 },
      uProjInv: { value: new THREE.Matrix4() },
      uCamWorld: { value: new THREE.Matrix4() },
    };
    this.downUniforms = { tSrc: { value: null }, uOut: { value: new THREE.Vector2(1, 1) }, uSS: { value: 1 } };
    this.down = new THREE.ShaderMaterial({ uniforms: this.downUniforms, vertexShader: 'void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }', fragmentShader: DOWN_FRAGMENT, depthTest: false, depthWrite: false });
    this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.compositeMaterial(false));
    this.quad.frustumCulled = false;
    this.quadScene.add(this.quad);
    renderer.info.autoReset = false; // several passes per frame: count them together
  }

  private compositeMaterial(lite: boolean): THREE.ShaderMaterial {
    return new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: COMPOSITE_VERTEX,
      fragmentShader: (lite ? '#define LITE\n' : '') + COMPOSITE_FRAGMENT,
      depthTest: false,
      depthWrite: false,
    });
  }

  /** Resize the canvas (CSS pixels); internal buffers are rebuilt lazily per scale. */
  setSize(width: number, height: number): void {
    this.renderer.setSize(width, height, false);
    this.renderer.getDrawingBufferSize(this.size);
    this.fullSS = Math.max(1, Math.min(MAX_SS, Math.sqrt(PIXEL_BUDGET / (this.size.x * this.size.y))));
    this.buffers.forEach((b) => b.dispose());
    this.buffers.clear();
    const lite = Math.min(width, height) < LITE_BELOW_PX;
    if (lite !== this.lite) {
      this.lite = lite;
      (this.quad.material as THREE.Material).dispose();
      this.quad.material = this.compositeMaterial(lite);
    }
  }

  /** `motion`: draw at 1x for frame rate while the view is moving; idle frames use the full supersampled scale. */
  render(scene: THREE.Scene, camera: THREE.PerspectiveCamera, motion = false): void {
    const r = this.renderer;
    const ss = motion ? 1 : this.fullSS;
    let b = this.buffers.get(ss);
    if (!b) {
      b = new Buffers(ss, Math.round(this.size.x * ss), Math.round(this.size.y * ss));
      this.buffers.set(ss, b);
    }
    this.lastSS = ss;
    const u = this.uniforms;
    u.tColor.value = b.g.textures[0];
    u.tNorm.value = b.g.textures[1];
    u.tDepth.value = b.g.depthTexture;
    (u.uRes.value as THREE.Vector2).set(b.g.width, b.g.height);
    u.uDpr.value = r.getPixelRatio() * (b.g.width / this.size.x);
    u.uSS.value = b.g.width / this.size.x;
    u.uNear.value = camera.near;
    u.uFar.value = camera.far;
    (u.uProjInv.value as THREE.Matrix4).copy(camera.projectionMatrixInverse);
    (u.uCamWorld.value as THREE.Matrix4).copy(camera.matrixWorld);

    r.info.reset();
    r.setRenderTarget(b.g);
    r.clear();
    r.render(scene, camera);
    const comp = this.quad.material as THREE.ShaderMaterial;
    r.setRenderTarget(b.comp);
    r.render(this.quadScene, this.quadCamera);
    // downsample to the canvas
    this.quad.material = this.down;
    this.downUniforms.tSrc.value = b.comp.texture;
    (this.downUniforms.uOut.value as THREE.Vector2).copy(this.size);
    this.downUniforms.uSS.value = b.g.width / this.size.x;
    r.setRenderTarget(null);
    r.render(this.quadScene, this.quadCamera);
    this.quad.material = comp;
  }

  /** Draw calls and triangles of the last frame (all passes). */
  get stats(): { calls: number; triangles: number } {
    return { calls: this.renderer.info.render.calls, triangles: this.renderer.info.render.triangles };
  }
}
