/**
 * Entry point: loads the house data, builds the model, wires scene, animation
 * and UI together, and mounts everything into #cottage-root.
 */
import './style.css';
import * as THREE from 'three';
import { loadHouseData } from './data';
import { loadBakedLines } from './data/lines';
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
import type { LevelId } from './data/schema';

/** Camera stays this far above the terrain (feet). */
const GROUND_CLEARANCE_FT = 1.5;

/**
 * `?embed=1`: the model runs inside an iframe on the case page. Inline it has no chrome, no wheel/pinch zoom and
 * lets vertical swipes scroll the page; the parent posts `cottage:mode` = 'full' when the visitor expands it, which
 * brings back the control bar and full orbit/zoom. On load it sways gently to show it is a live 3D object.
 */
const EMBED = new URLSearchParams(location.search).get('embed') === '1';
const REDUCE_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const SWAY_AMPLITUDE = THREE.MathUtils.degToRad(10); // each way, about the vertical axis
const SWAY_PERIOD_MS = 9000;
const SWAY_CYCLES = 3; // then it settles back to the hero angle and the loop sleeps
const SWAY_RAMP_MS = 2500;

function toParent(type: string): void {
  if (EMBED && window.parent !== window) window.parent.postMessage({ type }, location.origin);
}

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
  if (EMBED) document.body.classList.add('embed');
  if (!webglAvailable()) {
    loading?.setAttribute('hidden', '');
    document.getElementById('cottage-fallback')?.removeAttribute('hidden');
    toParent('cottage:unavailable');
    return;
  }

  const [data, baked] = await Promise.all([loadHouseData(), loadBakedLines()]);
  const qa = new URLSearchParams(location.search).get('qa');
  const qaFace = (['front', 'rear', 'left', 'right'].includes(qa ?? '') ? qa : null) as QaFace | null;
  const renderer = createRenderer(root, qaFace !== null);
  const scene = new THREE.Scene();
  const camera = createCamera();
  const house = new House(data, { baked });
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

  let reframe = false; // set when the embed changes mode: re-fit the model once the new size lands
  const resize = () => {
    const { clientWidth: w, clientHeight: h } = root;
    pipeline.setSize(w, h);
    camera.aspect = w / Math.max(h, 1);
    camera.updateProjectionMatrix();
    if (reframe) { reframe = false; ex.resetView(); }
    loop.invalidate();
  };
  resize();
  ex.snapCamera();
  // QA: `?cam=px,py,pz,tx,ty,tz` (house inches) places the camera for close-up screenshots (qa/shots.mjs cam).
  // `?state=exploded|basement|first|second` starts in that view state.
  const st = new URLSearchParams(location.search).get('state');
  if (st === 'exploded') ex.explode();
  else if (data.levels.some((l) => l.id === st)) ex.isolate(st as LevelId);
  const cam = new URLSearchParams(location.search).get('cam')?.split(',').map(Number);
  if (cam?.length === 6 && cam.every(Number.isFinite)) {
    tweens.cancel('camera');
    camera.position.set(cam[0] * IN, cam[1] * IN, cam[2] * IN);
    controls.target.set(cam[3] * IN, cam[4] * IN, cam[5] * IN);
    controls.update();
  }
  new ResizeObserver(resize).observe(root);

  const ui = new Controls(root, {
    assemble: () => ex.assemble(),
    explode: () => ex.explode(),
    isolate: (id) => ex.isolate(id),
    resetView: () => ex.resetView(),
    plate: (id) => ex.plate(id),
  }, data.levels.map((l) => l.id));
  ex.onState = (s) => ui.setState(s);
  ui.setState(ex.state);
  ex.insets = () => { // header at the top, control bar at the bottom (plus a little air); hidden ones take no room
    const rect = root.getBoundingClientRect();
    const shown = (sel: string) => { const n = document.querySelector(sel); return n && n.getClientRects().length ? n.getBoundingClientRect() : null; };
    const header = shown('.site-header')?.bottom ?? rect.top;
    const bar = shown('.ctl-bar')?.top ?? rect.bottom;
    const overlay = EMBED && !document.body.classList.contains('full') ? 48 : 0; // the case page's buttons (inline)
    return { top: Math.max(0, header - rect.top) + 8, bottom: Math.max(0, rect.bottom - bar) + 8 + overlay, height: rect.height };
  };

  if (EMBED) {
    const canvas = renderer.domElement;
    let swaying = !REDUCE_MOTION;
    const setMode = (full: boolean) => {
      document.body.classList.toggle('full', full);
      ex.pad = full ? 1.12 : 0.78; // inline: fill the frame, less paper around the house
      ex.insetAssembled = !full; // inline: keep the house clear of the case page's buttons along the bottom
      controls.enableZoom = full;
      canvas.style.touchAction = full ? 'none' : 'pan-y'; // inline: vertical swipes scroll the page, sideways ones orbit
      swaying = false;
      reframe = true;
      window.setTimeout(() => { if (reframe) { reframe = false; ex.resetView(); } }, 300); // in case the size did not change
    };
    setMode(false);
    reframe = false;
    ex.snapCamera(); // re-fit with the inline framing
    swaying = !REDUCE_MOTION;
    window.addEventListener('message', (e) => {
      if (e.origin !== location.origin || e.data?.type !== 'cottage:mode') return;
      setMode(e.data.mode === 'full');
      if (e.data.explode) ex.explode(); // "Explore interior": open full screen with the floors separated
      else if (e.data.mode !== 'full') ex.assemble();
    });
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && document.body.classList.contains('full')) toParent('cottage:close'); });
    controls.addEventListener('start', () => { swaying = false; });

    // Idle sway: swing the camera about the orbit pivot, easing in and back out to the hero angle. Elapsed time is
    // accumulated per drawn frame (capped), so the motion resumes smoothly after the canvas was off screen.
    const axis = new THREE.Vector3(0, 1, 0), offset = new THREE.Vector3();
    const total = SWAY_PERIOD_MS * SWAY_CYCLES;
    const smooth = (x: number) => { const t = Math.min(Math.max(x, 0), 1); return t * t * (3 - 2 * t); };
    let elapsed = 0, last = -1, applied = 0;
    loop.ambient = (now) => {
      if (!swaying || elapsed >= total) { last = -1; return false; }
      if (last >= 0) elapsed = Math.min(total, elapsed + Math.min(now - last, 50));
      last = now;
      const env = smooth(elapsed / SWAY_RAMP_MS) * (1 - smooth((elapsed - (total - SWAY_RAMP_MS * 1.5)) / (SWAY_RAMP_MS * 1.5)));
      const angle = SWAY_AMPLITUDE * env * Math.sin((2 * Math.PI * elapsed) / SWAY_PERIOD_MS);
      offset.subVectors(camera.position, controls.target).applyAxisAngle(axis, angle - applied);
      camera.position.copy(controls.target).add(offset);
      applied = angle;
      return true;
    };
  }

  loop.onFirstFrame = () => {
    console.info(`[cottage-3d] draw calls (first frame, all passes): ${pipeline.stats.calls}, triangles: ${pipeline.stats.triangles}, segments: ${house.lineSegments}`);
    root.setAttribute('aria-busy', 'false');
    loading?.classList.add('done');
    toParent('cottage:ready');
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
