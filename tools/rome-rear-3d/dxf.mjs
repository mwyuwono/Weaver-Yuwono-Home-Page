// Reads the Rome AutoCAD source (DXF exported from "Clocktower Cottage 2022.dwg", the newest DWG) without dependencies.
// The DXF lives on Drive, never in git: it carries owner names and the street address in its title blocks.
//   node dxf.mjs                      -> out/dxf-summary.json (header, layers, layouts, entity counts, extents)
//   node dxf.mjs svg <layer,...>      -> out/dxf-<name>.svg   (model-space linework of those layers, for checking)
// The path comes from sources.local.json (gitignored) or ROME_DXF=/path/to/file.dxf.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const LOCAL = path.join(HERE, 'sources.local.json'); // gitignored: Drive paths (they contain the street address)
export const SOURCES = fs.existsSync(LOCAL) ? JSON.parse(fs.readFileSync(LOCAL, 'utf8')) : {};
export const DXF_PATH = process.env.ROME_DXF || SOURCES.dxf;

// DXF (inches) -> model plan feet. The first-floor plan near DXF y 4090–5034 has the rear porch and matches the plotted
// A102/A104 sheets; the copy near y 423–1366 (offset -382, -3668) has no porch, yet every paper-space viewport in this DXF
// (A101, A102, A104) points at it, so the layouts are not a guide to the current design. Second floor plan: DXF x 1030–1535,
// y 501–922 (A105). Elevations: y ≈ 3035 ground line.
export const DXF_TO_MODEL = { scale: 1 / 12, ox: -26.882, oy: -349.459 };
export const dxfToModel = ([x, y]) => [x * DXF_TO_MODEL.scale + DXF_TO_MODEL.ox, y * DXF_TO_MODEL.scale + DXF_TO_MODEL.oy];

export function readPairs(file = DXF_PATH) {
  const lines = fs.readFileSync(file, 'latin1').split(/\r?\n/);
  const pairs = [];
  for (let i = 0; i + 1 < lines.length; i += 2) pairs.push([parseInt(lines[i], 10), lines[i + 1].trim()]);
  return pairs;
}

// Splits into sections; returns entities (with layer, owner handle, raw group codes) and tables.
export function parse(pairs) {
  const out = { header: {}, layers: {}, blockRecords: {}, layouts: [], entities: [], blocks: {} };
  let i = 0;
  const next = () => pairs[i++];
  while (i < pairs.length) {
    const [c, v] = next();
    if (c !== 0 || v !== 'SECTION') continue;
    const [, name] = next();
    if (name === 'HEADER') {
      let key = null;
      while (i < pairs.length && !(pairs[i][0] === 0 && pairs[i][1] === 'ENDSEC')) {
        const [gc, gv] = next();
        if (gc === 9) { key = gv; out.header[key] = []; } else if (key) out.header[key].push(gv);
      }
    } else if (name === 'TABLES' || name === 'OBJECTS' || name === 'ENTITIES' || name === 'BLOCKS') {
      let cur = null, block = null;
      while (i < pairs.length && !(pairs[i][0] === 0 && pairs[i][1] === 'ENDSEC')) {
        const [gc, gv] = next();
        if (gc === 0) {
          cur = { type: gv, g: [] };
          if (name === 'TABLES' && gv === 'LAYER') cur.kind = 'layer';
          if (name === 'TABLES' && gv === 'BLOCK_RECORD') cur.kind = 'blockRecord';
          if (name === 'OBJECTS' && gv === 'LAYOUT') { cur.kind = 'layout'; out.layouts.push(cur); }
          if (name === 'BLOCKS' && gv === 'BLOCK') { block = cur; cur.kind = 'block'; }
          if (name === 'BLOCKS' && gv === 'ENDBLK') block = null;
          if (name === 'ENTITIES') out.entities.push(cur);
          if (name === 'BLOCKS' && block && cur !== block && gv !== 'ENDBLK') { (block.ents ||= []).push(cur); }
          if (cur.kind === 'layer') out.layers[Symbol.for(out.layers.length)] = cur;
          continue;
        }
        if (cur) cur.g.push([gc, gv]);
        if (cur && cur.kind === 'block' && gc === 2) out.blocks[gv] = cur;
      }
    }
  }
  // tidy tables
  const val = (e, code) => (e.g.find(([c]) => c === code) || [])[1];
  const layers = {};
  for (const s of Object.getOwnPropertySymbols(out.layers)) { const e = out.layers[s]; layers[val(e, 2)] = { color: +val(e, 62), off: +val(e, 62) < 0 }; }
  out.layers = layers;
  out.layouts = out.layouts.map((e) => ({ name: (e.g.filter(([c]) => c === 1).pop() || [])[1], tab: +val(e, 71), blockRecord: val(e, 330) }));
  for (const e of out.entities) { e.layer = val(e, 8); e.space = val(e, 67) === '1' ? 'paper' : 'model'; e.owner = val(e, 330); }
  return out;
}

