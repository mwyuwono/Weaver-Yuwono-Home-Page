/**
 * Entry point: loads the house data, builds the model, wires scene, animation
 * and UI together, and mounts everything into #cottage-root.
 */
import './style.css';
import * as THREE from 'three';
import { loadHouseData } from './data';
import { House } from './model/House';
import { createRenderer } from './scene/createRenderer';
import { createCamera, createControls } from './scene/createCamera';
import { addLights } from './scene/lights';
import { RenderLoop } from './scene/RenderLoop';
import { ExplodeController } from './anim/ExplodeController';
import { TweenSet } from './anim/tween';
import { Controls } from './ui/Controls';

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
  const renderer = createRenderer(root);
  const scene = new THREE.Scene();
  const camera = createCamera();
  const controls = createControls(camera, renderer.domElement);
  const house = new House(data);
  scene.add(house.root);
  addLights(scene, renderer, house.center);

  const tweens = new TweenSet();
  const loop = new RenderLoop(renderer, scene, camera, controls, tweens);
  const explode = new ExplodeController(house, camera, controls, tweens);

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = root;
    renderer.setSize(w, h, false);
    camera.aspect = w / Math.max(h, 1);
    camera.updateProjectionMatrix();
    loop.invalidate();
  };
  resize();
  explode.snapCamera();
  new ResizeObserver(resize).observe(root);

  const ui = new Controls(root, {
    assemble: () => explode.assemble(),
    explode: () => explode.explode(),
    isolate: (id) => explode.isolate(id),
    resetView: () => explode.resetView(),
  }, data.levels.map((l) => l.id));
  explode.onState = (s) => ui.setState(s);

  loop.onFirstFrame = () => {
    console.info(`[cottage-3d] draw calls (first frame): ${renderer.info.render.calls}, triangles: ${renderer.info.render.triangles}`);
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
