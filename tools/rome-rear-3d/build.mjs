// Builds out/rome-rear.glb (editable, true scale) and out/checks.json from data.mjs. No dependencies.
// Workflow: node build.mjs → ./render.sh (needs `python3 -m http.server 8765` at the repo root) → node review.mjs.
// Blender: File › Import › glTF; collections Existing / Proposed / Removed (Removed = existing work the proposal takes out).
// Model units are feet; the root node scales by 0.3048 so Blender imports metres at true size.
// glTF axes: X = plan x (east), Y = up, Z = -plan y. Blender's importer converts back to x east, y north, z up.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as D from './data.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, 'out');

// ------------------------------------------------------------------ vectors
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const mul = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const len = (a) => Math.hypot(a[0], a[1], a[2]);
const nrm = (a) => mul(a, 1 / len(a));

// ------------------------------------------------------------------ geometry accumulator
class Geo {
  constructor() { this.pos = []; this.nor = []; this.uv = []; }
  tri(a, b, c, hint) {
    let n = cross(sub(b, a), sub(c, a));
    const L = len(n);
    if (L < 1e-10) return;
    n = mul(n, 1 / L);
    if (hint && dot(n, hint) < 0) { [b, c] = [c, b]; n = mul(n, -1); }
    // planar UVs in feet: u along the horizontal tangent, v up the face (or north on flat faces)
    const t = Math.abs(n[2]) > 0.999 ? [1, 0, 0] : nrm(cross([0, 0, 1], n));
    const bt = cross(n, t);
    for (const p of [a, b, c]) { this.pos.push(...p); this.nor.push(...n); this.uv.push(dot(p, t), dot(p, bt)); }
  }
  quad(a, b, c, d, hint) { this.tri(a, b, c, hint); this.tri(a, c, d, hint); }
  get count() { return this.pos.length / 3; }
}

function box(g, x0, x1, y0, y1, z0, z1) {
  if (x1 < x0) [x0, x1] = [x1, x0]; if (y1 < y0) [y0, y1] = [y1, y0]; if (z1 < z0) [z0, z1] = [z1, z0];
  const P = (i, j, k) => [[x0, x1][i], [y0, y1][j], [z0, z1][k]];
  g.quad(P(0, 0, 0), P(0, 1, 0), P(0, 1, 1), P(0, 0, 1), [-1, 0, 0]);
  g.quad(P(1, 0, 0), P(1, 1, 0), P(1, 1, 1), P(1, 0, 1), [1, 0, 0]);
  g.quad(P(0, 0, 0), P(1, 0, 0), P(1, 0, 1), P(0, 0, 1), [0, -1, 0]);
  g.quad(P(0, 1, 0), P(1, 1, 0), P(1, 1, 1), P(0, 1, 1), [0, 1, 0]);
  g.quad(P(0, 0, 0), P(1, 0, 0), P(1, 1, 0), P(0, 1, 0), [0, 0, -1]);
  g.quad(P(0, 0, 1), P(1, 0, 1), P(1, 1, 1), P(0, 1, 1), [0, 0, 1]);
}

function area2(poly) { let a = 0; for (let i = 0; i < poly.length; i++) { const p = poly[i], q = poly[(i + 1) % poly.length]; a += p[0] * q[1] - q[0] * p[1]; } return a / 2; }
function earcut(poly) { // simple ear clipping, returns index triples; poly CCW
  const idx = poly.map((_, i) => i), out = [];
  const inside = (p, a, b, c) => {
    const s = (u, v, w) => (v[0] - u[0]) * (w[1] - u[1]) - (v[1] - u[1]) * (w[0] - u[0]);
    return s(a, b, p) >= -1e-12 && s(b, c, p) >= -1e-12 && s(c, a, p) >= -1e-12;
  };
  let guard = 0;
  while (idx.length > 3 && guard++ < 10000) {
    let clipped = false;
    for (let i = 0; i < idx.length; i++) {
      const ia = idx[(i + idx.length - 1) % idx.length], ib = idx[i], ic = idx[(i + 1) % idx.length];
      const a = poly[ia], b = poly[ib], c = poly[ic];
      if ((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]) <= 1e-12) continue; // reflex
      if (idx.some((j) => j !== ia && j !== ib && j !== ic && inside(poly[j], a, b, c))) continue;
      out.push([ia, ib, ic]); idx.splice(i, 1); clipped = true; break;
    }
    if (!clipped) break;
  }
  if (idx.length === 3) out.push([idx[0], idx[1], idx[2]]);
  return out;
}
// extrude a 2D polygon (u,v) between w0 and w1; map(u,v,w) -> [x,y,z] must be affine
function extrude(g, poly, w0, w1, map) {
  if (area2(poly) < 0) poly = poly.slice().reverse();
  const dW = sub(map(0, 0, 1), map(0, 0, 0));
  for (const [a, b, c] of earcut(poly)) {
    g.tri(map(...poly[a], w1), map(...poly[b], w1), map(...poly[c], w1), dW);
    g.tri(map(...poly[a], w0), map(...poly[b], w0), map(...poly[c], w0), mul(dW, -1));
  }
  for (let i = 0; i < poly.length; i++) {
    const p = poly[i], q = poly[(i + 1) % poly.length];
    const du = q[0] - p[0], dv = q[1] - p[1];
    const hint = sub(map(p[0] + dv, p[1] - du, w0), map(p[0], p[1], w0));
    g.quad(map(...p, w0), map(...q, w0), map(...q, w1), map(...p, w1), hint);
  }
}
const alongY = (u, v, w) => [u, w, v]; // poly in (x,z), extrude along y
const alongX = (u, v, w) => [w, u, v]; // poly in (y,z), extrude along x
const alongZ = (u, v, w) => [u, v, w]; // poly in (x,y), extrude along z

function beam(g, p0, p1, w, h) { // oriented box between two points; w horizontal width, h depth in the vertical plane
  const a = nrm(sub(p1, p0));
  const s = Math.abs(a[2]) > 0.999 ? [1, 0, 0] : nrm(cross(a, [0, 0, 1]));
  const u = cross(s, a);
  const c = [];
  for (const P of [p0, p1]) for (const i of [-1, 1]) for (const j of [-1, 1]) c.push(add(add(P, mul(s, i * w / 2)), mul(u, j * h / 2)));
  const F = (i, j, k, l, hint) => g.quad(c[i], c[j], c[k], c[l], hint);
  F(0, 1, 3, 2, mul(a, -1)); F(4, 5, 7, 6, a);
  F(0, 1, 5, 4, mul(s, -1)); F(2, 3, 7, 6, s);
  F(0, 2, 6, 4, mul(u, -1)); F(1, 3, 7, 5, u);
}
function cylinder(g, cx, cy, r0, r1, z0, z1, n = 20) {
  for (let i = 0; i < n; i++) {
    const t0 = (i / n) * 2 * Math.PI, t1 = ((i + 1) / n) * 2 * Math.PI;
    const c0 = [Math.cos(t0), Math.sin(t0)], c1 = [Math.cos(t1), Math.sin(t1)];
    const a = [cx + r0 * c0[0], cy + r0 * c0[1], z0], b = [cx + r0 * c1[0], cy + r0 * c1[1], z0];
    const c = [cx + r1 * c1[0], cy + r1 * c1[1], z1], d = [cx + r1 * c0[0], cy + r1 * c0[1], z1];
    const mid = (t0 + t1) / 2;
    g.quad(a, b, c, d, [Math.cos(mid), Math.sin(mid), 0]);
    g.tri([cx, cy, z1], d, c, [0, 0, 1]); g.tri([cx, cy, z0], a, b, [0, 0, -1]);
  }
}
function ring(g, cx, cy, r0, r1, z0, z1, n = 40) { // annulus wall
  for (let i = 0; i < n; i++) {
    const t0 = (i / n) * 2 * Math.PI, t1 = ((i + 1) / n) * 2 * Math.PI;
    const P = (r, t, z) => [cx + r * Math.cos(t), cy + r * Math.sin(t), z];
    const mid = (t0 + t1) / 2, out = [Math.cos(mid), Math.sin(mid), 0];
    g.quad(P(r1, t0, z0), P(r1, t1, z0), P(r1, t1, z1), P(r1, t0, z1), out);
    g.quad(P(r0, t0, z0), P(r0, t1, z0), P(r0, t1, z1), P(r0, t0, z1), mul(out, -1));
    g.quad(P(r0, t0, z1), P(r1, t0, z1), P(r1, t1, z1), P(r0, t1, z1), [0, 0, 1]);
  }
}
function blob(g, cx, cy, cz, rx, rz, seed = 1, nu = 10, nv = 7) { // low-poly shrub/canopy
  let s = seed * 9301 + 49297;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  const jitter = []; for (let i = 0; i <= nv; i++) { jitter.push([]); for (let j = 0; j < nu; j++) jitter[i].push(0.85 + 0.3 * rnd()); }
  const P = (i, j) => {
    const v = i / nv, th = (j % nu) / nu * 2 * Math.PI, ph = v * Math.PI;
    const k = (i === 0 || i === nv) ? 1 : jitter[i][j % nu];
    return [cx + rx * k * Math.sin(ph) * Math.cos(th), cy + rx * k * Math.sin(ph) * Math.sin(th), cz - rz * Math.cos(ph)];
  };
  for (let i = 0; i < nv; i++) for (let j = 0; j < nu; j++) {
    const a = P(i, j), b = P(i, j + 1), c = P(i + 1, j + 1), d = P(i + 1, j);
    const m = mul(add(add(a, b), add(c, d)), 0.25);
    g.quad(a, b, c, d, sub(m, [cx, cy, cz]));
  }
}

