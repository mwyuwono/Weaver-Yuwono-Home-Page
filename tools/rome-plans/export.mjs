// Rome first-floor plan: DXF -> one layered SVG for the case page (projects/assets/plans/rome-first-floor.svg).
//   node tools/rome-plans/export.mjs            (needs rsvg-convert, magick and autotrace from Homebrew)
// Source: the DXF read by ../rome-rear-3d/dxf.mjs (path in its gitignored sources.local.json). The plan used is the copy
// near DXF y 4090–5034, the one with the rear porch that matches the plotted A102/A104 sheets (see the note in dxf.mjs).
// Output groups: .rp-base (stays), .rp-demo (removed), .rp-new (new construction), .rp-labels (room names from the DXF's
// room schedule), .rp-scale. Only model-space plan geometry and room names are written: no title block, site text or paths.
// Walls are drawn as two face lines in the CAD; the solid fill (poché) is found by flood-filling a raster of those lines
// from the rooms and the outside, then traced back to vectors with autotrace.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync as run } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { readPairs, parse, toPolylines } from '../rome-rear-3d/dxf.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, '../../projects/assets/plans/rome-first-floor.svg');
const BOX = [322, 1002, 4067, 5067]; // DXF inches: first floor with porch and courtyard
const VIEW = { x: -0.5, y: 18.5, w: 57.5, h: 64.5 }; // plan feet (y down), crops the empty courtyard
const LAYERS = {
  base: { wall: 'A-WALL', line: ['A-DOOR', 'A-GLAZ'], fine: ['A-CASE', 'A-FLOR'], head: ['A-WALL-HEAD'], site: ['L-SITE-WALL'] },
  demo: { wall: 'A-WALL-DEMO', line: ['A-DOOR-DEMO'], fine: ['A-CASE-DEMO', 'P-FIXT-DEMO', 'A-FLOR-DEMO'] },
  new: { wall: 'A-WALL-NEWW', line: ['A-DOOR-NEWW', 'A-GLAZ-NEWW'], fine: ['A-CASE-NEWW', 'P-FIXT-NEWW', 'A-FLOR-NEWW'] },
};
// Display names: the DXF room schedule, sentence case. Shortened where the full name crowds the room.
const SHORT = { 113: 'Rear porch', 105: 'Powder\nroom' }; // \n = line break
const SKIP = new Set(['103', '110']); // front stoop (tag sits on the door swings); garage storage (about 4 ft wide)
const NEW_ROOMS = new Set(['113']); // exists only in the proposed plan
const MINOR = new Set(['105', '106', '107', '109', '112']); // hidden on narrow screens
const NUDGE = { 105: [0.4, 0.2], 112: [0.9, 0] }; // label offsets, feet

const d = parse(readPairs());
const g = (e, c, def = 0) => { const f = e.g.find(([k]) => k === c); return f ? +f[1] : def; };
const gs = (e, c) => e.g.filter(([k]) => k === c).map(([, v]) => +v);

function polys(e) {
  if (e.type === 'ELLIPSE') {
    const cx = g(e, 10), cy = g(e, 20), mx = g(e, 11), my = g(e, 21), ra = g(e, 40, 1);
    let t0 = g(e, 41, 0), t1 = g(e, 42, 2 * Math.PI);
    if (t1 < t0) t1 += 2 * Math.PI;
    const n = Math.max(8, Math.ceil((t1 - t0) / 0.2)), pts = [];
    for (let k = 0; k <= n; k++) {
      const t = t0 + (t1 - t0) * k / n, c = Math.cos(t), s = Math.sin(t);
      pts.push([cx + mx * c - my * ra * s, cy + my * c + mx * ra * s]);
    }
    return [pts];
  }
  if (e.type === 'SPLINE') { // fit points when present, else the control polygon (fine at plan scale)
    const fit = gs(e, 11).length > 1;
    const xs = gs(e, fit ? 11 : 10), ys = gs(e, fit ? 21 : 20);
    return [xs.map((x, i) => [x, ys[i]])];
  }
  return toPolylines(e);
}

