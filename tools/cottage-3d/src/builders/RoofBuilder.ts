/**
 * RoofBuilder — standing-seam metal roof and the trim that goes with it.
 *
 * Main roof (side-gabled, ridge along x, optional rear shed dormer): one slab
 * extruded from the (z, y) profile in roofProfile.ts, plus standing seams,
 * ridge cap, fascia, rake boards and the cornice wedge that closes the gap
 * between the front/rear wall tops and the soffit.
 * Second-floor trim lives with the walls, not the roof, so it travels with the
 * second floor when the model explodes: the frieze band with its brow-window
 * holes (buildFrieze) and the gable siding triangles (buildGableInfill).
 * Wing: shed-roof slab, wedge infills over its side walls, cornice band.
 * Also exports the corner pilasters (Greek Revival trim boards) per level.
 */
import * as THREE from 'three';
import type { HouseData, Level, Opening, Vec2 } from '../data/schema';
import type { Materials } from '../materials';
import { GeometryBatch, extrudeAlongX, slopedBox } from './geometry';
import { roofProfile, type RoofProfile } from './roofProfile';

/** Exterior wall thickness (all levels above the foundation). */
const WALL_T = 6;
const SEAM = 1.2;

const levelTop = (l: Level | undefined): number => (l ? l.floorY + l.ceilingHeight : 0);

/** Standing seams along a sloped top line p→q, every `spacing` inches in x. */
function addSeams(b: GeometryBatch, m: Materials, x0: number, x1: number, spacing: number, p: Vec2, q: Vec2): void {
  const n = Math.floor((x1 - x0) / spacing);
  const start = x0 + ((x1 - x0) - n * spacing) / 2;
  for (let i = 0; i <= n; i++) slopedBox(b, m.roof, start + i * spacing, SEAM, p, q, SEAM, SEAM / 2);
}

/** Region between height `base` and the roof underside for z in [zb, za] (za > zb), as a (z, y) polygon. */
function underRoofRegion(prof: RoofProfile, base: number, za: number, zb: number): Vec2[] {
  const mids = prof.breaks.filter((z) => z < za && z > zb).sort((a, c) => c - a);
  const top: Vec2[] = [za, ...mids, zb].map((z) => [z, prof.under(z)]);
  return [[za, base], [zb, base], ...top.reverse()];
}

/** Main roof slab, seams, boards and cornice wedges. Lives in the `roof` level group. */
export function buildMainRoof(data: HouseData, m: Materials): THREE.Group {
  const r = data.roof.main;
  const prof = roofProfile(r);
  const { path, thickness: t } = prof;
  const b = new GeometryBatch();
  const x0 = r.xMin - r.overhangRake, x1 = r.xMax + r.overhangRake, xc = (x0 + x1) / 2;

  const slab: Vec2[] = [...path, ...[...path].reverse().map(([z, y]): Vec2 => [z, y - t])];
  b.add(extrudeAlongX(slab, x0, x1), m.roof);
  for (let i = 0; i < path.length - 1; i++) {
    addSeams(b, m, x0 + 3, x1 - 3, r.seamSpacing, path[i], path[i + 1]);
    for (const sx of [x0 - 0.75, x1 + 0.75]) slopedBox(b, m.trim, sx, 1.5, path[i], path[i + 1], 7, -2.5); // rake boards
  }
  b.box(m.roof, [x1 - x0, 3, 3], [xc, r.ridgeY, (r.zFront + r.zRear) / 2], [Math.PI / 4, 0, 0]); // ridge cap

  // Cornice wedge under each eave: fills wall top → soffit; fascia board on the slab edge.
  const frontTop = data.roof.frieze?.topY ?? r.eaveY - t;
  const rearTop = r.rearDormer?.wallTopY ?? frontTop;
  for (const [wallZ, dir, wallTop, tip] of [
    [r.zFront, 1, frontTop, path[0]], [r.zRear, -1, rearTop, path[path.length - 1]],
  ] as const) {
    const inner = wallZ - dir * WALL_T;
    const edgeTop = Math.max(prof.under(tip[0]), wallTop + 0.5);
    b.add(extrudeAlongX([[inner, wallTop], [tip[0], wallTop], [tip[0], edgeTop], [inner, prof.under(inner)]], x0, x1), m.trim);
    b.box(m.trim, [x1 - x0 + 3, t + 3.5, 1.5], [xc, tip[1] - t / 2 - 1.75, tip[0] + dir * 0.75]);
  }
  return b.toGroup('roof-main');
}

/** Second-floor windows on the exterior wall plane `pred`, as x/z extents and heights (house Y). */
function secondFloorOpenings(data: HouseData, pred: (o: Opening) => boolean): { op: Opening; sill: number; head: number }[] {
  const second = data.levels.find((l) => l.id === 'second');
  if (!second) return [];
  return second.openings.filter((o) => o.exterior && pred(o)).map((op) => ({ op, sill: second.floorY + op.sill, head: second.floorY + op.head }));
}