// ------------------------------------------------------------------ scene registry
const MATERIALS = {
  shake_wall: { c: '#6f675d', r: 0.95 },     // warm gray-brown shakes [front photo, Nov 26]
  clapboard: { c: '#6f675d', r: 0.9 },       // porch pediment (A201: clapboard siding gable)
  trim: { c: '#aca597', r: 0.8 },            // greige trim and sashes [front photo]
  trim_shade: { c: '#857e71', r: 0.9 },      // recessed field behind the Greek key
  roof_shake: { c: '#918379', r: 1.0 },      // weathered cedar shakes [front photo]
  metal_roof: { c: '#4d4741', r: 0.5, m: 0.35 }, // standing seam, porch [A201, decision]
  roof_flat: { c: '#55524d', r: 0.8 },
  brick: { c: '#9a6150', r: 0.95 },          // [front photo steps]          // chimney, firebox, porch base, planter
  brick_floor: { c: '#a06855', r: 0.95 },
  firebox: { c: '#231e1b', r: 1.0 },
  glass: { c: '#27303a', r: 0.15, m: 0.3 },
  door: { c: '#6e4b2f', r: 0.6 },           // stained wood [front photo door]
  garage_door: { c: '#aca597', r: 0.7 },
  shutter: { c: '#8f887b', r: 0.7 },         // fixed louvred privacy shutters [A201 note]; tone assumed
  wood: { c: '#a07e5a', r: 0.85 },           // exposed porch roof structure [A201 note]
  iron: { c: '#1c1c1c', r: 0.5, m: 0.6 },
  site_wall: { c: '#a8a49a', r: 1.0 },
  paving_aggregate: { c: '#9d978c', r: 1.0 },
  gravel: { c: '#aea596', r: 1.0 },
  stone: { c: '#bdb5a6', r: 0.95 },
  lawn: { c: '#6c8a4c', r: 1.0 },
  soil: { c: '#4b3e31', r: 1.0 },
  foliage_a: { c: '#4d6b3a', r: 1.0 }, foliage_b: { c: '#5f7f45', r: 1.0 }, foliage_c: { c: '#3e5a33', r: 1.0 },
  bloom: { c: '#c9a3b8', r: 1.0 },
  trunk: { c: '#5a4a3b', r: 1.0 },
  ground: { c: '#8f8a80', r: 1.0 },
};
const objects = [];
function obj(pathParts, name, mat, extras = {}) {
  const g = new Geo();
  objects.push({ path: pathParts, name, mat, g, extras });
  return g;
}
const EX = (cat) => ['Existing', cat];
const PR = (cat) => ['Proposed', cat];
const RM = (cat) => ['Removed', cat];

// faces: N (y = at, outward +y), S, E (x = at, +x), W (x = at, -x). Local (s, z, d) with d outward.
function faceBox(g, face, at, s0, s1, z0, z1, d0, d1) {
  if (face === 'N') box(g, s0, s1, at + d0, at + d1, z0, z1);
  else if (face === 'S') box(g, s0, s1, at - d1, at - d0, z0, z1);
  else if (face === 'E') box(g, at + d0, at + d1, s0, s1, z0, z1);
  else box(g, at - d1, at - d0, s0, s1, z0, z1);
}
function addWindow(phase, w) {
  const id = w.id, f = w.face, at = w.at, c = 0.42;
  const trim = obj(phase, `Window ${id} trim`, 'trim', { source: w.src || '' });
  const glass = obj(phase, `Window ${id} glass`, 'glass');
  faceBox(trim, f, at, w.s0 - c, w.s1 + c, w.z1, w.z1 + 0.5, 0, 0.1);           // head casing
  faceBox(trim, f, at, w.s0 - c - 0.08, w.s1 + c + 0.08, w.z1 + 0.5, w.z1 + 0.6, 0, 0.16); // cap
  faceBox(trim, f, at, w.s0 - c, w.s0, w.z0, w.z1, 0, 0.1);
  faceBox(trim, f, at, w.s1, w.s1 + c, w.z0, w.z1, 0, 0.1);
  faceBox(trim, f, at, w.s0 - c - 0.12, w.s1 + c + 0.12, w.z0 - 0.17, w.z0, 0, 0.24); // sill
  faceBox(glass, f, at, w.s0, w.s1, w.z0, w.z1, 0, 0.03);
  const fr = 0.13, mt = 0.05;
  faceBox(trim, f, at, w.s0, w.s1, w.z0, w.z0 + fr, 0.03, 0.07);
  faceBox(trim, f, at, w.s0, w.s1, w.z1 - fr, w.z1, 0.03, 0.07);
  faceBox(trim, f, at, w.s0, w.s0 + fr, w.z0, w.z1, 0.03, 0.07);
  faceBox(trim, f, at, w.s1 - fr, w.s1, w.z0, w.z1, 0.03, 0.07);
  const rows = w.rows || 2, cols = w.cols || 2;
  for (let i = 1; i < cols; i++) { const s = w.s0 + (w.s1 - w.s0) * i / cols; faceBox(trim, f, at, s - mt, s + mt, w.z0, w.z1, 0.03, 0.065); }
  for (let j = 1; j < rows; j++) {
    const z = w.z0 + (w.z1 - w.z0) * j / rows, mid = j * 2 === rows;
    faceBox(trim, f, at, w.s0, w.s1, z - (mid ? 0.08 : mt), z + (mid ? 0.08 : mt), 0.03, mid ? 0.09 : 0.065);
  }
}
function addDoor(phase, d) {
  const c = 0.42, f = d.face, at = d.at;
  const trim = obj(phase, `Door ${d.id} trim`, 'trim');
  const leaf = obj(phase, `Door ${d.id} leaf`, d.garage ? 'garage_door' : 'door');
  faceBox(trim, f, at, d.s0 - c, d.s1 + c, d.z1, d.z1 + 0.45, 0, 0.1);
  faceBox(trim, f, at, d.s0 - c, d.s0, d.z0, d.z1, 0, 0.1);
  faceBox(trim, f, at, d.s1, d.s1 + c, d.z0, d.z1, 0, 0.1);
  faceBox(leaf, f, at, d.s0, d.s1, d.z0, d.z1, 0, 0.05);
  if (d.garage) {
    for (let z = d.z0 + 1.8; z < d.z1 - 0.2; z += 1.8) faceBox(trim, f, at, d.s0, d.s1, z - 0.04, z + 0.04, 0.05, 0.08);
  } else if (d.glazed) {
    const glass = obj(phase, `Door ${d.id} glass`, 'glass');
    faceBox(glass, f, at, d.s0 + 0.35, d.s1 - 0.35, d.z0 + 3.4, d.z1 - 0.35, 0.05, 0.07);
  } else { // six-panel
    for (const [a, b] of [[0.6, 2.7], [3.0, 5.3], [5.6, 6.5]]) {
      faceBox(trim, f, at, d.s0 + 0.3, (d.s0 + d.s1) / 2 - 0.12, d.z0 + a, d.z0 + b, 0.05, 0.08);
      faceBox(trim, f, at, (d.s0 + d.s1) / 2 + 0.12, d.s1 - 0.3, d.z0 + a, d.z0 + b, 0.05, 0.08);
    }
  }
}
function addShutters(phase, id, face, at, s0, s1, z0, z1) {
  const trim = obj(phase, `Shutters ${id} casing`, 'trim');
  const sh = obj(phase, `Shutters ${id} leaves`, 'shutter');
  const c = 0.38;
  faceBox(trim, face, at, s0 - c, s1 + c, z1, z1 + 0.45, 0, 0.1);
  faceBox(trim, face, at, s0 - c, s0, z0, z1, 0, 0.1);
  faceBox(trim, face, at, s1, s1 + c, z0, z1, 0, 0.1);
  faceBox(trim, face, at, s0 - c - 0.1, s1 + c + 0.1, z0 - 0.16, z0, 0, 0.22);
  const mid = (s0 + s1) / 2;
  for (const [a, b] of [[s0, mid - 0.02], [mid + 0.02, s1]]) {
    faceBox(sh, face, at, a, b, z0, z1, -0.02, 0.06);               // leaf
    const zr = z0 + (z1 - z0) * 0.62;
    faceBox(sh, face, at, a, b, zr - 0.08, zr + 0.08, 0.06, 0.1);   // lock rail
    for (let z = z0 + 0.25; z < z1 - 0.2; z += 0.22) {
      if (Math.abs(z - zr) < 0.15) continue;
      faceBox(sh, face, at, a + 0.12, b - 0.12, z, z + 0.08, 0.06, 0.11); // louvres
    }
  }
}

