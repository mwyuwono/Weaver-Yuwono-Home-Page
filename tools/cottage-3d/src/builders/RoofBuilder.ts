/**
 * RoofBuilder — standing-seam metal roofs and the construction that goes with them.
 *
 * Main roof (side-gabled, ridge along x): one slab extruded from the (z, y) profile in roofProfile.ts, standing seams,
 * ridge cap, rake boards and the cornice wedge that closes the gap between the wall top and the soffit.
 * Rear shed dormer: inset from both gable ends. Outside its cheek walls the main roof runs on to the normal rear eave;
 * between them the main slab ends inside the dormer rear wall and the dormer roof, fascia, rake boards and siding cheek
 * walls take over.
 * Wing: a hip roof whose apex sits on the main rear wall (it also covers the rear porch).
 * Second-floor gable siding (buildGableInfill) lives with the second floor so it travels with it when exploding.
 * Trim (pilasters, entablature, cornices) is in TrimBuilder.ts.
 */
import * as THREE from 'three';
import type { HouseData, Opening, Vec2 } from '../data/schema';
import type { Materials } from '../materials';
import { GeometryBatch, extrudeAlongX, solidFromTriangles, splitExtrudeGroups } from './geometry';
import { dormerProfile, roofProfile, truncatedProfile, type RoofProfile } from './roofProfile';
import { CROWN, FASCIA_T, SOFFIT_T, addCrownBands, addEaveBox, addPlainRake, addRake, type CorniceSpec } from './cornice';

/** Exterior wall thickness (all levels above the foundation). */
const WALL_T = 6;

/** Region between height `base` and the roof underside for z in [zb, za] (za > zb), as a (z, y) polygon. */
function underRoofRegion(prof: RoofProfile, base: number, za: number, zb: number): Vec2[] {
  const mids = prof.breaks.filter((z) => z < za && z > zb).sort((a, c) => c - a);
  const top: Vec2[] = [za, ...mids, zb].map((z) => [z, prof.under(z)]);
  return [[za, base], [zb, base], ...top.reverse()];
}

/** How a slab end is closed: full end cap, only the part behind z = cut (beside the dormer cheek), or none (shared with the next slab). */
type End = 'full' | 'rear' | 'none';

/** Slab underside under the top path, never below `clampY` (the eave soffit: rafter tails are cut level at the soffit). */
function undersidePath(path: Vec2[], t: number, clampY: number): Vec2[] {
  const out: Vec2[] = [];
  for (let i = 0; i < path.length; i++) {
    const [z, y] = path[i];
    out.push([z, Math.max(y - t, clampY)]);
    if (i + 1 < path.length) {
      const [z2, y2] = path[i + 1];
      const u0 = y - t - clampY, u1 = y2 - t - clampY;
      if (u0 * u1 < 0) { const k = u0 / (u0 - u1); out.push([z + (z2 - z) * k, clampY]); }
    }
  }
  return out;
}

/** A roof slab (top path + thickness) over x0..x1. Rake trim is built separately (cornice.ts). */
function addSlab(b: GeometryBatch, m: Materials, prof: RoofProfile, x0: number, x1: number, ends: [End, End] = ['full', 'full'], cut = 0, clampY = -Infinity): void {
  const { path, thickness: t } = prof;
  const outline = (pts: Vec2[]): Vec2[] => [...pts, ...[...undersidePath(pts, t, clampY)].reverse()];
  const slab = extrudeAlongX(outline(path), x0, x1);
  // An end face shared with the next slab would sit exactly on the neighbour's end face and flicker where it meets the roof surface, so
  // it is not built ('none'); 'rear' keeps only the part behind z = cut, which stays exposed beside the dormer cheek wall.
  const [lo, hi] = ends;
  if (lo === 'full' && hi === 'full') b.add(slab, m.roof);
  else {
    b.add(splitExtrudeGroups(slab).sides, m.roof);
    for (const [kind, x] of [[lo, x0], [hi, x1]] as const) {
      if (kind === 'none') continue;
      const pts = kind === 'rear' ? [[cut, prof.top(cut)] as Vec2, ...path.filter(([z]) => z < cut)] : path;
      const cap = new THREE.ShapeGeometry(new THREE.Shape(outline(pts).map(([z, y]) => new THREE.Vector2(-z, y))));
      cap.applyMatrix4(new THREE.Matrix4().makeBasis(new THREE.Vector3(0, 0, -1), new THREE.Vector3(0, 1, 0), new THREE.Vector3(1, 0, 0)));
      cap.translate(x, 0, 0);
      b.add(cap, m.roof);
      cap.dispose();
    }
    slab.dispose();
  }
}

