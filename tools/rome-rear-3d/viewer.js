// Renders review views of out/rome-rear.glb. Plan coordinates are feet (x east, y north, z up);
// the GLB root scales to metres, so world = (x, z, -y) * 0.3048.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const FT = 0.3048;
const W3 = (x, y, z) => new THREE.Vector3(x * FT, z * FT, -y * FT);
const q = new URLSearchParams(location.search);
const view = q.get('view') || 'orbit';
const mode = q.get('mode') || 'proposed';
if (q.has('shot')) document.body.classList.add('shot');

// view=photo&cam=<name>: camera solved from a site photo (cameras/<name>.camera.json), rendered at the photo's pixel size.
// &mask=proposed|removed: white = Proposed (or Removed) geometry, black everything else, unlit (inpainting masks).
const photoCam = view === 'photo' ? await fetch(`./cameras/${q.get('cam')}.camera.json`, { cache: 'no-store' }).then((r) => r.json()) : null;
const maskKind = q.get('mask'); // 'proposed' | 'removed' | null
const VW = photoCam ? photoCam.width : innerWidth, VH = photoCam ? photoCam.height : innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(q.has('shot') || photoCam ? 1 : Math.min(2, devicePixelRatio));
renderer.setSize(VW, VH);
if (photoCam) renderer.domElement.style.cssText = `position:fixed;left:0;top:0;width:${VW}px;height:${VH}px`;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(maskKind ? '#000000' : view === 'rear' || view === 'plan' ? '#eef0f1' : '#dfe7ec');

// lights
scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.35;
scene.add(new THREE.HemisphereLight('#eef3f8', '#8a8478', 1.15));
const sun = new THREE.DirectionalLight('#fff4e2', 2.4);
const sunFrom = view === 'rear' ? [-25, 140, 95] : view === 'plan' ? [-30, 60, 120] : [-40, 110, 70];
sun.position.copy(W3(...sunFrom));
sun.target.position.copy(W3(28, 45, 0));
sun.castShadow = true;
sun.shadow.mapSize.set(4096, 4096);
const sc = sun.shadow.camera; sc.left = -28; sc.right = 28; sc.top = 28; sc.bottom = -28; sc.near = 1; sc.far = 120;
sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.02;
scene.add(sun, sun.target);

// ---------------------------------------------------------------- procedural textures (UVs are in feet)
function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
function canvasTex(wFt, hFt, px, draw) {
  const c = document.createElement('canvas'); c.width = c.height = px;
  const g = c.getContext('2d'); draw(g, px, px / wFt, px / hFt);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(1 / wFt, 1 / hFt);
  t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  return t;
}
const shakes = (exposure, wMin, wMax, line, seed) => canvasTex(6, exposure * 12, 1024, (g, px, sx, sy) => {
  const r = rng(seed); g.fillStyle = '#e6e6e6'; g.fillRect(0, 0, px, px);
  for (let row = 0; row < 12; row++) {
    const y0 = row * exposure * sy, h = exposure * sy;
    let x = -r() * wMax * sx;
    while (x < px) {
      const w = (wMin + r() * (wMax - wMin)) * sx, v = 205 + r() * 50;
      g.fillStyle = `rgb(${v},${v},${v})`; g.fillRect(x, y0, w, h);
      g.fillStyle = `rgba(0,0,0,${line})`; g.fillRect(x, y0, Math.max(1.5, sx * 0.012), h);
      x += w;
    }
    g.fillStyle = `rgba(0,0,0,${line * 1.3})`; g.fillRect(0, y0, px, Math.max(2, sy * 0.03));
  }
});
const brick = (seed) => canvasTex(2.667, 2.667, 1024, (g, px, sx, sy) => {
  const r = rng(seed); g.fillStyle = '#d2cdc4'; g.fillRect(0, 0, px, px);
  const bw = 0.6667, bh = 0.2222, m = 0.03;
  for (let row = 0; row < 12; row++) for (let i = -1; i < 5; i++) {
    const x = (i * bw + (row % 2 ? bw / 2 : 0)) * sx, y = row * bh * sy, v = 0.8 + r() * 0.35;
    g.fillStyle = `rgb(${235 * v | 0},${222 * v | 0},${214 * v | 0})`;
    g.fillRect(x + m * sx, y + m * sy, (bw - m) * sx, (bh - m) * sy);
  }
});
const seams = canvasTex(1.5, 4, 512, (g, px, sx) => {
  g.fillStyle = '#e8e8e8'; g.fillRect(0, 0, px, px);
  g.fillStyle = '#ffffff'; g.fillRect(0, 0, 0.05 * sx, px);
  g.fillStyle = '#9a9a9a'; g.fillRect(0.05 * sx, 0, 0.04 * sx, px);
});
const clap = canvasTex(4, 3.33, 512, (g, px, sx, sy) => {
  g.fillStyle = '#ececec'; g.fillRect(0, 0, px, px);
  for (let i = 0; i < 10; i++) { const y = i * 0.333 * sy; const gr = g.createLinearGradient(0, y, 0, y + 0.333 * sy); gr.addColorStop(0, '#bdbdbd'); gr.addColorStop(0.15, '#f2f2f2'); gr.addColorStop(1, '#e2e2e2'); g.fillStyle = gr; g.fillRect(0, y, px, 0.333 * sy); }
});
const speckle = (base, spread, seed, size = 4) => canvasTex(size, size, 512, (g, px) => {
  const r = rng(seed); g.fillStyle = base; g.fillRect(0, 0, px, px);
  for (let i = 0; i < 9000; i++) { const v = 200 + r() * spread; g.fillStyle = `rgba(${v},${v},${v},.55)`; g.fillRect(r() * px, r() * px, 1 + r() * 3, 1 + r() * 3); }
});
const flags = canvasTex(8, 8, 1024, (g, px, sx) => {
  const r = rng(5); g.fillStyle = '#9a958c'; g.fillRect(0, 0, px, px);
  let y = 0;
  while (y < 8) { const h = 1.2 + r() * 1.3; let x = -r() * 2; while (x < 8) { const w = 1.4 + r() * 1.6, v = 215 + r() * 40; g.fillStyle = `rgb(${v},${v - 3},${v - 8})`; g.fillRect((x + 0.05) * sx, (y + 0.05) * sx, (w - 0.1) * sx, (h - 0.1) * sx); x += w; } y += h; }
});
const TEX = {
  shake_wall: shakes(0.46, 0.35, 0.95, 0.35, 1), roof_shake: shakes(0.52, 0.3, 1.0, 0.5, 2), clapboard: clap,
  brick: brick(3), brick_floor: brick(4), metal_roof: seams, stone: flags,
  gravel: speckle('#cfc8bd', 55, 6, 3), paving_aggregate: speckle('#c9c4bb', 50, 7, 3), lawn: speckle('#c8d0bc', 45, 8, 6), soil: speckle('#bcb2a6', 50, 9, 4),
};