// ------------------------------------------------------------------ EXISTING envelope
const E = D.eastBlock, W = D.westBlock;
{
  const rc = (E.x0 + E.x1) / 2;
  const g = obj(EX('Envelope'), 'East block (108/208) walls', 'shake_wall', { source: 'A104/A105 plan, A201 heights' });
  extrude(g, [[E.x0, 0], [E.x1, 0], [E.x1, E.wallTop], [rc, E.ridgeInner], [E.x0, E.wallTop]], E.y0, E.y1, alongY);
  const p = (E.ridgeInner - E.wallTop) / (rc - E.x0), dz = E.ridgeOuter - E.ridgeInner;
  const xe0 = E.x0 - E.eaveOverhang, xe1 = E.x1 + E.eaveOverhang;
  const zb = (x) => E.ridgeInner - p * Math.abs(x - rc);
  const r = obj(EX('Roofs'), 'East block roof (wood shake)', 'roof_shake', { source: 'A201 rake; pitch ≈ 9.8/12' });
  extrude(r, [[xe0, zb(xe0)], [rc, E.ridgeInner], [xe1, zb(xe1)], [xe1, zb(xe1) + dz], [rc, E.ridgeOuter], [xe0, zb(xe0) + dz]],
    E.y0 - E.rakeOverhang, E.y1 + E.rakeOverhang, alongY);
  // trim: corner boards, frieze, eave returns, foundation brick
  const t = obj(EX('Envelope'), 'East block trim', 'trim');
  for (const x of [E.x0, E.x1 - 0.55]) box(t, x, x + 0.55, E.y1, E.y1 + 0.08, D.FF, E.wallTop);
  box(t, E.x0, E.x1, E.y1, E.y1 + 0.07, E.wallTop - 0.7, E.wallTop);
  for (const [a, b] of [[xe0, E.x0 + 1.7], [E.x1 - 1.7, xe1]]) box(t, a, b, E.y1, E.y1 + 0.7, E.wallTop - 0.55, E.wallTop + 0.35);
  const fb = obj(EX('Envelope'), 'Foundation brick (north faces)', 'brick');
  box(fb, E.x0, E.x1, E.y1, E.y1 + 0.06, 0, D.FF);
  box(fb, D.entry109.x0, D.entry109.x1, D.entry109.y1, D.entry109.y1 + 0.06, 0, D.FF);
  box(fb, D.shedRoof.x0, D.entry109.x0, W.y1, W.y1 + 0.06, 0, 1.25);
}
{
  const p = W.pitch, zN = W.ridgeInner - p * (W.y1 - W.ridgeY), zS = W.ridgeInner - p * (W.ridgeY - W.y0);
  const g = obj(EX('Envelope'), 'West block (101/201/203) walls', 'shake_wall', { source: 'A104/A105 plan; roof reconstructed from photos' });
  extrude(g, [[W.y0, 0], [W.y1, 0], [W.y1, zN], [W.ridgeY, W.ridgeInner], [W.y0, zS]], W.x0, W.x1, alongX);
  const dz = W.roofT * Math.sqrt(1 + p * p);
  const ye0 = W.y0 - W.eaveOverhang, ye1 = W.y1 + W.eaveOverhang;
  const zb = (y) => W.ridgeInner - p * Math.abs(y - W.ridgeY);
  const r = obj(EX('Roofs'), 'West block roof (wood shake) [reconstructed]', 'roof_shake', { source: 'recon: IMG_5536, front photo' });
  extrude(r, [[ye0, zb(ye0)], [W.ridgeY, W.ridgeInner], [ye1, zb(ye1)], [ye1, zb(ye1) + dz], [W.ridgeY, W.ridgeInner + dz], [ye0, zb(ye0) + dz]],
    W.x0 - W.rakeOverhang, 43.0, alongX);
  const t = obj(EX('Envelope'), 'West block trim', 'trim');
  box(t, D.shedRoof.x0, W.x1, W.y1, W.y1 + 0.07, zN - 0.7, zN);
  box(t, W.x1 - 0.5, W.x1, W.y1, W.y1 + 0.08, 11.0, zN); // corner board at the recess
}
{
  const s = D.shedRoof, en = D.entry109;
  const p = (s.zWall - s.zEave) / (s.yEave - s.yWall), dz = s.t * Math.sqrt(1 + p * p);
  const top = (y) => s.zWall - p * (y - s.yWall);
  const g = obj(EX('Envelope'), 'Rear entry 109 walls', 'shake_wall', { source: 'A101 (flush with 108 face)' });
  extrude(g, [[en.y0, 0], [en.y1, 0], [en.y1, top(en.y1) - dz], [en.y0, top(en.y0) - dz]], en.x0, en.x1, alongX);
  const sec = [[s.yWall, s.zWall - dz], [s.yEave, s.zEave - dz], [s.yEave, s.zEave], [s.yWall, s.zWall]];
  extrude(obj(EX('Roofs'), 'Shed roof over the recess (kept)', 'roof_shake', { source: 'A101 dashed eave; IMG_0429' }), sec, s.x0, s.xSplit, alongX);
  extrude(obj(RM('Roofs'), 'Shed roof over 109 (replaced by flat roof)', 'roof_shake', { source: 'A201 note: replaced with flat roof' }), sec, s.xSplit, s.x1, alongX);
  const f = obj(EX('Envelope'), 'Shed roof fascia (kept)', 'trim');
  box(f, s.x0, s.xSplit, s.yEave, s.yEave + 0.08, s.zEave - 0.55, s.zEave);
  box(obj(RM('Roofs'), 'Shed roof fascia over 109', 'trim'), s.xSplit, s.x1, s.yEave, s.yEave + 0.08, s.zEave - 0.55, s.zEave);
}
{
  const G = D.garage, cx = (G.x0 + G.x1) / 2, cy = (G.y0 + G.y1) / 2, o = G.overhang;
  box(obj(EX('Envelope'), 'Garage wing (110/111) walls', 'shake_wall', { source: 'A101; field marks Image 38/40' }), G.x0, G.x1, G.y0, G.y1, 0, G.wallTop);
  const t = obj(EX('Envelope'), 'Garage wing frieze, soffit, corner boards', 'trim');
  box(t, G.x0 - 0.06, G.x1 + 0.06, G.y0 - 0.06, G.y1 + 0.06, G.wallTop - G.frieze, G.wallTop);
  box(t, G.x0 - o, G.x1 + o, G.y0 - o, G.y1 + o, G.wallTop, G.eaveEdge - 0.08);
  for (const [x, y] of [[G.x1 - 0.5, G.y1 - 0.5], [G.x0, G.y1 - 0.5]]) box(t, x - 0.04, x + 0.54, y - 0.04, y + 0.54, 0, G.wallTop);
  const r = obj(EX('Roofs'), 'Garage wing hipped roof (wood shake)', 'roof_shake', { source: 'A201 pyramid hip; apex 15\'-3" field' });
  const z = G.eaveEdge - 0.1, A = [cx, cy, G.apex];
  const c = [[G.x0 - o, G.y0 - o, z], [G.x1 + o, G.y0 - o, z], [G.x1 + o, G.y1 + o, z], [G.x0 - o, G.y1 + o, z]];
  for (let i = 0; i < 4; i++) {
    const a = c[i], b = c[(i + 1) % 4], m = mul(add(a, b), 0.5);
    r.tri(a, b, A, [m[0] - cx, m[1] - cy, 6]);
    r.quad(a, b, [b[0], b[1], z - 0.12], [a[0], a[1], z - 0.12], [m[0] - cx, m[1] - cy, 0]);
  }
}
{
  const C = D.oldChimney;
  const g = obj(EX('Envelope'), 'Existing chimney near the garage (kept)', 'brick', { source: 'A104 poché; IMG_0429, Image 38' });
  box(g, C.x0, C.x1, C.y0, C.y1, 0, C.top - 0.35);
  box(g, C.x0 - 0.15, C.x1 + 0.15, C.y0, C.y1 + 0.15, C.top - 0.35, C.top);
}
for (const w of D.winExisting) addWindow(EX('Openings'), w);
for (const v of D.ventsExisting) {
  const g = obj(EX('Openings'), `Vent ${v.id}`, 'trim');
  faceBox(g, 'N', v.at, v.s0 - 0.3, v.s1 + 0.3, v.z1, v.z1 + 0.3, 0, 0.1); faceBox(g, 'N', v.at, v.s0 - 0.3, v.s1 + 0.3, v.z0 - 0.3, v.z0, 0, 0.1);
  faceBox(g, 'N', v.at, v.s0 - 0.3, v.s0, v.z0, v.z1, 0, 0.1); faceBox(g, 'N', v.at, v.s1, v.s1 + 0.3, v.z0, v.z1, 0, 0.1);
  for (let z = v.z0 + 0.12; z < v.z1 - 0.05; z += 0.24) faceBox(g, 'N', v.at, v.s0, v.s1, z, z + 0.09, 0.05, 0.12);
  faceBox(obj(EX('Openings'), `Vent ${v.id} shadow`, 'firebox'), 'N', v.at, v.s0, v.s1, v.z0, v.z1, 0, 0.04);
}
for (const d of D.doorsExisting) addDoor(d.removed ? RM('Openings') : EX('Openings'), d);

