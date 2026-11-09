/**
 * FloorBuilder — one slab per floor polygon, thickness below floorY.
 * Top/bottom faces get the floor finish; the exposed rim (edge band) gets the
 * exterior skin so the band between storeys reads as part of the siding.
 * `holes` are stairwell openings (plan polygons): cut through the caps, with
 * thin edge boards in the floor finish so the slab thickness does not look hollow.
 */
import * as THREE from 'three';
import type { Level, Vec2 } from '../data/schema';
import type { Materials } from '../materials';
import { GeometryBatch, extrudeVertical, pointInPolygon as pointIn, splitExtrudeGroups } from './geometry';
import { wallMaterial } from './WallBuilder';

/** Pull the slab edge in from the exterior wall faces: coincident faces z-fight and the flicker is inked as dotted lines. */
const EDGE_INSET = 0.5;

/** Polygon offset inward by `d` (mitred corners; any winding). */
function inset(poly: Vec2[], d: number): Vec2[] {
  const n = poly.length;
  const area = poly.reduce((acc, a, i) => acc + (a[0] * poly[(i + 1) % n][1] - poly[(i + 1) % n][0] * a[1]), 0);
  const s = area > 0 ? 1 : -1; // left normal points inward for CCW
  const norm = (a: Vec2, b: Vec2): Vec2 => {
    const l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    return [(-(b[1] - a[1]) / l) * s, ((b[0] - a[0]) / l) * s];
  };
  return poly.map((p, i) => {
    const n0 = norm(poly[(i + n - 1) % n], p), n1 = norm(p, poly[(i + 1) % n]);
    const k = 1 + n0[0] * n1[0] + n0[1] * n1[1];
    return k < 1e-6 ? p : [p[0] + ((n0[0] + n1[0]) * d) / k, p[1] + ((n0[1] + n1[1]) * d) / k];
  });
}

export function buildFloor(level: Level, m: Materials, holes: Vec2[][] = []): THREE.Group {
  const batch = new GeometryBatch();
  const finish = level.id === 'basement' ? m.concrete : m.floor;
  const y0 = level.floorY - level.floorThickness;
  for (const outline of level.floor) {
    const poly = inset(outline, EDGE_INSET);
    const inside = holes.filter((h) => h.every((p) => pointIn(p, poly)));
    const withHoles = extrudeVertical(poly, inside, y0, level.floorY);
    const solid = inside.length ? extrudeVertical(poly, undefined, y0, level.floorY) : withHoles;
    batch.add(splitExtrudeGroups(withHoles).caps, finish).add(splitExtrudeGroups(solid).sides, wallMaterial(level, true, m));
    for (const h of inside) {
      h.forEach((a, i) => {
        const c = h[(i + 1) % h.length];
        const len = Math.hypot(c[0] - a[0], c[1] - a[1]);
        batch.box(finish, [len, level.floorThickness, 0.3], [(a[0] + c[0]) / 2, y0 + level.floorThickness / 2, (a[1] + c[1]) / 2],
          [0, Math.atan2(-(c[1] - a[1]), c[0] - a[0]), 0]);
      });
    }
    withHoles.dispose();
    if (solid !== withHoles) solid.dispose();
  }
  return batch.toGroup(`floor-${level.id}`);
}