/** Dormer: roof slab, rake boards and fascia, plus the siding cheek walls between the main slope and its underside. */
function addDormer(b: GeometryBatch, data: HouseData, m: Materials, main: RoofProfile): void {
  const r = data.roof.main, d = r.rearDormer, dp = dormerProfile(r);
  if (!d || !dp) return;
  addSlab(b, m, dp, d.roofXMin, d.roofXMax);
  // Fascia across the dormer eave (down to the dormer cornice) with the same stepped crown as the main eave, wrapping both
  // corners; rake fascia + crown up each side, dying onto the eave crown.
  const fasciaY0 = data.trim.dormerCornice.bands[data.trim.dormerCornice.bands.length - 1][0];
  const xa = d.roofXMin - FASCIA_T, xb = d.roofXMax + FASCIA_T;
  b.box(m.trim, [xb - xa, d.tipY - fasciaY0, FASCIA_T], [(xa + xb) / 2, (d.tipY + fasciaY0) / 2, d.tipZ - FASCIA_T / 2]);
  addCrownBands(b, m, d.tipY, 'x', xa, xb, d.tipZ - FASCIA_T, -1, [true, true]);
  const crownTop = d.tipY + CROWN[CROWN.length - 1][1];
  for (const [xo, side] of [[d.roofXMin, -1], [d.roofXMax, 1]] as const) addPlainRake(b, m, dp, xo, side, d.zJoin, d.tipZ - FASCIA_T - 3, d.tipZ, SOFFIT_T + 1.5, crownTop);

  // Cheek walls: from where the dormer underside clears the main slope back to the rear wall plane.
  let hi = d.zJoin, lo = r.zRear; // bisect for the z where dormer underside == main top surface
  for (let i = 0; i < 40; i++) {
    const mid = (hi + lo) / 2;
    if (dp.under(mid) > main.top(mid)) lo = mid; else hi = mid;
  }
  const zi = lo, zr = r.zRear;
  const cheek: Vec2[] = [[zi, main.top(zi)], [zr, main.top(zr)], [zr, dp.under(zr)], [zi, dp.under(zi)]];
  for (const [xa, xb] of [[d.xMin, d.xMin + WALL_T], [d.xMax - WALL_T, d.xMax]]) b.add(extrudeAlongX(cheek, xa, xb), m.siding);
}

/** Main roof, dormer, cornice wedges. Lives in the `roof` level group. */
export function buildMainRoof(data: HouseData, m: Materials): THREE.Group {
  const r = data.roof.main, d = r.rearDormer;
  const prof = roofProfile(r);
  const b = new GeometryBatch();
  const x0 = r.xMin - r.overhangRake, x1 = r.xMax + r.overhangRake, xc = (x0 + x1) / 2;
  const wallTop = data.roof.frieze?.topY ?? r.eaveY - r.thickness;

  const soffitY = data.trim.entablature.cornice.y1; // soffit board sits on top of the bed moulding
  const clampY = soffitY + SOFFIT_T;
  if (d) {
    addSlab(b, m, prof, x0, d.xMin, ['full', 'rear'], r.zRear + WALL_T / 2, clampY);
    addSlab(b, m, prof, d.xMax, x1, ['rear', 'full'], r.zRear + WALL_T / 2, clampY);
    // Between the cheeks the main slope stops just under the dormer roof (2" past the join): carried on to the rear wall it
    // crossed the dormer windows behind the glass line.
    addSlab(b, m, truncatedProfile(prof, d.zJoin - 2), d.xMin, d.xMax, ['none', 'none']);
  } else {
    addSlab(b, m, prof, x0, x1, ['full', 'full'], 0, clampY);
  }
  b.box(m.roof, [x1 - x0, 3, 3], [xc, r.ridgeY - 2.1, (r.zFront + r.zRear) / 2], [Math.PI / 4, 0, 0]); // ridge cap (top at ridgeY)

  // Cornice: eave boxes with returns at the gable corners, rake trim on both gables (cut round the chimney).
  const ch = data.chimney?.outline ?? [];
  const leftCuts: [number, number][] = ch.length && Math.min(...ch.map((p) => p[0])) < r.xMin + 1
    ? [[Math.min(...ch.map((p) => p[1])) - 0.5, Math.max(...ch.map((p) => p[1])) + 0.5]] : [];
  const spec: CorniceSpec = {
    prof, soffitY, wallTop, wallT: WALL_T, xL: r.xMin, xR: r.xMax, zF: r.zFront, zR: r.zRear, x0, x1,
    returnLen: data.trim.entablature.corniceReturn, leftCuts,
  };
  addEaveBox(b, m, spec, 1, x0, x1, true, true);
  if (d) { addEaveBox(b, m, spec, -1, x0, d.xMin, true, false); addEaveBox(b, m, spec, -1, d.xMax, x1, false, true); }
  else addEaveBox(b, m, spec, -1, x0, x1, true, true);
  addRake(b, m, spec, -1);
  addRake(b, m, spec, 1);
  addDormer(b, data, m, prof);
  return b.toGroup('roof-main');
}