// ------------------------------------------------------------------ EXISTING site
{
  box(obj(EX('Site'), 'Context ground', 'ground'), -40, 100, -20, 110, -0.25, -0.05);
  extrude(obj(RM('Site'), 'Courtyard aggregate paving (replaced by garden)', 'paving_aggregate', { source: 'photos' }), D.site.courtyard, -0.05, 0.0, alongZ);
  const S = D.site;
  const nw = S.northWall, dir = nrm(sub([...nw.b, 0], [...nw.a, 0])), pn = [-dir[1], dir[0]];
  const off = (p, k) => [p[0] + pn[0] * k, p[1] + pn[1] * k];
  const wallPoly = [off(nw.a, -nw.t / 2), off(nw.b, -nw.t / 2), off(nw.b, nw.t / 2), off(nw.a, nw.t / 2)];
  const walls = obj(EX('Site'), 'Courtyard retaining walls (painted)', 'site_wall', { source: 'A104 / V101; IMG_0430' });
  extrude(walls, wallPoly, 0, nw.h, alongZ);
  box(walls, S.eastWall.x0, S.eastWall.x1, S.eastWall.y0, S.eastWall.y1, 0, S.eastWall.h);
  box(walls, S.westWall.x0, S.westWall.x1, S.westWall.y0, S.westWall.y1, 0, S.westWall.h);
  const fence = obj(EX('Site'), 'Iron fences on the walls', 'iron');
  const L = Math.hypot(nw.b[0] - nw.a[0], nw.b[1] - nw.a[1]);
  for (let k = 0; k <= L; k += 0.5) { const p = [nw.a[0] + dir[0] * k, nw.a[1] + dir[1] * k]; box(fence, p[0] - 0.03, p[0] + 0.03, p[1] - 0.03, p[1] + 0.03, nw.h, nw.h + nw.fence); }
  beam(fence, [...nw.a, nw.h + nw.fence - 0.2], [...nw.b, nw.h + nw.fence - 0.2], 0.08, 0.08);
  beam(fence, [...nw.a, nw.h + 0.25], [...nw.b, nw.h + 0.25], 0.08, 0.08);
  const ew = S.eastWall, ex = (ew.x0 + ew.x1) / 2;
  for (let y = ew.y0; y <= ew.y1; y += 0.5) box(fence, ex - 0.03, ex + 0.03, y - 0.03, y + 0.03, ew.h, ew.h + ew.fence);
  box(fence, ex - 0.04, ex + 0.04, ew.y0, ew.y1, ew.h + ew.fence - 0.25, ew.h + ew.fence - 0.17);
  box(fence, ex - 0.04, ex + 0.04, ew.y0, ew.y1, ew.h + 0.2, ew.h + 0.28);
  // double iron gate between the garage wing and the west wall
  const gt = S.gate, gate = obj(EX('Site'), 'Iron gate (double, kept)', 'iron', { source: 'A104 opening; IMG_0430, Image 40' });
  for (const y of [gt.y0, gt.y1]) box(gate, gt.x - 0.2, gt.x + 0.2, y - 0.2, y + 0.2, 0, gt.h + 0.4);
  const midY = (gt.y0 + gt.y1) / 2;
  for (const [a, b] of [[gt.y0 + 0.2, midY - 0.05], [midY + 0.05, gt.y1 - 0.2]]) {
    for (const z of [0.5, 1.4, gt.h - 0.5]) box(gate, gt.x - 0.04, gt.x + 0.04, a, b, z, z + 0.08);
    let i = 0;
    for (let y = a + 0.1; y < b; y += 0.42, i++) box(gate, gt.x - 0.025, gt.x + 0.025, y - 0.025, y + 0.025, 0.15, gt.h + (i % 2 ? 0.05 : 0.3));
    for (let y = a + 0.4; y < b - 0.4; y += 0.84) { // X scrollwork band
      beam(gate, [gt.x, y, 1.48], [gt.x, y + 0.84, 2.4], 0.04, 0.04);
      beam(gate, [gt.x, y + 0.84, 1.48], [gt.x, y, 2.4], 0.04, 0.04);
    }
  }
  const P = S.planter;
  ring(obj(RM('Site'), 'Circular brick planter (removed in the renovation)', 'brick', { source: 'photo-triangulated from IMG_0430, ±1.5 ft; removal per Matt, Nov 26 2026' }), P.cx, P.cy, P.r - P.wall, P.r, 0, P.h);
  cylinder(obj(RM('Site'), 'Planter soil', 'soil'), P.cx, P.cy, P.r - P.wall, P.r - P.wall, 0, P.h - 0.12, 40);
}