// INSERT expansion. Door blocks are dynamic: every swing angle sits in one block, so keep the widest arc and the leaf that
// ends on it, away from the jamb ticks (the open leaf).
function blockEntities(b) {
  let ents = b.ents || [];
  const arcs = ents.filter((c) => c.type === 'ARC');
  if (arcs.length >= 3) {
    const sweep = (c) => { let a = g(c, 51) - g(c, 50); if (a <= 0) a += 360; return a; };
    const arc = arcs.reduce((m, c) => (sweep(c) > sweep(m) ? c : m));
    const cx = g(arc, 10), cy = g(arc, 20), r = g(arc, 40);
    const ends = [g(arc, 50), g(arc, 51)].map((a) => [cx + r * Math.cos(a * Math.PI / 180), cy + r * Math.sin(a * Math.PI / 180)]);
    const jambs = ents.filter((c) => c.type === 'LINE').flatMap((c) => [[g(c, 10), g(c, 20)], [g(c, 11), g(c, 21)]]);
    const leaves = ents.filter((c) => c.type === 'LWPOLYLINE').map((c) => ({ c, far: [gs(c, 10)[1], gs(c, 20)[1]] }))
      .filter(({ far }) => ends.some((p) => Math.hypot(p[0] - far[0], p[1] - far[1]) < r * 0.05));
    const clear = ({ far }) => Math.min(1e9, ...jambs.map((p) => Math.hypot(p[0] - far[0], p[1] - far[1])));
    const leaf = leaves.sort((m, n) => clear(n) - clear(m))[0];
    ents = ents.filter((c) => (c.type !== 'ARC' && c.type !== 'LWPOLYLINE') || c === arc || (leaf && c === leaf.c));
  }
  return ents;
}
function expand(e, xf, layer, depth = 0) {
  const own = (e.g.find(([k]) => k === 8) || [])[1];
  const L = !own || own === '0' ? layer : own;
  if (e.type === 'INSERT') {
    const b = d.blocks[(e.g.find(([c]) => c === 2) || [])[1]];
    if (!b || depth > 4) return [];
    const bx = g(b, 10), by = g(b, 20), ix = g(e, 10), iy = g(e, 20), sx = g(e, 41, 1), sy = g(e, 42, 1), r = g(e, 50) * Math.PI / 180;
    const inner = ([x, y]) => { const u = (x - bx) * sx, v = (y - by) * sy; return xf([ix + u * Math.cos(r) - v * Math.sin(r), iy + u * Math.sin(r) + v * Math.cos(r)]); };
    return blockEntities(b).flatMap((c) => expand(c, inner, L, depth + 1));
  }
  return polys(e).map((p) => ({ layer: L, pts: p.map(xf) }));
}

const [x0, x1, y0, y1] = BOX;
const toFt = ([x, y]) => [(x - x0) / 12, (y1 - y) / 12];
const inBox = ([x, y]) => x > x0 && x < x1 && y > y0 && y < y1;
const byLayer = {};
for (const e of d.entities) {
  if (e.space !== 'model') continue;
  for (const { layer, pts } of expand(e, (p) => p, e.layer)) {
    if (pts.length > 1 && pts.some(inBox)) (byLayer[layer] ||= []).push(pts.map(toFt));
  }
}
const lay = (names) => [].concat(names).flatMap((n) => byLayer[n] || []);

