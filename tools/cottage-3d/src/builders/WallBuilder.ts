/**
 * WallBuilder — extrudes each wall polygon upright and fills the sill and
 * header strips around every opening.
 *
 * The extractor leaves GAPS in the wall polygons where windows/doors sit, so
 * without infill you would see straight through the gap's top and bottom.
 */
import * as THREE from 'three';
import type { Level, Opening, Vec2 } from '../data/schema';
import type { Materials } from '../materials';
import { GeometryBatch, extrudeVertical, pointInPolygon } from './geometry';
import { openingFrame } from './openingFrame';

/** Wall skin: basement exterior is foundation concrete, other exteriors are siding. */
export function wallMaterial(level: Level, exterior: boolean, m: Materials): THREE.Material {
  if (!exterior) return m.interior;
  return level.id === 'basement' ? m.concrete : m.siding;
}

/** Height of the wall that flanks an opening (walls may override the level height, e.g. under the wing roof). */
function flankingWallHeight(level: Level, op: Opening): number {
  const d: Vec2 = [Math.cos(op.angle), -Math.sin(op.angle)];
  const reach = op.width / 2 + 1;
  for (const side of [1, -1]) {
    const p: Vec2 = [op.center[0] + d[0] * reach * side, op.center[1] + d[1] * reach * side];
    const wall = level.walls.find((w) => pointInPolygon(p, w.outline));
    if (wall) return wall.height ?? level.ceilingHeight;
  }
  return level.ceilingHeight;
}

export function buildWalls(level: Level, m: Materials): THREE.Group {
  const batch = new GeometryBatch();

  for (const wall of level.walls) {
    const geo = extrudeVertical(wall.outline, wall.holes, level.floorY, level.floorY + (wall.height ?? level.ceilingHeight));
    batch.add(geo, wallMaterial(level, wall.exterior, m));
    geo.dispose();
  }

  for (const op of level.openings) {
    const mat = wallMaterial(level, op.exterior, m);
    const frame = openingFrame(op, level);
    const top = flankingWallHeight(level, op);
    // Boxes are authored in the opening's local frame, then placed with `frame`.
    const strip = (y0: number, y1: number) => {
      if (y1 - y0 < 0.01) return;
      const local = new GeometryBatch().box(mat, [op.width, y1 - y0, op.depth], [0, (y0 + y1) / 2, 0]);
      batch.addBatch(local, frame);
    };
    strip(0, op.sill); // sill infill
    strip(op.head, top); // header infill
  }
  return batch.toGroup(`walls-${level.id}`);
}