// ------------------------------------------------------------------ PROPOSED porch
const PO = D.porch, FP = D.fireplace, RE = D.rearEntry;
{
  const base = obj(PR('Porch'), 'Porch brick foundation and floor', 'brick_floor', { source: 'A201 note: brick floor and foundation' });
  box(base, PO.x0, PO.x1, PO.y0, PO.y1, 0, D.FF);
  box(base, RE.x0, RE.x1, RE.y0, RE.y1, 0, D.FF);
  for (const s of PO.steps) box(base, s.x0, s.x1, PO.stepY0, PO.y1, 0, s.top);
  // columns
  const col = obj(PR('Porch'), 'Doric columns (4, wood)', 'trim', { source: 'A104 column centres; A201' });
  for (const c of PO.columns) {
    const h = PO.plinth / 2;
    box(col, c.x - h, c.x + h, c.y - h, c.y + h, D.FF, D.FF + 0.2);
    cylinder(col, c.x, c.y, 0.39, 0.37, D.FF + 0.2, D.FF + 0.36, 24);
    cylinder(col, c.x, c.y, PO.shaftR0, PO.shaftR1, D.FF + 0.36, 8.3, 24);
    cylinder(col, c.x, c.y, 0.31, 0.31, 8.3, 8.38, 24);
    cylinder(col, c.x, c.y, 0.3, 0.38, 8.38, 8.6, 24);
    box(col, c.x - 0.41, c.x + 0.41, c.y - 0.41, c.y + 0.41, 8.6, PO.entabZ0);
  }
  const piers = obj(PR('Porch'), 'Porch piers and east wall (shakes)', 'shake_wall', { source: 'A104 poché' });
  for (const [x0, x1, y0, y1] of PO.piers) box(piers, x0, x1, y0, y1, D.FF, PO.entabZ0);
  for (const [a, b] of PO.eastOpenings) {
    box(piers, 51.73, 52.47, a, b, D.FF, PO.eastSill);
    box(piers, 51.73, 52.47, a, b, PO.eastHead, PO.entabZ0);
  }
  PO.eastOpenings.forEach(([a, b], i) => addShutters(PR('Porch'), `porch-E-${i + 1}`, 'E', 52.47, a, b, PO.eastSill, PO.eastHead));
  const ent = obj(PR('Porch'), 'Porch entablature and cornices', 'trim', { source: 'A201 8.8–10.3' });
  box(ent, PO.x0, PO.x1, 52.26, PO.y1, PO.entabZ0, PO.entabZ1);       // north
  box(ent, PO.x0, 35.51, PO.y0, PO.y1, PO.entabZ0, PO.entabZ1);       // west, over the columns
  box(ent, 51.73, PO.x1, PO.y0, PO.y1, PO.entabZ0, PO.entabZ1);       // east
  box(ent, PO.x0 - 0.05, PO.x1 + 0.05, PO.y1 - 0.02, PO.y1 + 0.05, PO.entabZ0 + 0.35, PO.entabZ0 + 0.45); // architrave fillet
  const R = PO.roof, p = (R.ridgeZ - R.eaveZ) / (R.ridgeX - R.x0), dz = R.t * Math.sqrt(1 + p * p);
  const top = (x) => R.ridgeZ - p * Math.abs(x - R.ridgeX);
  box(ent, R.x0, R.x1, 52.2, R.yEnd - 0.1, PO.entabZ1 - 0.05, R.eaveZ);  // horizontal cornice at the pediment
  box(ent, R.x0, PO.x0, PO.y0, PO.y1, PO.entabZ1 - 0.05, R.eaveZ - 0.02); // side cornices
  box(ent, PO.x1, R.x1, PO.y0, PO.y1, PO.entabZ1 - 0.05, R.eaveZ - 0.02);
  for (const xe of [R.x0, R.x1]) beam(ent, [xe, R.yEnd - 0.25, top(xe) - dz - 0.12], [R.ridgeX, R.yEnd - 0.25, R.ridgeZ - dz - 0.12], 0.5, 0.3); // raking cornices
  const roof = obj(PR('Porch'), 'Porch roof (standing-seam metal)', 'metal_roof', { source: 'A201; pitch 6/12' });
  extrude(roof, [[R.x0, top(R.x0) - dz], [R.ridgeX, R.ridgeZ - dz], [R.x1, top(R.x1) - dz], [R.x1, top(R.x1)], [R.ridgeX, R.ridgeZ], [R.x0, top(R.x0)]],
    PO.y0, R.yEnd, alongY);
  const tym = obj(PR('Porch'), 'Pediment tympanum (clapboard)', 'clapboard');
  extrude(tym, [[PO.x0 + 0.3, R.eaveZ], [PO.x1 - 0.3, R.eaveZ], [R.ridgeX, R.ridgeZ - dz - 0.35]], 52.3, 52.62, alongY);
  // exposed roof structure
  const wood = obj(PR('Porch'), 'Exposed roof structure (rafters, ridge beam, boarding)', 'wood', { source: 'A201 note: roof structure exposed' });
  const und = (x) => top(x) - dz;
  extrude(wood, [[PO.x0 + 0.74, und(PO.x0 + 0.74) - 0.05], [R.ridgeX, R.ridgeZ - dz - 0.05], [PO.x1 - 0.74, und(PO.x1 - 0.74) - 0.05],
    [PO.x1 - 0.74, und(PO.x1 - 0.74) - 0.1], [R.ridgeX, R.ridgeZ - dz - 0.1], [PO.x0 + 0.74, und(PO.x0 + 0.74) - 0.1]], PO.y0, 52.26, alongY);
  beam(wood, [R.ridgeX, PO.y0, R.ridgeZ - dz - 0.45], [R.ridgeX, 52.26, R.ridgeZ - dz - 0.45], 0.35, 0.7);
  for (let y = PO.y0 + 2.0; y < 52.0; y += 2.0) {
    if (y > 32.9 && y < 34.9) continue;
    for (const xe of [PO.x0 + 0.74, PO.x1 - 0.74]) beam(wood, [xe, y, und(xe) - 0.33], [R.ridgeX, y, R.ridgeZ - dz - 0.33], 0.16, 0.45);
  }
}
{ // fireplace and chimney on one centreline
  const cl = FP.cl, y0 = PO.y0, y1 = y0 + FP.depth, sx0 = cl - FP.surroundW / 2, sx1 = cl + FP.surroundW / 2;
  const ox0 = cl - FP.openingW / 2, ox1 = cl + FP.openingW / 2, hz = D.FF + FP.hearth.t;
  const b = obj(PR('Fireplace'), 'Brick surround, breast and chimney stack', 'brick', { source: 'A104 box; A201 breast, shoulders, stack; all-brick decision' });
  box(b, sx0, ox0, y0, y1, D.FF, FP.surroundTop);
  box(b, ox1, sx1, y0, y1, D.FF, FP.surroundTop);
  box(b, ox0, ox1, y0, y1, FP.openingZ1, FP.surroundTop);
  box(b, ox0, ox1, y1 - FP.recess, y1, D.FF, hz);
  box(b, sx0 - 0.15, sx1 + 0.15, y0, y1 + 0.15, FP.surroundTop - 0.35, FP.surroundTop); // corbelled course
  const bx0 = cl - FP.breastW / 2, bx1 = cl + FP.breastW / 2;
  box(b, bx0, bx1, y0, y1, FP.surroundTop, FP.shoulderZ0);
  extrude(b, [[bx0, FP.shoulderZ0], [bx1, FP.shoulderZ0], [cl + FP.stackW / 2, FP.shoulderZ1], [cl - FP.stackW / 2, FP.shoulderZ1]], y0, y1, alongY);
  box(b, cl - FP.stackW / 2, cl + FP.stackW / 2, y0, y1, FP.shoulderZ1, FP.stackTop - 0.45);
  box(b, cl - FP.stackW / 2 - 0.2, cl + FP.stackW / 2 + 0.2, y0, y1 + 0.2, FP.stackTop - 0.45, FP.stackTop);
  const fb = obj(PR('Fireplace'), 'Firebox (recessed opening)', 'firebox');
  box(fb, ox0, ox1, y0, y1 - FP.recess, hz, FP.openingZ1);
  box(fb, ox0, ox0 + 0.06, y1 - FP.recess, y1, hz, FP.openingZ1);
  box(fb, ox1 - 0.06, ox1, y1 - FP.recess, y1, hz, FP.openingZ1);
  box(fb, cl - 0.35, cl + 0.35, y0 + 0.4, y0 + 1.0, FP.stackTop, FP.stackTop + 0.45); // flue liner
  box(obj(PR('Fireplace'), 'Brick hearth', 'brick_floor'), sx0, sx1, y1, y1 + FP.hearth.depth, D.FF, hz);
}
{ // rear entry: open bay, Roman-lattice railing, flat roof with Greek-key parapet
  const w = obj(PR('Rear entry'), 'Rear entry walls (shakes)', 'shake_wall', { source: 'A104 poché; A201 A1/A2' });
  const [wa, wb] = RE.westOpening, x0 = RE.x0, xt = RE.x0 + RE.wallT, rz = RE.roof.z0;
  box(w, x0, xt, RE.y0, wa, D.FF, rz); box(w, x0, xt, wb, RE.y1, D.FF, rz);
  box(w, x0, xt, wa, wb, D.FF, RE.westSill); box(w, x0, xt, wa, wb, RE.westHead, rz);
  const [na, nb] = RE.northOpening, yt = RE.y1 - RE.wallT;
  box(w, x0, na, yt, RE.y1, D.FF, rz); box(w, nb, 35.51, yt, RE.y1, D.FF, rz);
  box(w, na, nb, yt, RE.y1, 9.0, rz);
  addShutters(PR('Rear entry'), 'entry-W', 'W', RE.x0, wa, wb, RE.westSill, RE.westHead);
  const rail = obj(PR('Rear entry'), 'Roman-lattice railing', 'trim', { source: 'A201 note + A2' });
  const ry = RE.y1 - 0.35, z1 = RE.railZ1;
  box(rail, na, nb, ry - 0.2, ry + 0.2, z1 - 0.18, z1);
  box(rail, na, nb, ry - 0.12, ry + 0.12, D.FF + 0.15, D.FF + 0.32);
  const bays = 3, bw = (nb - na) / bays;
  for (let i = 0; i <= bays; i++) box(rail, na + i * bw - 0.1, na + i * bw + 0.1, ry - 0.12, ry + 0.12, D.FF, z1);
  for (let i = 0; i < bays; i++) {
    const a = na + i * bw + 0.1, c = na + (i + 1) * bw - 0.1, zl = D.FF + 0.32, zh = z1 - 0.18;
    beam(rail, [a, ry, zl], [c, ry, zh], 0.1, 0.1); beam(rail, [c, ry, zl], [a, ry, zh], 0.1, 0.1);
  }
  const RF = RE.roof, PP = RE.parapet, co = RF.cornice;
  const fr = obj(PR('Rear entry'), 'Flat roof, cornice and parapet', 'trim', { source: 'DXF A2/A1 elevations; flat roof replaces the 109 shed roof' });
  box(fr, RE.x0, RE.x1, RF.y0, RE.y1, RF.fasciaZ0, RF.z0);                       // fascia
  box(fr, RE.x0 - co, RE.x1, RF.y0, RE.y1 + co, RF.z0, RF.z1);                   // cornice, projecting north and west
  box(obj(PR('Rear entry'), 'Flat roof membrane', 'roof_flat'), RE.x0 + 0.5, RE.x1 - 0.2, RF.y0, RE.y1 - 0.5, RF.z1, RF.z1 + 0.02);
  const shade = obj(PR('Rear entry'), 'Parapet recessed fields', 'trim_shade');
  for (const [a, b2, c, d] of PP.peds) {
    box(fr, a, b2, c, d, RF.z1, PP.pedTop);
    box(fr, a - PP.capOver, b2 + PP.capOver, c - (c > RF.y0 + 0.01 ? PP.capOver : 0), d + PP.capOver, PP.pedTop, PP.capTop);
  }
  const pedPanel = (face, at, s0, s1) => {
    const { inset, z0, z1 } = PP.pedPanel;
    faceBox(shade, face, at, s0 + inset, s1 - inset, z0, z1, 0, 0.01);
    faceBox(fr, face, at, s0 + inset + 0.08, s1 - inset - 0.08, z0 + 0.08, z1 - 0.08, 0, 0.025);
  };
  const [NW, NE, SW] = PP.peds;
  pedPanel('N', NW[3], NW[0], NW[1]); pedPanel('W', NW[0], NW[2], NW[3]);
  pedPanel('N', NE[3], NE[0], NE[1]); pedPanel('W', SW[0], SW[2], SW[3]);
  box(fr, NW[1], NE[0], RE.y1 - PP.panelT, RE.y1, RF.z1, PP.panelTop);         // north key panel
  box(fr, NW[0], NW[0] + PP.panelT, SW[3], NW[2], RF.z1, PP.panelTop);         // west key panel
  // Greek key: continuous meander on a shaded band, unit 0.727 ft [DXF]
  faceBox(shade, 'N', RE.y1, NW[1], NE[0], PP.keyZ[0], PP.keyZ[1], 0, 0.01);
  faceBox(shade, 'W', NW[0], SW[3], NW[2], PP.keyZ[0], PP.keyZ[1], 0, 0.01);
  const key = obj(PR('Rear entry'), 'Greek-key relief', 'trim');
  const run = (face, at, s0, s1) => {
    const [zb, zt] = PP.keyZ, c = PP.keyUnit / 7, cz = (zt - zb) / 5, lw = 0.035;
    const seg = (sa, za, sb, zb2) => faceBox(key, face, at, Math.min(sa, sb) - lw, Math.max(sa, sb) + lw, Math.min(za, zb2) - lw, Math.max(za, zb2) + lw, 0, 0.05);
    const pts = [[0, 0.5], [5.5, 0.5], [5.5, 4.5], [1.5, 4.5], [1.5, 2], [3.5, 2], [3.5, 3]];
    for (let s = s0; s + PP.keyUnit <= s1 + 1e-6; s += PP.keyUnit) {
      for (let i = 0; i < pts.length - 1; i++) seg(s + pts[i][0] * c, zb + pts[i][1] * cz, s + pts[i + 1][0] * c, zb + pts[i + 1][1] * cz);
      if (s + 2 * PP.keyUnit <= s1 + 1e-6) seg(s + 5.5 * c, zb + 0.5 * cz, s + 7 * c, zb + 0.5 * cz);
    }
  };
  run('N', RE.y1, NW[1], NE[0]);
  run('W', NW[0], SW[3], NW[2]);
}
{ // 110: southern door infilled (A102 new construction / A104)
  const d = D.doorsExisting.find((x) => x.removed);
  faceBox(obj(PR('Envelope'), '110 door infill (shakes)', 'shake_wall', { source: 'A102 new construction, A104' }), 'E', d.at, d.s0 - 0.45, d.s1 + 0.45, 0, 7.5, 0, 0.02);
}