// ---------------------------------------------------------------- load
const [gltf, checks] = await Promise.all([
  new GLTFLoader().loadAsync('./out/rome-rear.glb?t=' + Date.now()),
  fetch('./out/checks.json', { cache: 'no-store' }).then((r) => r.json()),
]);
const root = gltf.scene;
const inGroup = (o, re) => { for (let n = o; n && n !== root; n = n.parent) if (re.test(n.name)) return true; return false; };
const WHITE = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false }), BLACK = new THREE.MeshBasicMaterial({ color: 0x000000, toneMapped: false });
root.traverse((o) => {
  const hidden = mode === 'existing' || maskKind === 'removed' ? /^Proposed(_\d+)?$/ : /^Removed(_\d+)?$/;
  if (hidden.test(o.name)) o.visible = false;
  if (q.has('clean') && /^(Site|Garden)(_\d+)?$/.test(o.name) && o.parent && o.parent !== root) o.visible = false;
  if (!o.isMesh) return;
  if (maskKind) { o.material = inGroup(o, maskKind === 'removed' ? /^Removed(_\d+)?$/ : /^Proposed(_\d+)?$/) ? WHITE : BLACK; o.castShadow = o.receiveShadow = false; return; }
  const m = o.material, name = m.name;
  const nm = new THREE.MeshStandardMaterial({ name, color: m.color.clone(), roughness: m.roughness, metalness: m.metalness });
  if (TEX[name] && !q.has('flat')) { nm.map = TEX[name]; nm.color.multiplyScalar(1.12); }
  if (name === 'glass') nm.envMapIntensity = 1.5;
  o.material = nm; o.castShadow = !/ground|Lawn|paving|approach|paths|beds/i.test(o.name); o.receiveShadow = true;
});
scene.add(root);

// ---------------------------------------------------------------- cameras
let camera, controls = null;
const aspect = VW / VH;
function ortho(cx, cz, widthFt, from, to, up) {
  const hFt = widthFt / aspect;
  camera = new THREE.OrthographicCamera(-widthFt / 2 * FT, widthFt / 2 * FT, hFt / 2 * FT, -hFt / 2 * FT, 0.1, 400);
  camera.position.copy(from); camera.up.copy(up); camera.lookAt(to);
}
if (view === 'photo') {
  camera = new THREE.PerspectiveCamera(photoCam.vfovDeg, aspect, 0.1, 500);
  camera.position.copy(W3(...photoCam.position));
  camera.up.set(photoCam.up[0], photoCam.up[2], -photoCam.up[1]);
  camera.lookAt(W3(...photoCam.target));
} else if (view === 'rear') {
  // north elevation looking south; cut away everything north of y = 57 (retaining wall, north bed)
  ortho(0, 0, 63, W3(27.5, 140, 15.5), W3(27.5, 0, 15.5), new THREE.Vector3(0, 1, 0));
  renderer.clippingPlanes = [new THREE.Plane(new THREE.Vector3(0, 0, 1), 57 * FT)];
} else if (view === 'plan') {
  ortho(0, 0, 64, W3(28, 46, 200), W3(28, 46, 0), new THREE.Vector3(0, 0, -1));
} else {
  camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 500);
  const cs = checks.cameras.garageSide;
  const presets = {
    'garage-side': [cs.pos, [cs.target[0] - 1.5, cs.target[1] + 2, 6.2]],
    gate: [[5.5, 49, 5.4], [40, 40, 7.5]],
    axo: [[78, 92, 52], [30, 40, 8]],
    orbit: [[78, 92, 52], [30, 40, 8]],
  };
  const [p, t] = presets[view] || presets.orbit;
  camera.position.copy(W3(...p)); camera.lookAt(W3(...t));
  if (view === 'orbit') { controls = new OrbitControls(camera, renderer.domElement); controls.target.copy(W3(...t)); controls.update(); }
}

function frame() { if (controls) controls.update(); renderer.render(scene, camera); }
renderer.setAnimationLoop(controls ? frame : null);
frame();
requestAnimationFrame(() => { frame(); document.title = 'ready'; window.__ready = true; });
addEventListener('resize', () => { if (photoCam) return; renderer.setSize(innerWidth, innerHeight); frame(); });
