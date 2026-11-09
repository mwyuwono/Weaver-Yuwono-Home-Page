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

export function buildFloor(level: Level, m: Materials, holes: Vec2[][] = []): THREE.Group {
  const batch = new GeometryBatch();
  const finish = level.id === 'basement' ? m.concrete : m.floor;
  const y0 = level.floorY - level.floorThickness;
  for (const poly of level.floor) {
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