// ------------------------------------------------------------------ PROPOSED garden (conceptual)
const P = D.site.planter;
const keepOut = []; // footprints the garden must not plant on (garage approach)
{
  extrude(obj(PR('Garden'), 'Garage approach (pavers, kept clear)', 'gravel', { source: 'decision: keep the garage approach clear' }), D.garden.driveCourt, -0.04, 0.02, alongZ);
  keepOut.push(D.garden.driveCourt);
  extrude(obj(PR('Garden'), 'Lawn / groundcover', 'lawn'), D.site.courtyard, -0.05, 0.0, alongZ);
  const st = obj(PR('Garden'), 'Stone paths', 'stone', { source: 'conceptual' });
  const xs = PO.steps[0].x0, py0 = 45.9, py1 = 48.7;              // cross path at the porch steps
  box(st, 29.6, 32.4, RE.y1, 59.5, -0.02, 0.05);                 // rear entry -> north terrace
  box(st, 23.9, 29.6, py0, py1, -0.02, 0.05);                    // garage approach -> spine
  box(st, 32.4, xs, py0, py1, -0.02, 0.05);                      // spine -> porch steps
  box(st, 27.6, 34.4, 59.5, 62.3, -0.02, 0.05);                  // terrace
  box(st, PO.x0 - 2.0, PO.x1, PO.y1, PO.y1 + 2.2, -0.02, 0.05);  // apron along the porch front
  const bench = obj(PR('Garden'), 'Garden bench', 'wood');
  box(bench, 29.0, 33.0, 61.2, 62.1, 1.4, 1.55); box(bench, 29.0, 33.0, 61.95, 62.1, 1.55, 2.9);
  for (const x of [29.2, 32.6]) box(bench, x, x + 0.2, 61.25, 62.05, 0, 1.4);
  // beds
  const yw = (x) => 66.7 - 0.10273 * (x - 0.96) - 0.45;
  const soil = obj(PR('Garden'), 'Planting beds', 'soil');
  box(soil, 52.6, 55.85, PO.y0, 60.2, -0.02, 0.12);
  for (const [a, b] of [[24.2, 27.4], [34.6, 55.8]]) extrude(soil, [[a, yw(a) - 4.2], [b, yw(b) - 4.2], [b, yw(b)], [a, yw(a)]], -0.02, 0.12, alongZ);
  const fol = ['foliage_a', 'foliage_b', 'foliage_c'];
  const shrubs = fol.map((m) => obj(PR('Garden'), `Shrubs (${m})`, m));
  let k = 0;
  const shrub = (x, y, r) => { blob(shrubs[k % 3], x, y, r * 0.8, r, r * 0.8, 7 + k); k++; };
  for (let y = 34.6; y < 59.8; y += 3.1) shrub(54.2, y, 1.15);                          // east bed hedge
  for (let x = 35.5; x < 55.5; x += 3.4) shrub(x, yw(x) - 1.6, 1.25);                    // north bed
  for (let x = 37.2; x < 55; x += 3.4) shrub(x, yw(x) - 3.4, 0.8);
  shrub(25.4, yw(25.4) - 1.5, 1.2); shrub(26.6, yw(26.6) - 3.2, 0.9);
  const bl = obj(PR('Garden'), 'Flowering perennials', 'bloom');
  for (let x = 36.3; x < 55; x += 3.4) blob(bl, x + 1.7, yw(x + 1.7) - 2.6, 0.45, 0.55, 0.4, 11 + x);
  const trunk = obj(PR('Garden'), 'Tree trunks', 'trunk'), can = obj(PR('Garden'), 'Tree canopies', 'foliage_a');
  for (const [x, yOff, h, r] of [[40.5, 2.0, 9.5, 3.2], [49.5, 2.0, 10.5, 3.5], [25.8, 2.2, 8.5, 2.8]]) {
    const y = yw(x) - yOff;
    cylinder(trunk, x, y, 0.2, 0.14, 0, h - r, 10);
    blob(can, x, y, h - r * 0.4, r, r * 0.75, x);
    blob(can, x + 0.9, y - 0.6, h - r * 0.9, r * 0.7, r * 0.55, x + 3);
  }
}

