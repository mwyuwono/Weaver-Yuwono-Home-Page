/**
 * Entry point: loads the house data, builds the model, wires scene, animation
 * and UI together, and mounts everything into #cottage-root.
 */
import './style.css';
import * as THREE from 'three';
import { loadHouseData } from './data';
import { House } from './model/House';
import { createRenderer } from './scene/createRenderer';
import { Pipeline } from './render/Pipeline';
import { createCamera, createControls } from './scene/createCamera';
import { addLights } from './scene/lights';
import { RenderLoop } from './scene/RenderLoop';
import { ExplodeController } from './anim/ExplodeController';
import { TweenSet } from './anim/tween';
import { Controls } from './ui/Controls';
import type { QaFace } from './scene/qaView';
import { IN } from './units';

/** Camera stays this far above the terrain (feet). */
const GROUND_CLEARANCE_FT = 1.5;

function webglAvailable(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

async function start(root: HTMLElement): Promise<void> {
  const loading = document.getElementById('cottage-loading');
  if (!webglAvailable()) {
    loading?.setAttribute('hidden', '');
    document.getElementById('cottage-fallback')?.removeAttribute('hidden');
    return;
  }

  const data = await loadHouseData();
  const qa = new URLSearchParams(location.search).get('qa');
  const qaFace = (['front', 'rear', 'left', 'right'].includes(qa ?? '') ? qa : null) as QaFace | null;
  const renderer = createRenderer(root, qaFace !== null);
  const scene = new THREE.Scene();
  const camera = createCamera();
  const house = new House(data);
  let explode: ExplodeController | null = null;
  const controls = createControls(camera, renderer.domElement, (x, z) => (explode?.groundActive === false ? -Infinity : (house.grade.y(x / IN, z / IN) * IN) + GROUND_CLEARANCE_FT));
  scene.add(house.root);
  addLights(scene, house.center);

  if (qaFace) {
    // Dev-only straight-on elevation for qa/overlay.mjs; no UI, no animation.
    const { applyQaView } = await import('./scene/qaView');
    const { clientWidth: w, clientHeight: h } = root;
    renderer.setSize(w, h, false);
    const ortho = applyQaView(scene, renderer, house, data, qaFace, house.center, { w, h });
    renderer.render(scene, ortho);
    loading?.classList.add('done');
    document.body.dataset.qaReady = '1';
    return;
  }

  const tweens = new TweenSet();
  const pipeline = new Pipeline(renderer);
  const loop = new RenderLoop(pipeline, scene, camera, controls, tweens);
  explode = new ExplodeController(house, camera, controls, tweens);
  const ex = explode;

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = root;
    pipeline.setSize(w, h);
    camera.aspect = w / Math.max(h, 1);
    camera.updateProjectionMatrix();
    loop.invalidate();
  };
  resize();
  ex.snapCamera();
  new ResizeObserver(resize).observe(root);

  const ui = new Controls(root, {
    assemble: () => ex.assemble(),
    explode: () => ex.explode(),
    isolate: (id) => ex.isolate(id),
    resetView: () => ex.resetView(),
  }, data.levels.map((l) => l.id));
  ex.onState = (s) => ui.setState(s);

  loop.onFirstFrame = () => {
    console.info(`[cottage-3d] draw calls (first frame, both passes): ${pipeline.stats.calls}, triangles: ${pipeline.stats.triangles}`);
    root.setAttribute('aria-busy', 'false');
    loading?.classList.add('done');
  };
  loop.invalidate();
}

const root = document.getElementById('cottage-root');
if (root) {
  start(root).catch((err) => {
    console.error(err);
    const note = document.getElementById('cottage-loading');
    if (note) note.textContent = 'Sorry, the model could not be loaded.';
  });
}
