/**
 * StairBuilder — straight flights as closed stairs: one solid with a stepped top and a sloped soffit, a tread board with a
 * small nosing on every step, and the balustrades the plans call for (a pitched one on the open side of a flight, a level
 * guard beside the stairwell on the floor above).
 *
 * Stair.bottomY / topY are ABSOLUTE heights (unlike fixtures, whose baseY is relative to their level's floor). The last
 * riser stands at the far end of the outline, so a flight has risers − 1 treads and its top step is the floor above.
 */
import * as THREE from 'three';
import type { Level, Stair, Vec2 } from '../data/schema';
import type { Materials } from '../materials';
import { GeometryBatch } from './geometry';

const TREAD_T = 1.25, NOSING = 1;
/** Vertical depth of the stair solid below the line through the inner step corners. */
const SOFFIT = 7;
/** Clear headroom the opening above a flight must provide. */
const HEADROOM = 80;
/** Balustrade: handrail height above the nosing line / above the floor, sections, baluster spacing. */
const RAIL = { pitchH: 34, levelH: 36, rail: [2.25, 2.25] as const, newel: 3.5, baluster: 1, gap: 4.9, inset: 2 };

/** Frame of a flight: a0..a1 along the climbing direction, lateral extent l0..l1, unit vectors. */
function flightFrame(s: Stair) {
  const [dx, dz] = s.direction;
  const lx = -dz, lz = dx; // lateral axis (perpendicular, in plan)
  let a0 = Infinity, a1 = -Infinity, l0 = Infinity, l1 = -Infinity;
  for (const [x, z] of s.outline) {
    const a = x * dx + z * dz, l = x * lx + z * lz;
    a0 = Math.min(a0, a); a1 = Math.max(a1, a);
    l0 = Math.min(l0, l); l1 = Math.max(l1, l);
  }
  const tread = (a1 - a0) / (s.risers - 1), rise = (s.topY - s.bottomY) / s.risers;
  return { dx, dz, lx, lz, a0, a1, l0, l1, tread, rise, slope: rise / tread };
}
type Frame = ReturnType<typeof flightFrame>;

/** Plan point at distance `a` along a flight and lateral position `l`. */
const at = (f: Frame, a: number, l: number): Vec2 => [f.dx * a + f.lx * l, f.dz * a + f.lz * l];

/** Y of the flight's soffit above a plan point (the underside of the stair solid). */
export function soffitY(s: Stair, x: number, z: number): number {
  const f = flightFrame(s);
  return s.bottomY + (x * f.dx + z * f.dz - f.a0) * f.slope - SOFFIT;
}

/**
 * Opening to cut in the floor the flight arrives at: the drawn stairwell when the plan gives one, otherwise the part of the
 * flight (measured back from the top) where the steps are less than HEADROOM below that floor.
 */
export function stairwellHole(s: Stair): Vec2[] {
  if (s.well) return s.well;
  const f = flightFrame(s);
  const start = Math.max(f.a0, f.a1 - HEADROOM / f.slope);
  return [at(f, start, f.l0), at(f, f.a1, f.l0), at(f, f.a1, f.l1), at(f, start, f.l1)];
}

/** Solid from an (a, y) side profile, extruded across the flight's width. */
function flightSolid(f: Frame, profile: Vec2[]): THREE.BufferGeometry {
  const geo = new THREE.ExtrudeGeometry(new THREE.Shape(profile.map(([a, y]) => new THREE.Vector2(a, y))), { depth: f.l1 - f.l0, bevelEnabled: false, curveSegments: 1 });
  // shape x → climbing direction, shape y → up, extrusion → lateral axis (a proper rotation for any direction).
  geo.applyMatrix4(new THREE.Matrix4().makeBasis(new THREE.Vector3(f.dx, 0, f.dz), new THREE.Vector3(0, 1, 0), new THREE.Vector3(f.lx, 0, f.lz)));
  geo.translate(f.lx * f.l0, 0, f.lz * f.l0);
  return geo;
}

function addFlight(b: GeometryBatch, m: Materials, s: Stair): void {
  const f = flightFrame(s);
  const yaw = Math.atan2(-f.dz, f.dx); // local +x → climbing direction
  const n = s.risers, width = f.l1 - f.l0, lc = (f.l0 + f.l1) / 2;
  // Stepped top (each step lowered by the tread board that sits on it), then back down along the soffit.
  const profile: Vec2[] = [[f.a0, s.bottomY]];
  for (let i = 0; i < n - 1; i++) {
    const y = s.bottomY + (i + 1) * f.rise - TREAD_T;
    profile.push([f.a0 + i * f.tread, y], [f.a0 + (i + 1) * f.tread, y]);
  }
  const soffit = (a: number) => s.bottomY + (a - f.a0) * f.slope - SOFFIT;
  profile.push([f.a1, s.topY], [f.a1, soffit(f.a1)], [f.a0 + SOFFIT / f.slope, s.bottomY]);
  const solid = flightSolid(f, profile);
  b.add(solid, m.wood);
  solid.dispose();
  for (let i = 0; i < n - 1; i++) {
    const [x, z] = at(f, f.a0 + i * f.tread + (f.tread - NOSING) / 2, lc);
    b.box(m.wood, [f.tread + NOSING, TREAD_T, width], [x, s.bottomY + (i + 1) * f.rise - TREAD_T / 2, z], [0, yaw, 0], { sizeIn: 10 });
  }
}

