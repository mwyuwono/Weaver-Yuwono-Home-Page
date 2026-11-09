/**
 * Pipeline — the forward "drawing" renderer.
 *  1. Wash materials (pigment multiplier) and vector linework (ink) render
 *     together into one MSAA target. Faces carry polygonOffset so coplanar
 *     lines win the depth test; occluded lines lose it (hidden-line removal).
 *  2. A full-screen paper pass (composite.ts) lays the wash on the paper and
 *     adds grain, granulation and vignette.
 * Every frame is full quality — there is no supersampling, no motion/idle
 * split, and no tent downsample. Rendering stays on demand: RenderLoop calls
 * `render` only when something changed.
 */
import * as THREE from 'three';
import { PAPER_FRAGMENT, PAPER_VERTEX } from './composite';
import { updateLineUniforms, type CottageLineMaterial } from './lines';

const isLineMaterial = (m: unknown): m is CottageLineMaterial =>
  (m as { isLineMaterial?: boolean }).isLineMaterial === true &&
  'userData' in (m as object) &&
  typeof (m as CottageLineMaterial).userData.tier === 'string';

export class Pipeline {
  readonly domElement: HTMLCanvasElement;
  private target: THREE.WebGLRenderTarget | null = null;
  private readonly quad: THREE.Mesh;
  private readonly uniforms: Record<string, THREE.IUniform> = {
    tWash: { value: null },
    uDpr: { value: 1 },
  };
  private readonly quadScene = new THREE.Scene();
  private readonly quadCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private readonly size = new THREE.Vector2(1, 1);
  private dpr = 1;
  private lines: CottageLineMaterial[] | null = null;

  constructor(private readonly renderer: THREE.WebGLRenderer) {
    this.domElement = renderer.domElement;
    const mat = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: PAPER_VERTEX,
      fragmentShader: PAPER_FRAGMENT,
      depthTest: false,
      depthWrite: false,
    });
    this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
    this.quad.frustumCulled = false;
    this.quadScene.add(this.quad);
    renderer.info.autoReset = false; // the scene pass and the paper quad count together
  }

  /** Resize the canvas (CSS px); the MSAA target follows the drawing buffer. */
  setSize(width: number, height: number): void {
    this.renderer.setSize(width, height, false);
    this.renderer.getDrawingBufferSize(this.size);
    this.dpr = this.renderer.getPixelRatio();
    this.target?.dispose();
    this.target = new THREE.WebGLRenderTarget(this.size.x, this.size.y, { samples: 4, depthBuffer: true });
    this.uniforms.uDpr.value = this.dpr;
    this.lines = null; // re-collect (materials are stable, but cheap to redo)
  }

  /**
   * `motion` is kept for the RenderLoop call signature; every frame renders
   * at full quality, so it is ignored.
   */
  render(scene: THREE.Scene, camera: THREE.PerspectiveCamera, _motion = false): void {
    const r = this.renderer;
    if (!this.target) return;
    if (!this.lines) {
      const found: CottageLineMaterial[] = [];
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (mesh instanceof THREE.Mesh && isLineMaterial(mesh.material)) found.push(mesh.material);
      });
      this.lines = found;
    }
    for (const m of this.lines) {
      updateLineUniforms(m, this.size.x, this.size.y, camera.fov, this.dpr);
    }

    r.info.reset();
    r.setRenderTarget(this.target);
    r.setClearColor(0xffffff, 1); // bare paper: the wash is a multiplier on this
    r.clear();
    r.render(scene, camera);
    this.uniforms.tWash.value = this.target.texture;
    r.setRenderTarget(null);
    r.render(this.quadScene, this.quadCamera);
  }

  /** Draw calls and triangles of the last frame (both passes). */
  get stats(): { calls: number; triangles: number } {
    return { calls: this.renderer.info.render.calls, triangles: this.renderer.info.render.triangles };
  }
}