/** Second-floor windows on the exterior wall plane `pred`, as x/z extents and heights (house Y). */
function secondFloorOpenings(data: HouseData, pred: (o: Opening) => boolean): { op: Opening; sill: number; head: number }[] {
  const second = data.levels.find((l) => l.id === 'second');
  if (!second) return [];
  return second.openings.filter((o) => o.exterior && pred(o)).map((op) => ({ op, sill: second.floorY + op.sill, head: second.floorY + op.head }));
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

/** Slab of constant vertical thickness under a planar polygon (top outline `top`, [x, y, z] CCW from above), as a closed solid. */
function slabSolid(top: [number, number, number][], t: number): THREE.BufferGeometry {
  const tris: number[] = [];
  const n = top.length;
  const low = top.map(([x, y, z]): [number, number, number] => [x, y - t, z]);
  for (let i = 1; i < n - 1; i++) tris.push(...top[0], ...top[i], ...top[i + 1], ...low[0], ...low[i + 1], ...low[i]);
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    tris.push(...top[i], ...low[i], ...low[j], ...top[i], ...low[j], ...top[j]);
  }
  return solidFromTriangles(tris);
}

/**
 * Wing hip roof: three roof planes (far slope and the two sides) meeting at an apex on the main rear wall, with
 * fascia boards round the eave and siding wedges closing the wall tops under the rising roof.
 * Lives with the first floor.
 */
export function buildWingRoof(data: HouseData, m: Materials): THREE.Group | null {
  const w = data.roof.wing;
  if (!w) return null;
  const h = w.hip, t = w.thickness, zn = w.zNear;
  const b = new GeometryBatch();
  const apex: [number, number, number] = [h.apex[0], h.apexY, h.apex[1]];
  const corner = (x: number, z: number): [number, number, number] => [x, h.eaveY, z];
  const planes: [number, number, number][][] = [
    [corner(h.x0, h.zFar), corner(h.x1, h.zFar), apex], // far slope
    [corner(h.x1, h.zFar), corner(h.x1, zn), apex], // right hip face
    [corner(h.x0, zn), corner(h.x0, h.zFar), apex], // left hip face
  ];
  for (const tri of planes) {
    const geo = slabSolid(tri, t);
    b.add(geo, m.roof);
    geo.dispose();
  }

  const farRun = zn - h.zFar, farRise = h.apexY - h.eaveY;

  // Fascia boards round the eave (far and both sides).
  const bands = data.trim.wingCornice.bands, f = h.fascia, fy0 = bands[bands.length - 1][1], drop = h.eaveY - fy0, fy = (h.eaveY + fy0) / 2;
  b.box(m.trim, [h.x1 - h.x0 + 2 * f, drop, f], [(h.x0 + h.x1) / 2, fy, h.zFar - f / 2]);
  for (const x of [h.x0 - f / 2, h.x1 + f / 2]) b.box(m.trim, [f, drop, zn - h.zFar], [x, fy, (zn + h.zFar) / 2]);

  // Siding closing each wing wall top up to the roof underside (the roof rises above the wall top).
  const slope = farRise / farRun, sideSlope = farRise / (h.x1 - apex[0]);
  const underFar = (z: number) => h.eaveY + slope * (z - h.zFar) - t;
  b.add(extrudeAlongX([[w.zFar, w.wallTopY], [w.zFar + WALL_T, w.wallTopY], [w.zFar + WALL_T, underFar(w.zFar + WALL_T)], [w.zFar, underFar(w.zFar)]], w.xMin, w.xMax), m.siding);
  const underLeft = (x: number) => h.eaveY + sideSlope * (x - h.x0) - t;
  const underRight = (x: number) => h.eaveY + sideSlope * (h.x1 - x) - t;
  // Side wedges: under the side hip face, but near the far corner the far slope is lower still — clip to both or the
  // wedge pokes through the far slope at the corners.
  const sideWedge = (xa: number, xb: number, under: number): void => {
    const zc = Math.min(zn, h.zFar + (under - (h.eaveY - t)) / slope); // where the far slope's underside reaches `under`
    const prof: Vec2[] = [[zn, w.wallTopY], [zn, under], [zc, under], [w.zFar, underFar(w.zFar)], [w.zFar, w.wallTopY]];
    b.add(extrudeAlongX(prof.filter((q, i, arr) => i === 0 || Math.hypot(q[0] - arr[i - 1][0], q[1] - arr[i - 1][1]) > 1e-3), xa, xb), m.siding);
  };
  sideWedge(w.xMin, w.xMin + WALL_T, Math.min(underLeft(w.xMin), underLeft(w.xMin + WALL_T)));
  sideWedge(w.xMax - WALL_T, w.xMax, Math.min(underRight(w.xMax), underRight(w.xMax - WALL_T)));
  return b.toGroup('roof-wing');
}