// Room names from the room schedule table, tags from A-FLOR-ID.
const names = {};
for (const e of d.entities.filter((x) => x.type === 'ACAD_TABLE')) {
  const cells = e.g.filter(([c]) => c === 1 || c === 3 || c === 302).map(([, v]) => v.replace(/\\[A-Za-z][^;]*;|[{}]/g, '').trim()).filter(Boolean);
  cells.forEach((c, i) => { if (/^\d{3}$/.test(c) && cells[i + 1] === c && cells[i + 2]) names[c] = cells[i + 2][0] + cells[i + 2].slice(1).toLowerCase(); });
}
const tags = d.entities
  .filter((e) => e.space === 'model' && /^A-FLOR-ID/.test(e.layer) && e.type === 'MTEXT' && inBox([g(e, 10), g(e, 20)]))
  .map((e) => ({ id: e.g.filter(([c]) => c === 1 || c === 3).map(([, v]) => v).join('').replace(/\\[A-Za-z][^;]*;|[{}]|\\P/g, ' ').trim(), at: toFt([g(e, 10), g(e, 20)]), h: g(e, 40) / 12 }))
  .filter((t) => names[t.id] && !SKIP.has(t.id));

// Poché. Rasterise the wall face lines (40 px/ft), flood from outside, the room tags, glazing (a closed region holding a
// window is an opening) and the front steps; what stays enclosed is wall. Each enclosed region goes to the layer whose
// lines bound most of its edge, so a remaining wall closed off by a removed partition still reads as remaining.
// Computed for the existing condition (A-WALL + DEMO) and the proposed one (A-WALL + NEWW); remaining wall is the union.
const S = 40, W = Math.ceil((x1 - x0) / 12 * S), H = Math.ceil((y1 - y0) / 12 * S), N = W * H;
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'rome-plan-'));
function raster(layers, name) { // 1 where a line of these layers is drawn
  const lines = lay(layers).map((p) => `<polyline points="${p.map(([x, y]) => `${(x * S).toFixed(1)},${(y * S).toFixed(1)}`).join(' ')}"/>`).join('');
  const svgf = path.join(tmp, `${name}.svg`), pgm = path.join(tmp, `${name}.pgm`);
  fs.writeFileSync(svgf, `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="100%" height="100%" fill="#fff"/><g fill="none" stroke="#000" stroke-width="2">${lines}</g></svg>`);
  run('rsvg-convert', [svgf, '-o', path.join(tmp, `${name}.png`)]);
  run('magick', [path.join(tmp, `${name}.png`), '-colorspace', 'Gray', '-depth', '8', pgm]);
  const buf = fs.readFileSync(pgm), hdr = buf.toString('latin1', 0, 64).match(/^P5\s+(\d+)\s+(\d+)\s+(\d+)\s/);
  const px = buf.subarray(hdr[0].length), out = new Uint8Array(N);
  for (let i = 0; i < N; i++) out[i] = px[i] < 150 ? 1 : 0;
  return out;
}
const ptSeeds = [[0, 0], [W - 1, 0], [0, H - 1], [W - 1, H - 1], ...tags.map((t) => [t.at[0] * S, (t.at[1] + t.h * 0.5) * S]),
  ...Array.from({ length: 30 }, (_, k) => [30.9 * S, (73.5 + k * 0.3) * S])]; // front steps: treads are closed rectangles
