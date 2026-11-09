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
import { GeometryBatch, extrudeAlongX, slopedBox, solidFromTriangles, splitExtrudeGroups } from './geometry';
import { dormerProfile, roofProfile, truncatedProfile, type RoofProfile } from './roofProfile';

/** Exterior wall thickness (all levels above the foundation). */
const WALL_T = 6;
/** Vertical depth of the rake board below the roof slab underside. */
const RAKE_DROP = 8.8;

/** Region between height `base` and the roof underside for z in [zb, za] (za > zb), as a (z, y) polygon. */
function underRoofRegion(prof: RoofProfile, base: number, za: number, zb: number): Vec2[] {
  const mids = prof.breaks.filter((z) => z < za && z > zb).sort((a, c) => c - a);
  const top: Vec2[] = [za, ...mids, zb].map((z) => [z, prof.under(z)]);
  return [[za, base], [zb, base], ...top.reverse()];
}

/** A slab (top path + thickness) over x0..x1 with a rake board on each end that has `rake`. */
type End = 'full' | 'rear' | 'none';

function addSlab(b: GeometryBatch, m: Materials, prof: RoofProfile, x0: number, x1: number, rake: [boolean, boolean], ends: [End, End] = ['full', 'full'], cut = 0): void {
  const { path, thickness: t } = prof;
  const outline = (pts: Vec2[]): Vec2[] => [...pts, ...[...pts].reverse().map(([z, y]): Vec2 => [z, y - t])];
  const slab = extrudeAlongX(outline(path), x0, x1);
  // An end face shared with the next slab would sit exactly on the neighbour's end face and flicker where it meets the roof surface, so
  // it is not built ('none'); 'rear' keeps only the part behind z = cut, which stays exposed beside the dormer cheek wall.
  const [lo, hi] = ends;
  if (lo === 'full' && hi === 'full') b.add(slab, m.roof);
  else {
    b.add(splitExtrudeGroups(slab).sides, m.roof);
    for (const [kind, x] of [[lo, x0], [hi, x1]] as const) {
      if (kind === 'none') continue;
      let pts = path;
      if (kind === 'rear') pts = [[cut, prof.top(cut)], ...path.filter(([z]) => z < cut)];
      if (kind === 'full') pts = path;
      const cap = new THREE.ShapeGeometry(new THREE.Shape(outline(pts).map(([z, y]) => new THREE.Vector2(-z, y))));
      cap.applyMatrix4(new THREE.Matrix4().makeBasis(new THREE.Vector3(0, 0, -1), new THREE.Vector3(0, 1, 0), new THREE.Vector3(1, 0, 0)));
      cap.translate(x, 0, 0);
      b.add(cap, m.roof);
      cap.dispose();
    }
    slab.dispose();
  }
  for (let i = 0; i < path.length - 1; i++) {
    // Rake frieze board: hangs RAKE_DROP below the slab underside (measured on the side elevations), the slab edge shows above it.
    const cos = Math.abs(path[i + 1][0] - path[i][0]) / Math.hypot(path[i + 1][0] - path[i][0], path[i + 1][1] - path[i][1]);
    const thick = RAKE_DROP * cos, offset = -(t * cos + thick / 2);
    if (rake[0]) slopedBox(b, m.trim, x0 - 0.75, 1.5, path[i], path[i + 1], thick, offset);
    if (rake[1]) slopedBox(b, m.trim, x1 + 0.75, 1.5, path[i], path[i + 1], thick, offset);
  }
}

/** Cornice wedge under an eave (wall top → soffit) and the fascia board from `fasciaY0` up to the slab edge top, over x0..x1. */
function addEave(b: GeometryBatch, m: Materials, prof: RoofProfile, wallZ: number, dir: 1 | -1, wallTop: number, fasciaY0: number, x0: number, x1: number): void {
  const tip = dir === 1 ? prof.path[0] : prof.path[prof.path.length - 1];
  const inner = wallZ - dir * WALL_T;
  const edgeTop = Math.max(prof.under(tip[0]), wallTop + 0.5);
  b.add(extrudeAlongX([[inner, wallTop], [tip[0], wallTop], [tip[0], edgeTop], [inner, prof.under(inner)]], x0, x1), m.trim);
  b.box(m.trim, [x1 - x0, tip[1] - fasciaY0, 1.5], [(x0 + x1) / 2, (tip[1] + fasciaY0) / 2, tip[0] + dir * 0.75]);
}

/** Dormer: roof slab, rake boards and fascia, plus the siding cheek walls between the main slope and its underside. */
function addDormer(b: GeometryBatch, data: HouseData, m: Materials, main: RoofProfile): void {
  const r = data.roof.main, d = r.rearDormer, dp = dormerProfile(r);
  if (!d || !dp) return;
  addSlab(b, m, dp, d.roofXMin, d.roofXMax, [true, true]);
  const fasciaY0 = data.trim.dormerCornice.bands[data.trim.dormerCornice.bands.length - 1][0];
  b.box(m.trim, [d.roofXMax - d.roofXMin, d.tipY - fasciaY0, 1.5], [(d.roofXMin + d.roofXMax) / 2, (d.tipY + fasciaY0) / 2, d.tipZ - 0.75]); // fascia

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

  if (d) {
    addSlab(b, m, prof, x0, d.xMin, [true, false], ['full', 'rear'], r.zRear + WALL_T / 2);
    addSlab(b, m, prof, d.xMax, x1, [false, true], ['rear', 'full'], r.zRear + WALL_T / 2);
    // Between the cheeks the main slope stops just under the dormer roof (2" past the join): carried on to the rear wall it
    // crossed the dormer windows behind the glass line.
    addSlab(b, m, truncatedProfile(prof, d.zJoin - 2), d.xMin, d.xMax, [false, false], ['none', 'none']);
  } else {
    addSlab(b, m, prof, x0, x1, [true, true]);
  }
  b.box(m.roof, [x1 - x0, 3, 3], [xc, r.ridgeY - 2.1, (r.zFront + r.zRear) / 2], [Math.PI / 4, 0, 0]); // ridge cap (top at ridgeY)

  const fasciaY0 = data.trim.entablature.cornice.y1;
  addEave(b, m, prof, r.zFront, 1, wallTop, fasciaY0, x0, x1);
  for (const [xa, xb] of d ? [[x0, d.xMin], [d.xMax, x1]] : [[x0, x1]]) addEave(b, m, prof, r.zRear, -1, wallTop, fasciaY0, xa, xb);
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