// LINE / LWPOLYLINE / ARC / CIRCLE to polylines (model coordinates, drawing units)
export function toPolylines(e) {
  const nums = (code) => e.g.filter(([c]) => c === code).map(([, v]) => +v);
  const one = (code, d = 0) => { const f = e.g.find(([c]) => c === code); return f ? +f[1] : d; };
  if (e.type === 'LINE') return [[[one(10), one(20)], [one(11), one(21)]]];
  if (e.type === 'LWPOLYLINE') {
    const xs = nums(10), ys = nums(20), pts = xs.map((x, k) => [x, ys[k]]);
    if ((one(70) & 1) && pts.length) pts.push(pts[0]);
    return [pts];
  }
  if (e.type === 'ARC' || e.type === 'CIRCLE') {
    const cx = one(10), cy = one(20), r = one(40);
    let a0 = e.type === 'ARC' ? one(50) : 0, a1 = e.type === 'ARC' ? one(51) : 360;
    if (a1 < a0) a1 += 360;
    const n = Math.max(8, Math.ceil((a1 - a0) / 10)), pts = [];
    for (let k = 0; k <= n; k++) { const a = (a0 + (a1 - a0) * k / n) * Math.PI / 180; pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); }
    return [pts];
  }
  return [];
}

const UNITS = { 0: 'unitless', 1: 'inches', 2: 'feet', 4: 'millimetres', 5: 'centimetres', 6: 'metres' };

if (fileURLToPath(import.meta.url) === path.resolve(process.argv[1] || "")) {
  const t0 = Date.now();
  const d = parse(readPairs());
  fs.mkdirSync(path.join(HERE, 'out'), { recursive: true });
  const mode = process.argv[2];
  if (mode === 'svg') {
    const want = new Set((process.argv[3] || '').split(','));
    const polys = d.entities.filter((e) => e.space === 'model' && want.has(e.layer)).flatMap(toPolylines);
    const xs = polys.flat().map((p) => p[0]), ys = polys.flat().map((p) => p[1]);
    const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
    const s = 1600 / Math.max(x1 - x0, y1 - y0);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${((x1 - x0) * s + 20) | 0}" height="${((y1 - y0) * s + 20) | 0}"><rect width="100%" height="100%" fill="white"/>` +
      polys.map((p) => `<polyline fill="none" stroke="black" stroke-width="0.7" points="${p.map(([x, y]) => `${((x - x0) * s + 10).toFixed(1)},${((y1 - y) * s + 10).toFixed(1)}`).join(' ')}"/>`).join('') + '</svg>';
    const f = path.join(HERE, 'out', `dxf-${[...want].join('_').replace(/[^\w-]+/g, '-').slice(0, 60)}.svg`);
    fs.writeFileSync(f, svg);
    console.log(f, `extents x ${x0.toFixed(2)}..${x1.toFixed(2)} y ${y0.toFixed(2)}..${y1.toFixed(2)}`);
  } else {
    const counts = {};
    for (const e of d.entities) { const k = `${e.space}|${e.layer}`; (counts[k] ||= {})[e.type] = (counts[k][e.type] || 0) + 1; }
    const summary = {
      file: DXF_PATH, read: new Date().toISOString(),
      version: d.header.$ACADVER?.[0], units: UNITS[d.header.$INSUNITS?.[0]] || d.header.$INSUNITS?.[0],
      measurement: d.header.$MEASUREMENT?.[0] === '0' ? 'imperial' : 'metric',
      extMin: d.header.$EXTMIN, extMax: d.header.$EXTMAX, lastSavedBy: d.header.$LASTSAVEDBY?.[0], tdupdate: d.header.$TDUPDATE?.[0],
      layouts: d.layouts, layers: d.layers, entityCounts: counts,
    };
    fs.writeFileSync(path.join(HERE, 'out', 'dxf-summary.json'), JSON.stringify(summary, null, 1));
    console.log(`${summary.version}, units ${summary.units}, ${summary.measurement}; extents ${summary.extMin} .. ${summary.extMax}`);
    console.log(`layouts: ${d.layouts.map((l) => l.name).join(', ')}`);
    const rows = Object.entries(counts).map(([k, v]) => [k, Object.values(v).reduce((a, b) => a + b, 0), JSON.stringify(v)]).sort((a, b) => b[1] - a[1]);
    for (const r of rows.slice(0, 60)) console.log(r.join('  '));
    console.log(`${d.entities.length} entities, parsed in ${Date.now() - t0} ms`);
  }
}
