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
import { GeometryBatch, extrudeVertical, pointInPolygon, withoutDownFaces } from './geometry';
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

/**
 * Exterior outlines carry tiny tabs (under half an inch) where a partition meets the wall. They add nothing the eye can see
 * but put a partition end face exactly coincident with the tab end face, and the thin slivers that result flicker through
 * the ink pass. Drop them: the partition then simply stops a hair short of a flat inner face.
 */
function dropTabs(outline: Vec2[]): Vec2[] {
  const pts = outline.slice();
  const len = (a: Vec2, b: Vec2) => Math.hypot(b[0] - a[0], b[1] - a[1]);
  for (let i = 0; i < pts.length && pts.length > 4; i++) {
    const n = pts.length, p = (k: number) => pts[(i + k) % n];
    const e0: Vec2 = [p(1)[0] - p(0)[0], p(1)[1] - p(0)[1]], e2: Vec2 = [p(3)[0] - p(2)[0], p(3)[1] - p(2)[1]];
    const antiparallel = Math.abs(e0[0] * e2[0] + e0[1] * e2[1] + len(p(0), p(1)) * len(p(2), p(3))) < 1e-6;
    if (len(p(0), p(1)) < 0.5 && len(p(2), p(3)) < 0.5 && antiparallel && len(p(1), p(2)) < 12) {
      const drop = new Set([(i + 1) % n, (i + 2) % n]);
      const kept = pts.filter((_, k) => !drop.has(k));
      pts.splice(0, pts.length, ...kept);
      i = -1;
    }
  }
  return pts;
}

/**
 * `ceiling(z0, z1)` optionally gives the highest Y an interior wall spanning plan z0..z1 may reach (inches): partitions on
 * the half-storey are authored flush with the roof underside, and near-coincident surfaces flicker in the ink pass.
 */
/**
 * Exterior walls above the foundation reach down over the edge of their own floor slab (the band between storeys), so the slab
 * edge is never exposed: a slab edge flush with the wall face is a coincident face, and the joint between the two
 * flickers in the ink pass as a dotted row across every elevation.
 */
const SKIRT = (level: Level): number => (level.id === 'basement' ? 0 : level.floorThickness);

export function buildWalls(level: Level, m: Materials, ceiling?: (z0: number, z1: number) => number): THREE.Group {
  const batch = new GeometryBatch();

  for (const wall of level.walls) {
    let top = level.floorY + (wall.height ?? level.ceilingHeight);
    if (ceiling && !wall.exterior) {
      const zs = wall.outline.map((q) => q[1]);
      top = Math.min(top, ceiling(Math.min(...zs), Math.max(...zs)));
    }
    const skirt = wall.exterior ? SKIRT(level) : 0;
    const raw = extrudeVertical(wall.exterior ? dropTabs(wall.outline) : wall.outline, wall.holes, level.floorY - skirt, top);
    const geo = skirt ? withoutDownFaces(raw) : raw;
    batch.add(geo, wallMaterial(level, wall.exterior, m));
    geo.dispose();
    if (geo !== raw) raw.dispose();
  }

  for (const op of level.openings) {
    const mat = wallMaterial(level, op.exterior, m);
    const frame = openingFrame(op, level);
    let top = flankingWallHeight(level, op);
    if (ceiling && !op.exterior) {
      const reach = (Math.abs(Math.sin(op.angle)) * op.width + Math.abs(Math.cos(op.angle)) * op.depth) / 2;
      top = Math.min(top, ceiling(op.center[1] - reach, op.center[1] + reach) - level.floorY);
    }
    // Boxes are authored in the opening's local frame, then placed with `frame`.
    const strip = (y0: number, y1: number) => {
      if (y1 - y0 < 0.01) return;
      const local = new GeometryBatch().box(mat, [op.width, y1 - y0, op.depth], [0, (y0 + y1) / 2, 0]);
      batch.addBatch(local, frame);
    };
    strip(op.exterior ? -SKIRT(level) : 0, op.sill); // sill infill
    strip(op.head, top); // header infill
  }
  return batch.toGroup(`walls-${level.id}`);
}
