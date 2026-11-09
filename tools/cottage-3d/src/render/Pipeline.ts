/**
 * Pipeline — the two-stage "drawing" renderer.
 *  1. The scene is rendered once into a multiple-render-target buffer: attachment 0 = wash colour (pigment multiplier),
 *     attachment 1 = view normal.xy / ink weight / opacity (written by WashMaterial); plus a depth texture. 4x MSAA keeps sub-pixel details (standing seams) continuous.
 *  2. A full-screen composite (composite.ts) lays the wash on the paper, adds paper grain and draws the ink lines.
 * Rendering stays on demand: RenderLoop calls `render` only when something changed.
 */
import * as THREE from 'three';
import { COMPOSITE_FRAGMENT, COMPOSITE_VERTEX } from './composite';

/** Phones and small tablets skip the widest (pigment pooling) pass. */
const LITE_BELOW_PX = 600;

export class Pipeline {
  readonly domElement: HTMLCanvasElement;
  private readonly target: THREE.WebGLRenderTarget;
  private readonly quad: THREE.Mesh;
  private readonly quadScene = new THREE.Scene();
  private readonly quadCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private readonly uniforms: Record<string, THREE.IUniform>;
  private lite: boolean | null = null;

  constructor(private readonly renderer: THREE.WebGLRenderer) {
    this.domElement = renderer.domElement;
    const depth = new THREE.DepthTexture(1, 1);
    this.target = new THREE.WebGLRenderTarget(1, 1, { count: 2, samples: 4, type: THREE.HalfFloatType, depthTexture: depth, minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter });
    this.target.textures[1].minFilter = this.target.textures[1].magFilter = THREE.NearestFilter;
    this.uniforms = {
      tColor: { value: this.target.textures[0] },
      tNorm: { value: this.target.textures[1] },
      tDepth: { value: depth },
      uRes: { value: new THREE.Vector2(1, 1) },
      uDpr: { value: 1 },
      uNear: { value: 1 },
      uFar: { value: 1000 },
      uProjInv: { value: new THREE.Matrix4() },
      uCamWorld: { value: new THREE.Matrix4() },
    };
    this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.compositeMaterial(false));
    this.quadScene.add(this.quad);
    renderer.info.autoReset = false; // two passes per frame: count them together
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

  /** Resize the canvas (CSS pixels) and the buffers (device pixels). */
  setSize(width: number, height: number): void {
    this.renderer.setSize(width, height, false);
    const size = this.renderer.getDrawingBufferSize(new THREE.Vector2());
    this.target.setSize(size.x, size.y);
    (this.uniforms.uRes.value as THREE.Vector2).copy(size);
    this.uniforms.uDpr.value = this.renderer.getPixelRatio();
    const lite = Math.min(width, height) < LITE_BELOW_PX;
    if (lite !== this.lite) {
      this.lite = lite;
      (this.quad.material as THREE.Material).dispose();
      this.quad.material = this.compositeMaterial(lite);
    }
  }

  render(scene: THREE.Scene, camera: THREE.PerspectiveCamera): void {
    const r = this.renderer;
    r.info.reset();
    r.setRenderTarget(this.target);
    r.clear();
    r.render(scene, camera);
    r.setRenderTarget(null);
    this.uniforms.uNear.value = camera.near;
    this.uniforms.uFar.value = camera.far;
    (this.uniforms.uProjInv.value as THREE.Matrix4).copy(camera.projectionMatrixInverse);
    (this.uniforms.uCamWorld.value as THREE.Matrix4).copy(camera.matrixWorld);
    r.render(this.quadScene, this.quadCamera);
  }

  /** Draw calls and triangles of the last frame (both passes). */
  get stats(): { calls: number; triangles: number } {
    return { calls: this.renderer.info.render.calls, triangles: this.renderer.info.render.triangles };
  }
}