/** Pitched balustrade on a flight: newel at the foot, handrail parallel to the nosing line, two balusters per tread. */
function addPitchedRail(b: GeometryBatch, m: Materials, s: Stair, side: 'front' | 'rear', x0: number, x1: number): void {
  const f = flightFrame(s);
  const yaw = Math.atan2(-f.dz, f.dx), pitch = Math.atan(f.slope);
  const l = side === 'rear' ? f.l0 + RAIL.inset : f.l1 - RAIL.inset; // both flights run along +x, so lateral = plan z
  const aA = Math.max(f.a0, x0 * f.dx), aB = Math.min(f.a1, x1 * f.dx);
  const nosing = (a: number) => s.bottomY + f.rise + (a - f.a0) * f.slope; // line through the tread nosings
  const treadTop = (a: number) => s.bottomY + (Math.floor((a - f.a0) / f.tread + 1e-6) + 1) * f.rise;
  const hair = { tier: 'hairline' as const };
  // Newel on the first tread.
  const an = aA + RAIL.newel / 2 + 1, newelTop = nosing(an) + RAIL.pitchH + 4;
  const [nx, nz] = at(f, an, l);
  b.box(m.railing, [RAIL.newel, newelTop - treadTop(an), RAIL.newel], [nx, (newelTop + treadTop(an)) / 2, nz], [0, yaw, 0]);
  b.box(m.railing, [RAIL.newel + 1.5, 1.2, RAIL.newel + 1.5], [nx, newelTop + 0.6, nz], [0, yaw, 0], hair);
  // Handrail from the newel to the end of the open run.
  const r0 = an + RAIL.newel / 2, len = Math.hypot(aB - r0, (aB - r0) * f.slope), am = (r0 + aB) / 2;
  const [hx, hz] = at(f, am, l);
  b.box(m.railing, [len, RAIL.rail[1], RAIL.rail[0]], [hx, nosing(am) + RAIL.pitchH - RAIL.rail[1] / 2, hz], [0, yaw, pitch]);
  for (let a = r0 + RAIL.gap * 0.75; a < aB - 1; a += RAIL.gap) {
    const y0 = treadTop(a), y1 = nosing(a) + RAIL.pitchH - RAIL.rail[1] - 0.2;
    const [x, z] = at(f, a, l);
    b.box(m.railing, [RAIL.baluster, y1 - y0, RAIL.baluster], [x, (y0 + y1) / 2, z], [0, yaw, 0], hair);
  }
}

/** Level guard beside the stairwell on the arrival floor: end posts, top and bottom rails, balusters. */
function addLevelGuard(b: GeometryBatch, m: Materials, s: Stair, side: 'front' | 'rear', x0: number, x1: number): void {
  const f = flightFrame(s);
  const yaw = Math.atan2(-f.dz, f.dx);
  const l = side === 'rear' ? f.l0 - RAIL.inset : f.l1 + RAIL.inset; // on the floor, just outside the well
  const y = s.topY, top = y + RAIL.levelH;
  const hair = { tier: 'hairline' as const };
  const aA = x0 * f.dx + RAIL.newel / 2, aB = x1 * f.dx - RAIL.newel / 2;
  for (const a of [aA, aB]) {
    const [x, z] = at(f, a, l);
    b.box(m.railing, [RAIL.newel, RAIL.levelH + 3, RAIL.newel], [x, y + (RAIL.levelH + 3) / 2, z], [0, yaw, 0]);
    b.box(m.railing, [RAIL.newel + 1.5, 1.2, RAIL.newel + 1.5], [x, top + 3.6, z], [0, yaw, 0], hair);
  }
  const r0 = aA + RAIL.newel / 2, r1 = aB - RAIL.newel / 2, [mx, mz] = at(f, (r0 + r1) / 2, l);
  b.box(m.railing, [r1 - r0, RAIL.rail[1], RAIL.rail[0]], [mx, top - RAIL.rail[1] / 2, mz], [0, yaw, 0]);
  b.box(m.railing, [r1 - r0, 1.5, 1.5], [mx, y + 3.25, mz], [0, yaw, 0], hair);
  const count = Math.max(1, Math.round((r1 - r0) / RAIL.gap));
  for (let i = 1; i < count; i++) {
    const [x, z] = at(f, r0 + ((r1 - r0) * i) / count, l);
    b.box(m.railing, [RAIL.baluster, RAIL.levelH - RAIL.rail[1] - 4, RAIL.baluster], [x, y + 4 + (RAIL.levelH - RAIL.rail[1] - 4) / 2, z], [0, yaw, 0], hair);
  }
}

/**
 * Flights that start on this level, plus every balustrade that stands on it (a guard beside a stairwell belongs to the
 * arrival floor, so it lifts away with that floor). `flights` are all flights of the house.
 */
export function buildStairs(level: Level, m: Materials, flights: Stair[] = level.stairs): THREE.Group {
  const batch = new GeometryBatch();
  for (const s of level.stairs) addFlight(batch, m, s);
  for (const s of flights) {
    for (const r of s.rails ?? []) {
      if (r.level !== level.id) continue;
      if (level.stairs.includes(s)) addPitchedRail(batch, m, s, r.side, r.x0, r.x1);
      else addLevelGuard(batch, m, s, r.side, r.x0, r.x1);
    }
  }
  return batch.toGroup(`stairs-${level.id}`);
}