const glaz = (layers) => lay(layers).flatMap((p) => p.slice(1).map((q, i) => [(q[0] + p[i][0]) / 2 * S, (q[1] + p[i][1]) / 2 * S]));
function regions(lineSets, seeds) { // lineSets: [{key, px}] -> {key: Uint8Array mask}
  const bar = new Uint8Array(N), owner = new Int8Array(N).fill(-1);
  lineSets.forEach(({ px }, k) => { for (let i = 0; i < N; i++) if (px[i]) { bar[i] = 1; if (owner[i] < 0) owner[i] = k; } });
  const seen = new Uint8Array(N), q = new Int32Array(N);
  let h = 0, t = 0;
  for (const [sx, sy] of seeds) { const i = Math.round(sy) * W + Math.round(sx); if (i >= 0 && i < N && !bar[i] && !seen[i]) { seen[i] = 1; q[t++] = i; } }
  const nb = (i, f) => { const x = i % W; if (x > 0) f(i - 1); if (x < W - 1) f(i + 1); if (i >= W) f(i - W); if (i < N - W) f(i + W); };
  while (h < t) nb(q[h++], (j) => { if (!seen[j] && !bar[j]) { seen[j] = 1; q[t++] = j; } });
  const out = Object.fromEntries(lineSets.map(({ key }) => [key, new Uint8Array(N)]));
  for (let s0 = 0; s0 < N; s0++) {
    if (seen[s0] || bar[s0]) continue;
    h = t = 0; seen[s0] = 1; q[t++] = s0;
    const votes = new Array(lineSets.length).fill(0);
    while (h < t) nb(q[h++], (j) => { if (bar[j]) votes[owner[j]]++; else if (!seen[j]) { seen[j] = 1; q[t++] = j; } });
    const edge = votes.reduce((x, y) => x + y, 0);
    if (2 * t / Math.max(1, edge) < 4) continue; // under ~1.2 in thick: window sills, rails, not wall
    const win = lineSets[votes.indexOf(Math.max(...votes))].key, m = out[win];
    for (let k = 0; k < t; k++) { // the region plus the 2 px of face line around it
      const i = q[k], x = i % W;
      for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
        const j = i + dy * W + dx;
        if (j >= 0 && j < N && x + dx >= 0 && x + dx < W && (dx === 0 && dy === 0 || bar[j])) m[j] = 1;
      }
    }
  }
  return out;
}
function trace(m, name) {
  const pbm = path.join(tmp, `${name}.pbm`), rowBytes = Math.ceil(W / 8), body = Buffer.alloc(rowBytes * H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (m[y * W + x]) body[y * rowBytes + (x >> 3)] |= 0x80 >> (x & 7);
  fs.writeFileSync(pbm, Buffer.concat([Buffer.from(`P4\n${W} ${H}\n`), body]));
  const svg = run('autotrace', ['-output-format', 'svg', '-color-count', '2', '-corner-threshold', '70', '-line-threshold', '2', '-error-threshold', '0.9', pbm], { maxBuffer: 1 << 26 }).toString();
  // first shape is the white background; the rest (black regions and the white holes inside them) combine even-odd
  return [...svg.matchAll(/ d="([^"]+)"/g)].slice(1).map((mm) => mm[1]).join(' ')
    .replace(/-?\d+(\.\d+)?/g, (n) => String(+(+n / S).toFixed(2)));
}
const px = { base: raster('A-WALL', 'w'), demo: raster('A-WALL-DEMO', 'dm'), new: raster('A-WALL-NEWW', 'nw') };
const existing = regions([{ key: 'base', px: px.base }, { key: 'demo', px: px.demo }], ptSeeds.concat(glaz('A-GLAZ')));
const proposed = regions([{ key: 'base', px: px.base }, { key: 'new', px: px.new }], ptSeeds.concat(glaz(['A-GLAZ', 'A-GLAZ-NEWW'])));
const baseMask = existing.base.map((v, i) => v | proposed.base[i]);
const poche = { base: trace(baseMask, 'base'), demo: trace(existing.demo, 'demo'), new: trace(proposed.new, 'new') };
fs.rmSync(tmp, { recursive: true, force: true });

// Compact path data: absolute start, relative steps, 2 decimals (0.24 in).
const f2 = (v) => { const s = (Math.round(v * 100) / 100).toFixed(2).replace(/\.?0+$/, ''); return s === '-0' ? '0' : s; };
function pathData(list) {
  let out = '';
  for (const p of list) {
    const q = p.map(([x, y]) => [Math.round(x * 100), Math.round(y * 100)]).filter((v, i, a) => !i || v[0] !== a[i - 1][0] || v[1] !== a[i - 1][1]);
    if (q.length < 2) continue;
    out += `M${f2(q[0][0] / 100)} ${f2(q[0][1] / 100)}l` + q.slice(1).map((v, i) => `${f2((v[0] - q[i][0]) / 100)} ${f2((v[1] - q[i][1]) / 100)}`).join(' ').replace(/ -/g, '-');
  }
  return out;
}
const el = (cls, list) => { const dd = pathData(list); return dd ? `<path class="${cls}" d="${dd}"/>` : ''; };
function group(key) {
  const L = LAYERS[key];
  return `<g class="rp-${key}">` +
    (L.site ? el('rp-site', lay(L.site)) : '') +
    el('rp-fine', lay(L.fine)) + (L.head ? el('rp-head', lay(L.head)) : '') + el('rp-line', lay(L.line)) +
    (poche[key] ? `<path class="rp-poche" fill-rule="evenodd" d="${poche[key]}"/>` : '') + el('rp-wall', lay(L.wall)) + '</g>';
}
const label = (t) => {
  const [dx, dy] = NUDGE[t.id] || [0, 0];
  const cls = ['rp-label', MINOR.has(t.id) ? 'is-minor' : '', NEW_ROOMS.has(t.id) ? 'is-new' : ''].filter(Boolean).join(' ');
  const x = f2(t.at[0] + dx), lines = (SHORT[t.id] || names[t.id]).split('\n');
  const body = lines.length < 2 ? lines[0] : lines.map((s, i) => `<tspan x="${x}" dy="${i ? 1.15 : -0.575 * (lines.length - 1)}">${s}</tspan>`).join('');
  const base = t.at[1] + t.h * 0.5 + dy; // data-cy: visual centre, for the page's HTML labels
  return `<text class="${cls}" data-room="${t.id}" data-cy="${f2(base - 0.33)}" x="${x}" y="${f2(base)}">${body}</text>`;
};
const sx = VIEW.x + 1.5, sy = VIEW.y + VIEW.h - 1.6; // scale bar, 10 ft, bottom left
const scale = `<g class="rp-scale"><path class="rp-line" d="M${sx} ${sy}h10M${sx} ${sy - 0.35}v0.7M${sx + 5} ${sy - 0.25}v0.5M${sx + 10} ${sy - 0.35}v0.7"/>` +
  [[0, '0'], [5, '5'], [10, '10 ft']].map(([o, s]) => `<text class="rp-scale-label" x="${sx + o}" y="${f2(sy + 1.25)}">${s}</text>`).join('') + '</g>';

const css = `.rp-poche{fill:#1a1b12}.rp-wall,.rp-line,.rp-fine,.rp-head,.rp-site{fill:none;stroke:#1a1b12;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke}` +
  `.rp-wall{stroke-width:.8px}.rp-line{stroke-width:.8px}.rp-fine{stroke:#5a5d55;stroke-width:.55px}.rp-head{stroke:#5a5d55;stroke-width:.55px;stroke-dasharray:4 3}.rp-site{stroke:#5a5d55;stroke-width:.8px}` +
  `.rp-demo{display:none}.rp-new .rp-poche{fill:#5f8a5c}.rp-new .rp-wall,.rp-new .rp-line,.rp-new .rp-fine{stroke:#3f6a45}` +
  `.rp-label,.rp-scale-label{font-family:"Noto Sans",Arial,sans-serif;font-size:.95px;letter-spacing:.04px;fill:#5a5d55;text-anchor:middle}`;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}" width="${VIEW.w * 16}" height="${VIEW.h * 16}" class="rome-plan">` +
  `<title>First-floor plan, proposed</title><style>${css}</style>` +
  group('base') + group('demo') + group('new') + `<g class="rp-labels">${tags.map(label).join('')}</g>` + scale + '</svg>\n';
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, svg);
const kb = (s) => `${(s.length / 1024).toFixed(0)} KB`;
console.log(path.relative(process.cwd(), OUT), kb(svg), '| poché', Object.entries(poche).map(([k, v]) => `${k} ${kb(v)}`).join(', '),
  '| rooms', tags.map((t) => t.id).join(' '));