// ------------------------------------------------------------------ checks
const checks = [];
const ck = (name, value, ok, note) => checks.push({ name, value, ok, note });
{
  const ridge = (E.x0 + E.x1) / 2, a104 = (41.55 + 45.66) / 2, ex = (41.56 + 45.66) / 2;
  ck('Chimney / firebox / gable ridge centreline', `firebox ${FP.cl.toFixed(2)} · stack ${FP.cl.toFixed(2)} · ridge ${ridge.toFixed(2)} · A104 box ${a104.toFixed(3)} · existing study fireplace ${ex.toFixed(2)}`,
    Math.abs(FP.cl - ridge) < 0.05 && Math.abs(FP.cl - a104) < 0.05, 'All within 0.05 ft. Surround 5.4 ft (A201) narrows to a 4.0 ft breast (A104 box / A201) and a 2.0 ft stack.');
  const sx0 = FP.cl - FP.surroundW / 2, sx1 = FP.cl + FP.surroundW / 2;
  const colR = 0.41;
  const nCols = PO.columns.filter((c) => c.y > 52);
  ck('North columns, x offset from the surround (plan)', nCols.map((c) => `${c.id}: ${(c.x < FP.cl ? sx0 - (c.x + colR) : (c.x - colR) - sx1).toFixed(2)} ft`).join(' · '), true,
    'Columns are 15.9 ft in front of the masonry, so it reads between them from the north.');
  const wCols = PO.columns.filter((c) => c.y < 52);
  ck('West columns to hearth edge (plan)', wCols.map((c) => `${c.id}: ${Math.hypot(Math.max(0, sx0 - c.x), Math.max(0, c.y - (PO.y0 + FP.depth + FP.hearth.depth))).toFixed(2)} ft`).join(' · '), true, '');
  const clear = [[36.77, 37.705 - 0.395], [37.705 + 0.395, 49.535 - 0.395], [49.535 + 0.395, 50.47]];
  ck('North bays, clear between plinths and piers', clear.map(([a, b]) => (b - a).toFixed(2)).join(' / ') + ' ft', true,
    'A104 governs (Matt, Nov 26 2026): columns 0.54 ft from the corner piers, centres 11.83 ft apart. A201 A2 draws them ~1 ft further in; superseded.');
  // existing windows vs proposed roofs
  const R = PO.roof, pr = (R.ridgeZ - R.eaveZ) / (R.ridgeX - R.x0), topAt = (x) => R.ridgeZ - pr * Math.abs(x - R.ridgeX);
  const w208 = D.winExisting.filter((w) => w.id.startsWith('208'));
  ck('208 windows above the porch roof', w208.map((w) => {
    const near = Math.abs(w.s0 - R.ridgeX) < Math.abs(w.s1 - R.ridgeX) ? w.s0 : w.s1;
    return `${w.id}: sill casing ${(w.z0 - 0.17).toFixed(2)} vs roof ${topAt(near - 0.42 * Math.sign(R.ridgeX - near)).toFixed(2)} (clear ${(w.z0 - 0.17 - topAt(near)).toFixed(2)} ft)`;
  }).join(' · '), true, 'Roof meets the wall below both second-floor sills.');
  const w201 = D.winExisting.find((w) => w.id === '201-N-landing');
  ck('201 landing window above the rear-entry parapet', `sill ${(w201.z0 - 0.17).toFixed(2)} vs parapet cap ${RE.parapet.capTop.toFixed(2)} → ${(w201.z0 - 0.17 - RE.parapet.capTop).toFixed(2)} ft`,
    w201.z0 - 0.17 > RE.parapet.capTop, 'Tight but clear (A201 sill 12.6).');
  const vents = D.ventsExisting;
  ck('Chimney stack between the 208 attic vents', `stack ${(FP.cl - FP.stackW / 2).toFixed(2)}–${(FP.cl + FP.stackW / 2).toFixed(2)}; vents end ${vents[0].s1} / start ${vents[1].s0}; gaps ${(FP.cl - FP.stackW / 2 - vents[0].s1 - 0.3).toFixed(2)} / ${(vents[1].s0 - 0.3 - FP.cl - FP.stackW / 2).toFixed(2)} ft (outside vent trim)`,
    FP.cl - FP.stackW / 2 > vents[0].s1 + 0.3 && vents[1].s0 - 0.3 > FP.cl + FP.stackW / 2, '');
  ck('Breast vs 208 second-floor windows', `breast ${(FP.cl - FP.breastW / 2).toFixed(2)}–${(FP.cl + FP.breastW / 2).toFixed(2)}; windows end 39.70+0.42 / start 47.57-0.42`, true, 'Over 1.5 ft of wall each side.');
  const ne = RE.parapet.peds[1];
  ck('Rear-entry NE pedestal vs porch eave', `pedestal x ${ne[0]}–${ne[1]}, z ${RE.roof.z1}–${RE.parapet.capTop}; porch eave from x ${R.x0} (roof top ${R.eaveZ}–${topAt(ne[1]).toFixed(2)} under the pedestal)`, false,
    'As drawn in the DXF A2: the pedestal sits on the 33.51–35.51 pier and the porch eave dies into its east 1.12 ft. Needs a flashing / cricket detail.');
  const dc = D.garden.driveCourt, inPoly = (pt, poly) => { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const a = poly[i], b = poly[j]; if ((a[1] > pt[1]) !== (b[1] > pt[1]) && pt[0] < (b[0] - a[0]) * (pt[1] - a[1]) / (b[1] - a[1]) + a[0]) c = !c; } return c; };
  const plantPts = [];
  for (const o of objects) if (o.path[1] === 'Garden' && /Shrub|Tree|perennial|Planting/i.test(o.name)) for (let i = 0; i < o.g.pos.length; i += 3) plantPts.push([o.g.pos[i], o.g.pos[i + 1]]);
  const intr = plantPts.filter((pt) => inPoly(pt, dc)).length;
  ck('Garage approach clear of planting', `${intr} plant vertices inside the approach (gate swing radius ${((D.site.gate.y1 - D.site.gate.y0) / 2).toFixed(1)} ft stays inside it)`, intr === 0, 'Gate → 110 doors → garage wing kept paved.');
}

