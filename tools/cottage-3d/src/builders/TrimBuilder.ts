/**
 * TrimBuilder — Option 1 (Greek Revival) trim, built from swept/extruded profiles and merged per material:
 * water table, corner pilasters (shaft, panels, capital), the entablature on front, rear and gable returns
 * (architrave / ovolo / frieze with brow windows, cornice), the dormer and wing cornices.
 *
 * Profiles come from data.trim (measured from the elevations). Bands are stacked [y0, y1, proud] boards; a stepped
 * profile polygon [proud, y] is derived from them and swept along the plan path of the wall it decorates.
 */
import * as THREE from 'three';
import type { HouseData, Level, Opening, Vec2 } from '../data/schema';
import type { Materials } from '../materials';
import { GeometryBatch, sweepProfile } from './geometry';

type Band = [number, number, number];

const levelTop = (l: Level | undefined): number => (l ? l.floorY + l.ceilingHeight : 0);

/** Stepped cross-section [proud, y] from contiguous bands (bottom → top). */
export function steppedProfile(bands: Band[]): Vec2[] {
  const out: Vec2[] = [[0, bands[0][0]]];
  for (const [y0, y1, p] of bands) out.push([p, y0], [p, y1]);
  out.push([0, bands[bands.length - 1][1]]);
  return out;
}

/** Closed outline walked counter-clockwise as the elevations are drawn (front +x, right −z, rear −x, left +z). */
function walkOutline(poly: Vec2[]): Vec2[] {
  const area = poly.reduce((s, [x, z], i) => s + x * poly[(i + 1) % poly.length][1] - poly[(i + 1) % poly.length][0] * z, 0);
  return area > 0 ? [...poly].reverse() : poly; // the sweep wants the outward side on (−dz, dx)
}

/** Water table: a low projecting board around the first-floor outline, on top of the foundation band. */
export function buildWaterTable(data: HouseData, m: Materials): THREE.Group {
  const wt = data.trim.waterTable;
  const first = data.levels.find((l) => l.id === 'first');
  const b = new GeometryBatch();
  for (const poly of first?.floor ?? []) {
    const geo = sweepProfile(walkOutline(poly), steppedProfile([[wt.y0, wt.y1, wt.proud]]), true);
    b.add(geo, m.trim);
    geo.dispose();
  }
  return b.toGroup('water-table');
}

/** Second-floor exterior windows on the wall at plan z = `faceZ` that reach into the entablature, left → right, as x extents and heights. */
function windowsOnFace(data: HouseData, faceZ: number): { wa: number; wb: number; sill: number; head: number }[] {
  const second = data.levels.find((l) => l.id === 'second');
  const { bands } = data.trim.entablature, lo = bands[0][0], hi = bands[bands.length - 1][1];
  const pick = (o: Opening) => o.exterior && o.kind === 'window' && Math.abs(Math.sin(o.angle)) < 0.5 && Math.abs(o.center[1] - faceZ) < 10;
  return (second?.openings ?? []).filter(pick)
    .map((o) => ({ wa: o.center[0] - o.width / 2, wb: o.center[0] + o.width / 2, sill: second!.floorY + o.sill, head: second!.floorY + o.head }))
    .filter((w) => w.sill < hi && w.head > lo) // only windows that cut into the entablature (the brow windows)
    .sort((a, c) => a.wa - c.wa);
}

/**
 * Entablature on the front or rear wall: the architrave/ovolo/frieze stack with the brow windows cut out, the
 * cornice, and the returns round both gable corners (bands 19.4", cornice 27.3"). Lives with the second floor.
 */