/** Frieze band (front, Option 1 trim) with holes for the brow windows. Lives with the second floor. */
export function buildFrieze(data: HouseData, m: Materials): THREE.Group | null {
  const fr = data.roof.frieze, r = data.roof.main;
  if (!fr) return null;
  const top = fr.topY ?? r.eaveY - r.thickness, bottom = top - fr.height;
  const wins = secondFloorOpenings(data, (o) => o.kind === 'window' && Math.abs(Math.sin(o.angle)) < 0.5 && Math.abs(o.center[1] - r.zFront) < 10)
    .sort((a, c) => a.op.center[0] - c.op.center[0]);
  const b = new GeometryBatch();
  const depth = fr.projection + 1, cz = r.zFront + (fr.projection - 1) / 2;
  const band = (xa: number, xb: number, ya: number, yb: number) => {
    if (xb - xa > 0.01 && yb - ya > 0.01) b.box(m.trim, [xb - xa, yb - ya, depth], [(xa + xb) / 2, (ya + yb) / 2, cz]);
  };
  let x = r.xMin - 0.75;
  for (const { op, sill, head } of wins) {
    const wa = op.center[0] - op.width / 2, wb = op.center[0] + op.width / 2;
    band(x, wa, bottom, top);
    band(wa, wb, bottom, Math.min(sill, top)); // below the window
    band(wa, wb, Math.max(head, bottom), top); // above it
    x = wb;
  }
  band(x, r.xMax + 0.75, bottom, top);
  return b.toGroup('frieze');
}

/** Gable siding triangles above the second-floor gable walls, split around the windows. Lives with the second floor. */
export function buildGableInfill(data: HouseData, m: Materials): THREE.Group | null {
  const r = data.roof.main;
  const prof = roofProfile(r);
  const base = data.roof.frieze?.topY ?? r.eaveY - r.thickness;
  const b = new GeometryBatch();
  for (const [xa, xb] of [[r.xMin, r.xMin + WALL_T], [r.xMax - WALL_T, r.xMax]]) {
    const wins = secondFloorOpenings(data, (o) => Math.abs(Math.sin(o.angle)) > 0.5 && o.center[0] > xa - 4 && o.center[0] < xb + 4)
      .sort((p, q) => q.op.center[1] - p.op.center[1]);
    let z = r.zFront;
    const emit = (y0: number, za: number, zb: number) => {
      if (za - zb > 0.01) b.add(extrudeAlongX(underRoofRegion(prof, y0, za, zb), xa, xb), m.siding);
    };
    for (const { op, head } of wins) {
      const za = op.center[1] + op.width / 2, zb = op.center[1] - op.width / 2;
      emit(base, z, za);
      emit(head, za, zb); // header above the window
      z = zb;
    }
    emit(base, z, r.zRear);
  }
  return b.toGroup('gable-infill');
}

/** Wing shed roof, wedge infills over its side walls and the far-wall cornice band. Lives with the first floor. */
export function buildWingRoof(data: HouseData, m: Materials): THREE.Group | null {
  const w = data.roof.wing;
  if (!w) return null;
  const b = new GeometryBatch();
  const slope = (w.highY - w.lowY) / (w.zNear - w.zFar);
  const top = (z: number) => w.lowY + slope * (z - w.zFar);
  const edge = w.zFar - w.overhang, t = w.thickness;
  const x0 = w.xMin - w.overhang, x1 = w.xMax + w.overhang, xc = (x0 + x1) / 2;
  const wallTop = levelTop(data.levels.find((l) => l.id === 'first'));

  b.add(extrudeAlongX([[w.zNear, w.highY], [edge, top(edge)], [edge, top(edge) - t], [w.zNear, w.highY - t]], x0, x1), m.roof);
  addSeams(b, m, x0 + 3, x1 - 3, data.roof.main.seamSpacing, [edge, top(edge)], [w.zNear, w.highY]);
  b.box(m.trim, [x1 - x0 + 3, t + 3.5, 1.5], [xc, top(edge) - t / 2 - 1.75, edge - 0.75]); // fascia

  // Wedge above each end wall (wall top → sloped underside), and a cornice band over the far wall.
  const wedge: Vec2[] = [[w.zFar, wallTop], [w.zNear, wallTop], [w.zNear, w.highY - t], [w.zFar, w.lowY - t]];
  for (const [a, c] of [[w.xMin, w.xMin + WALL_T], [w.xMax - WALL_T, w.xMax]]) b.add(extrudeAlongX(wedge, a, c), m.siding);
  const inner = w.zFar + WALL_T;
  b.add(extrudeAlongX([[inner, wallTop], [edge, wallTop], [edge, top(edge) - t], [inner, top(inner) - t]], w.xMin, w.xMax), m.trim);
  return b.toGroup('roof-wing');
}

/**
 * Corner pilasters (flat trim boards) on the main block for one level.
 * Rear corners hidden by the wing are skipped on the first floor. On the top
 * floor they stop at the frieze (front) and the dormer cornice (rear).
 */
export function buildCornerPilasters(data: HouseData, level: Level, m: Materials): THREE.Group {
  const r = data.roof.main, wing = data.roof.wing, fr = data.roof.frieze;
  const b = new GeometryBatch();
  const y0 = level.floorY - level.floorThickness;
  const wd = 9, proud = 1.5;
  for (const [sx, cx] of [[1, r.xMin], [-1, r.xMax]] as const) {
    for (const [sz, cz] of [[1, r.zFront], [-1, r.zRear]] as const) {
      if (sz === -1 && wing && level.id === 'first' && cx >= wing.xMin - 1 && cx <= wing.xMax + 1) continue;
      const cap = sz === 1 ? (fr ? (fr.topY ?? r.eaveY - r.thickness) - fr.height : Infinity) : r.rearDormer?.wallTopY ?? Infinity;
      const y1 = Math.min(levelTop(level), cap);
      // Box covers the corner: `wd` wide, projecting `proud` past each wall face.
      b.box(m.trim, [wd, y1 - y0, wd], [cx + sx * (wd / 2 - proud), (y0 + y1) / 2, cz + sz * (proud - wd / 2)]);
    }
  }
  return b.toGroup(`pilasters-${level.id}`);
}
