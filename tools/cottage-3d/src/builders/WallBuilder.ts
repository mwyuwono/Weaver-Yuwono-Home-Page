/**
 * WallBuilder — extrudes each wall polygon upright and fills the sill and
 * header strips around every opening.
 *
 * The extractor leaves GAPS in the wall polygons where windows/doors sit, so
 * without infill you would see straight through the gap's top and bottom.
 */
import * as THREE from 'three';
import type { Level, Opening, Vec2, Wall } from '../data/schema';
import type { Materials } from '../materials';
import { GeometryBatch, extrudeVertical, pointInPolygon, withoutDownFaces } from './geometry';
import { openingFrame } from './openingFrame';

/** Wall skin: basement exterior is foundation concrete, other exteriors are siding. */
export function wallMaterial(level: Level, exterior: boolean, m: Materials): THREE.Material {
  if (!exterior) return m.interior;
  return level.id === 'basement' ? m.concrete : m.siding;
}

/** The wall pieces on either side of an opening (walls may override the level height, e.g. under the wing roof). */
function flankingWalls(level: Level, op: Opening): Wall[] {
  const d: Vec2 = [Math.cos(op.angle), -Math.sin(op.angle)];
  const reach = op.width / 2 + 1;
  const out: Wall[] = [];
  for (const side of [1, -1]) {
    const p: Vec2 = [op.center[0] + d[0] * reach * side, op.center[1] + d[1] * reach * side];
    const wall = level.walls.find((w) => pointInPolygon(p, w.outline));
    if (wall) out.push(wall);
  }
  return out;
}

const flankingWall = (level: Level, op: Opening): Wall | undefined => flankingWalls(level, op)[0];

/** Height of the walls that flank an opening: the LOWER of the two sides, so the header infill never stands proud of either. */
function flankingWallHeight(level: Level, op: Opening): number {
  const walls = flankingWalls(level, op);
  return walls.length ? Math.min(...walls.map((w) => w.height ?? level.ceilingHeight)) : level.ceilingHeight;
}

/**
 * Where the flanking wall's two faces lie across the opening, as local z of the opening frame (so the sill and header infill
 * can sit EXACTLY on the wall faces). The schema gives the opening a nominal centreline and depth, which are a few hundredths
 * of an inch off the wall polygon's faces; infill that is not exactly coplanar with the wall leaves a hairline step at each
 * jamb, which draws as a stray vertical line running through the whole storey above and below the window.
 */
function wallFaces(level: Level, op: Opening, frame: THREE.Matrix4): [number, number] {
  const wall = flankingWall(level, op);
  if (!wall) return [-op.depth / 2, op.depth / 2];
  const inv = frame.clone().invert();
  // Only the vertices at the opening's jambs: they are the corners of the wall's own end faces (partition tabs elsewhere on
  // the outline must not widen the strip).
  const zs = wall.outline.map(([x, z]) => new THREE.Vector3(x, 0, z).applyMatrix4(inv)).filter((v) => Math.abs(Math.abs(v.x) - op.width / 2) < 0.5).map((v) => v.z);
  if (zs.length < 2) return [-op.depth / 2, op.depth / 2];
  const lo = Math.min(...zs), hi = Math.max(...zs);
  return Math.abs(hi - lo - op.depth) < 0.5 ? [lo, hi] : [-op.depth / 2, op.depth / 2]; // only trust a piece about as thick as the opening
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
    // Infill strips sit flush with the wall faces, so their box edges are not
    // drawing lines (the reveal edges come from the wall extrusion itself).
    const [zLo, zHi] = wallFaces(level, op, frame);
    const strip = (y0: number, y1: number) => {
      if (y1 - y0 < 0.01) return;
      // 0.1" wider than the opening so the strip overlaps both jambs (jamb faces are skewed by ~0.01") instead of leaving a hairline between strip and wall.
      const local = new GeometryBatch().box(mat, [op.width + 0.1, y1 - y0, zHi - zLo], [0, (y0 + y1) / 2, (zLo + zHi) / 2], [0, 0, 0], { lines: 'none' });
      batch.addBatch(local, frame);
    };
    strip(op.exterior ? -SKIRT(level) : 0, op.sill); // sill infill
    strip(op.head, top); // header infill
  }
  return batch.toGroup(`walls-${level.id}`);
}