function addEntablature(b: GeometryBatch, data: HouseData, m: Materials, face: 'front' | 'rear'): void {
  const { entablature: en } = data.trim;
  const r = data.roof.main;
  const front = face === 'front';
  const z = front ? r.zFront : r.zRear, dir = front ? 1 : -1;
  const profile = steppedProfile(en.bands);
  const sweep = (path: Vec2[], prof: Vec2[], mat: THREE.Material) => {
    const geo = sweepProfile(front ? path : [...path].reverse(), prof);
    b.add(geo, mat);
    geo.dispose();
  };

  // Spans of wall the entablature runs along. The rear shed dormer replaces the main wall between its cheeks (the
  // dormer face is plain siding with its own cornice), so there the entablature exists only at the two outer corners.
  const dormer = front ? undefined : r.rearDormer;
  const spans: [number, number][] = dormer ? [[r.xMin, dormer.xMin], [dormer.xMax, r.xMax]] : [[r.xMin, r.xMax]];
  const c = en.cornice;
  const cornice: Vec2[] = [[0, c.y0], [c.proud - 1.2, c.y0], [c.proud, c.y0 + 0.8], [c.proud, c.y1], [0, c.y1]];

  for (const [sx0, sx1] of spans) {
    // Gable returns only on the true corners (not at the dormer cheeks).
    const retA = sx0 === r.xMin, retB = sx1 === r.xMax;
    const wins = windowsOnFace(data, z).filter((w) => w.wa >= sx0 && w.wb <= sx1);

    // Bands: full-height sweeps between windows, boards above/below each window.
    const xs: number[] = [sx0, ...wins.flatMap((w) => [w.wa, w.wb]), sx1];
    for (let i = 0; i < xs.length; i += 2) {
      const a = xs[i], e = xs[i + 1];
      const path: Vec2[] = [];
      if (i === 0 && retA) path.push([sx0, z - dir * en.bandReturn]);
      path.push([a, z], [e, z]);
      if (i + 2 >= xs.length && retB) path.push([sx1, z - dir * en.bandReturn]);
      if (e - a > 0.01) sweep(path, profile, m.trim);
    }
    for (const w of wins) {
      for (const [y0, y1, p] of en.bands) {
        for (const [lo, hi] of [[y0, Math.min(y1, w.sill)], [Math.max(y0, w.head), y1]]) {
          if (hi - lo > 0.01) b.box(m.trim, [w.wb - w.wa, hi - lo, p], [(w.wa + w.wb) / 2, (lo + hi) / 2, z + dir * p / 2]);
        }
      }
    }

    // Cornice, wrapping the corners.
    sweep([...(retA ? [[sx0, z - dir * en.corniceReturn] as Vec2] : []), [sx0, z], [sx1, z], ...(retB ? [[sx1, z - dir * en.corniceReturn] as Vec2] : [])], cornice, m.trim);
  }
}

export function buildEntablature(data: HouseData, m: Materials): THREE.Group {
  const b = new GeometryBatch();
  addEntablature(b, data, m, 'front');
  addEntablature(b, data, m, 'rear');
  return b.toGroup('entablature');
}

/** Depth (inches) of the beam body behind the wing cornice stack where there is no wall (over the porch). */
const BEAM_DEPTH = 6;

/**
 * Wing cornice stack (architrave / fascia boards) round the wing's eave: down the left side, across the far side and down the
 * right side, under the hip roof. The roof's eave rectangle overhangs the wing walls by the stack's outermost projection
 * (5.3"), so on the far and right sides the stack is a relief on the wall; on the LEFT the hip roof also covers the rear porch,
 * so the stack runs on past the wing wall out to the porch corner as a free-standing beam (solid core, closed soffit) that the
 * porch post carries. Lives with the first floor.
 */