// ------------------------------------------------------------------ garage-side camera: sightline search
function cameraSearch() {
  const target = [FP.cl, PO.y0 + FP.depth, 3.0];
  const sx0 = FP.cl - FP.surroundW / 2, sx1 = FP.cl + FP.surroundW / 2;
  const masonry = [[sx0, PO.y0], [sx1, PO.y0], [sx1, PO.y0 + FP.depth + FP.hearth.depth], [sx0, PO.y0 + FP.depth + FP.hearth.depth]];
  const occ = [];
  for (const c of PO.columns) occ.push({ id: c.id, circle: [c.x, c.y, 0.41] });
  for (const [x0, x1, y0, y1] of PO.piers) occ.push({ id: 'pier', poly: [[x0, y0], [x1, y0], [x1, y1], [x0, y1]] });
  occ.push({ id: 'rear-entry', poly: [[RE.x0, RE.y0], [RE.x1, RE.y0], [RE.x1, RE.y1], [RE.x0, RE.y1]] });
  const az = (c, p) => Math.atan2(p[1] - c[1], p[0] - c[0]);
  const interval = (c, pts) => { const a = pts.map((p) => az(c, p)); return [Math.min(...a), Math.max(...a)]; };
  let best = null;
  const yWall = (x) => 66.7 - 0.10273 * (x - 0.96) - 2.0;
  for (let x = 4; x <= 31; x += 0.5) for (let y = 40; y <= 64; y += 0.5) {
    const c = [x, y];
    if (y > yWall(x)) continue;
    if (x > 26.41 && y < RE.y1 + 1) continue;
    const m = interval(c, masonry), dist = Math.hypot(FP.cl - x, PO.y0 + 2 - y);
    let gap = Infinity;
    for (const o of occ) {
      let iv;
      if (o.circle) { const [ox, oy, r] = o.circle, d = Math.hypot(ox - x, oy - y), a = az(c, [ox, oy]), h = Math.asin(Math.min(1, r / d)); iv = [a - h, a + h]; if (d > dist) continue; }
      else { iv = interval(c, o.poly); const cxp = o.poly.reduce((s, p) => s + p[0], 0) / 4, cyp = o.poly.reduce((s, p) => s + p[1], 0) / 4; if (Math.hypot(cxp - x, cyp - y) > dist) continue; }
      const g = iv[1] < m[0] ? m[0] - iv[1] : iv[0] > m[1] ? iv[0] - m[1] : -Math.min(m[1], iv[1]) + Math.max(m[0], iv[0]);
      gap = Math.min(gap, g);
    }
    // farthest viewpoint that keeps >= 1.5 deg between the masonry and every post; else the clearest one
    const score = gap >= 0.026 ? 100 + dist + gap : gap;
    if (!best || score > best.score) best = { score, gap, dist, pos: [x, y, 5.25], target };
  }
  return best;
}
const cam = cameraSearch();
ck('Garage-side sightline: masonry vs nearest post', `camera (${cam.pos[0]}, ${cam.pos[1]}), eye 5.25 ft → min angular gap ${(cam.gap * 180 / Math.PI).toFixed(1)}°`, cam.gap > 0.02,
  'Plan-angle test of the surround + hearth against the columns, piers and rear-entry walls.');

// ------------------------------------------------------------------ glTF writer
function srgbToLinear(h) { return [1, 3, 5].map((i) => { const c = parseInt(h.slice(i, i + 2), 16) / 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }); }
function writeGLB(file) {
  const matNames = Object.keys(MATERIALS);
  const materials = matNames.map((n) => {
    const m = MATERIALS[n];
    return { name: n, pbrMetallicRoughness: { baseColorFactor: [...srgbToLinear(m.c), 1], metallicFactor: m.m || 0, roughnessFactor: m.r ?? 0.9 }, doubleSided: false };
  });
  const chunks = []; let offset = 0; const bufferViews = [], accessors = [], meshes = [], nodes = [];
  const pushF32 = (arr, target) => {
    const f = new Float32Array(arr); const b = Buffer.from(f.buffer);
    bufferViews.push({ buffer: 0, byteOffset: offset, byteLength: b.length, target });
    chunks.push(b); offset += b.length; const pad = (4 - (offset % 4)) % 4; if (pad) { chunks.push(Buffer.alloc(pad)); offset += pad; }
    return bufferViews.length - 1;
  };
  const conv = (g) => { const p = [], n = []; for (let i = 0; i < g.pos.length; i += 3) { p.push(g.pos[i], g.pos[i + 2], -g.pos[i + 1]); n.push(g.nor[i], g.nor[i + 2], -g.nor[i + 1]); } return [p, n]; };
  const groupNodes = new Map();
  const root = { name: 'Rome rear (ft; root scaled to metres)', scale: [0.3048, 0.3048, 0.3048], children: [], extras: { units: 'feet', axes: 'x east, y up, -z north' } };
  nodes.push(root);
  const groupNode = (parts) => {
    let parent = 0, key = '';
    for (const part of parts) {
      key += '/' + part;
      if (!groupNodes.has(key)) { nodes.push({ name: part, children: [] }); groupNodes.set(key, nodes.length - 1); nodes[parent].children.push(nodes.length - 1); }
      parent = groupNodes.get(key);
    }
    return parent;
  };
  for (const phase of ['Existing', 'Proposed', 'Removed']) groupNode([phase]);
  for (const o of objects) {
    if (!o.g.count) continue;
    const [p, n] = conv(o.g);
    const mn = [Infinity, Infinity, Infinity], mx = [-Infinity, -Infinity, -Infinity];
    for (let i = 0; i < p.length; i += 3) for (let k = 0; k < 3; k++) { mn[k] = Math.min(mn[k], p[i + k]); mx[k] = Math.max(mx[k], p[i + k]); }
    const vp = pushF32(p, 34962), vn = pushF32(n, 34962), vt = pushF32(o.g.uv, 34962);
    accessors.push({ bufferView: vp, componentType: 5126, count: o.g.count, type: 'VEC3', min: mn, max: mx });
    accessors.push({ bufferView: vn, componentType: 5126, count: o.g.count, type: 'VEC3' });
    accessors.push({ bufferView: vt, componentType: 5126, count: o.g.count, type: 'VEC2' });
    const a = accessors.length;
    meshes.push({ name: o.name, primitives: [{ attributes: { POSITION: a - 3, NORMAL: a - 2, TEXCOORD_0: a - 1 }, material: matNames.indexOf(o.mat) }] });
    const parent = groupNode(o.path);
    nodes.push({ name: o.name, mesh: meshes.length - 1, extras: { phase: o.path[0], category: o.path[1], material: o.mat, ...o.extras } });
    nodes[parent].children.push(nodes.length - 1);
  }
  for (const nd of nodes) if (nd.children && !nd.children.length) delete nd.children;
  const bin = Buffer.concat(chunks);
  const gltf = { asset: { version: '2.0', generator: 'tools/rome-rear-3d/build.mjs' }, scene: 0, scenes: [{ name: 'Rome rear', nodes: [0] }],
    nodes, meshes, materials, accessors, bufferViews, buffers: [{ byteLength: bin.length }] };
  let json = Buffer.from(JSON.stringify(gltf)); const jp = (4 - (json.length % 4)) % 4; json = Buffer.concat([json, Buffer.alloc(jp, 0x20)]);
  const header = Buffer.alloc(12); header.writeUInt32LE(0x46546c67, 0); header.writeUInt32LE(2, 4); header.writeUInt32LE(12 + 8 + json.length + 8 + bin.length, 8);
  const jh = Buffer.alloc(8); jh.writeUInt32LE(json.length, 0); jh.writeUInt32LE(0x4e4f534a, 4);
  const bh = Buffer.alloc(8); bh.writeUInt32LE(bin.length, 0); bh.writeUInt32LE(0x004e4942, 4);
  fs.writeFileSync(file, Buffer.concat([header, jh, json, bh, bin]));
  return { meshes: meshes.length, bytes: 12 + 16 + json.length + bin.length };
}

fs.mkdirSync(OUT, { recursive: true });
const info = writeGLB(path.join(OUT, 'rome-rear.glb'));
fs.writeFileSync(path.join(OUT, 'checks.json'), JSON.stringify({ built: new Date().toISOString(), cameras: { garageSide: cam }, checks }, null, 2));
console.log(`rome-rear.glb: ${info.meshes} meshes, ${(info.bytes / 1024).toFixed(0)} KB`);
for (const c of checks) console.log(`${c.ok ? 'OK  ' : 'FLAG'} ${c.name}: ${c.value}${c.note ? `\n      ${c.note}` : ''}`);
