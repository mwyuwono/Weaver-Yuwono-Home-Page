/**
 * StairBuilder — straight flights as open stairs: treads with a small nosing,
 * riser boards and two stringers, merged into one mesh per level. The open
 * underside matters: flights pass through the stairwell openings cut in the
 * floors above (see stairwellHole).
 *
 * Stair.bottomY / topY are ABSOLUTE heights (unlike fixtures, whose baseY is
 * relative to their level's floor).
 */
import * as THREE from 'three';
import type { Level, Stair, Vec2 } from '../data/schema';
import type { Materials } from '../materials';
import { GeometryBatch } from './geometry';

const TREAD_T = 1.25, RISER_T = 0.75, NOSING = 1, STRINGER_T = 1.5, STRINGER_D = 10;
/** Clear headroom the opening above a flight must provide. */
const HEADROOM = 80;

/** Frame of a flight: a0..a1 along the climbing direction, lateral centre `lc`, unit vectors. */
function flightFrame(s: Stair) {
  const [dx, dz] = s.direction;
  const lx = -dz, lz = dx; // lateral axis (perpendicular, in plan)
  let a0 = Infinity, a1 = -Infinity, l0 = Infinity, l1 = -Infinity;
  for (const [x, z] of s.outline) {
    const a = x * dx + z * dz, l = x * lx + z * lz;
    a0 = Math.min(a0, a); a1 = Math.max(a1, a);
    l0 = Math.min(l0, l); l1 = Math.max(l1, l);
  }
  return { dx, dz, lx, lz, a0, a1, l0, l1, lc: (l0 + l1) / 2 };
}

/** Plan point at distance `a` along a flight and lateral offset `l`. */
const at = (f: ReturnType<typeof flightFrame>, a: number, l: number): Vec2 => [f.dx * a + f.lx * l, f.dz * a + f.lz * l];

/**
 * Opening to cut in the floor the flight arrives at: the part of the flight
 * (measured back from the top) where the steps are less than HEADROOM below that floor.
 */
export function stairwellHole(s: Stair): Vec2[] {
  const f = flightFrame(s);
  const slope = (s.topY - s.bottomY) / (f.a1 - f.a0);
  const start = Math.max(f.a0, f.a1 - HEADROOM / slope);
  return [at(f, start, f.l0), at(f, f.a1, f.l0), at(f, f.a1, f.l1), at(f, start, f.l1)];
}

export function buildStairs(level: Level, m: Materials): THREE.Group {
  const batch = new GeometryBatch();
  for (const s of level.stairs) {
    const f = flightFrame(s);
    const yaw = Math.atan2(-f.dz, f.dx); // local +x → climbing direction
    const tread = (f.a1 - f.a0) / s.risers;
    const rise = (s.topY - s.bottomY) / s.risers;
    const place = (a: number, y: number, l = 0): [number, number, number] => {
      const [x, z] = at(f, a, f.lc + l);
      return [x, y, z];
    };
    for (let i = 1; i <= s.risers; i++) {
      const y = s.bottomY + i * rise, front = f.a0 + (i - 1) * tread;
      batch.box(m.wood, [RISER_T, rise, s.width], place(front + RISER_T / 2, y - rise / 2), [0, yaw, 0]);
      // The last tread is the floor above.
      if (i < s.risers) batch.box(m.wood, [tread + NOSING, TREAD_T, s.width], place(front + (tread + NOSING) / 2 - NOSING, y - TREAD_T / 2), [0, yaw, 0]);
    }
    const run = f.a1 - f.a0, total = s.topY - s.bottomY;
    const len = Math.hypot(run, total), pitch = Math.atan2(total, run);
    for (const side of [-1, 1]) {
      const l = side * (s.width / 2 - STRINGER_T / 2);
      batch.box(m.wood, [len, STRINGER_D, STRINGER_T], place(f.a0 + run / 2, s.bottomY + total / 2 - STRINGER_D / 2 + 1, l), [0, yaw, pitch]);
    }
  }
  return batch.toGroup(`stairs-${level.id}`);
}