export function buildWingCornice(data: HouseData, m: Materials): THREE.Group | null {
  const w = data.roof.wing;
  if (!w) return null;
  const bands = data.trim.wingCornice.bands;
  const lip = 0.15; // the stack's outer face stands this far outside the roof edge so the slab edge is never coincident with it
  const xb = w.hip.x0 + Math.max(...bands.map((bd) => bd[2])) - lip; // beam line (back of the stack) on the porch side
  const path: Vec2[] = [[xb, w.zNear], [xb, w.zFar], [w.xMax, w.zFar], [w.xMax, w.zNear]];
  // The sweep wants the elevation order (right wall toward the rear, far wall toward −x, left wall toward the front).
  const geo = sweepProfile([...path].reverse(), steppedProfile(bands));
  const b = new GeometryBatch().add(geo, m.trim);
  geo.dispose();
  // Beam core behind the stack over the porch: along the left side and across the far side up to the wing wall.
  const y0 = bands[0][0], y1 = bands[bands.length - 1][1], h = y1 - y0, yc = (y0 + y1) / 2;
  b.box(m.trim, [BEAM_DEPTH, h, w.zNear - w.zFar], [xb + BEAM_DEPTH / 2, yc, (w.zNear + w.zFar) / 2]);
  const x0 = xb + BEAM_DEPTH, x1 = w.xMin;
  if (x1 - x0 > 0.01) b.box(m.trim, [x1 - x0, h, BEAM_DEPTH], [(x0 + x1) / 2, yc, w.zFar + BEAM_DEPTH / 2]);
  return b.toGroup('wing-cornice');
}

/** Dormer cornice across the dormer rear wall and the corner boards on its cheeks. Lives with the roof. */
export function buildDormerTrim(data: HouseData, m: Materials): THREE.Group | null {
  const r = data.roof.main, d = r.rearDormer;
  if (!d) return null;
  const t = data.trim.dormerCornice;
  const b = new GeometryBatch();
  const geo = sweepProfile([[d.xMax, r.zRear], [d.xMin, r.zRear]], steppedProfile(t.bands));
  b.add(geo, m.trim);
  geo.dispose();
  const cb = t.cornerBoard;
  for (const x of [d.xMin + cb.width / 2, d.xMax - cb.width / 2]) {
    b.box(m.trim, [cb.width, cb.y1 - cb.y0, cb.proud], [x, (cb.y0 + cb.y1) / 2, r.zRear - cb.proud / 2]);
  }
  return b.toGroup('dormer-trim');
}

/**
 * Corner pilasters of the main block for one level: a square post (19.4" wide, 2" proud on both faces), raised panels
 * on both faces and, on the second floor, the three-step capital. Rear corners are the same as the front ones.
 */
export function buildCornerPilasters(data: HouseData, level: Level, m: Materials): THREE.Group {
  const r = data.roof.main, p = data.trim.pilaster;
  const b = new GeometryBatch();
  const y0 = level.floorY - level.floorThickness;
  const y1 = level.id === 'second' ? p.shaftTopY : levelTop(level);
  const wd = p.width;
  const panel = (cx: number, cz: number, sx: number, sz: number, lo: number, hi: number, w: number, extra: number) => {
    if (hi - lo < 0.01) return;
    const mid = (lo + hi) / 2, h = hi - lo, d = p.panel.proud;
    b.box(m.trim, [w, h, d], [cx + sx * (wd / 2 - p.proud), mid, cz + sz * (p.proud + extra + d / 2)]); // front/rear face
    b.box(m.trim, [d, h, w], [cx - sx * (p.proud + extra + d / 2), mid, cz + sz * (p.proud - wd / 2)]); // gable face
  };
  for (const [sx, cx] of [[1, r.xMin], [-1, r.xMax]] as const) {
    for (const [sz, cz] of [[1, r.zFront], [-1, r.zRear]] as const) {
      b.box(m.trim, [wd, y1 - y0, wd], [cx + sx * (wd / 2 - p.proud), (y0 + y1) / 2, cz + sz * (p.proud - wd / 2)]);
      const lo = Math.max(y0, p.panel.y0), hi = Math.min(y1, p.panel.y1);
      panel(cx, cz, sx, sz, lo, hi, p.panel.width, 0);
      panel(cx, cz, sx, sz, lo, hi, p.panel.innerWidth, p.panel.proud); // inner field stacked on the panel
      if (level.id === 'second') {
        for (const [c0, c1, g] of p.capital) {
          const w = wd + 2 * g;
          b.box(m.trim, [w, c1 - c0, w], [cx + sx * (wd / 2 - p.proud), (c0 + c1) / 2, cz + sz * (p.proud - wd / 2)]);
        }
      }
    }
  }
  return b.toGroup(`pilasters-${level.id}`);
}
