/**
 * ChimneyBuilder — an extruded brick prism, built in vertical slices so each
 * slice can travel with the level group it passes through (the chimney would
 * otherwise stay behind when floors explode apart). The topmost slice gets a
 * corbelled cap and a flue pot.
 */
import * as THREE from 'three';
import type { Chimney, Vec2 } from '../data/schema';
import type { Materials } from '../materials';
import { GeometryBatch, extrudeVertical } from './geometry';

function bounds(outline: Vec2[]) {
  const xs = outline.map((p) => p[0]), zs = outline.map((p) => p[1]);
  return { x0: Math.min(...xs), x1: Math.max(...xs), z0: Math.min(...zs), z1: Math.max(...zs) };
}

/** Build the part of the chimney between y0 and y1 (inches); `cap` adds the top finish. Returns null when empty. */
export function buildChimneySlice(chimney: Chimney, y0: number, y1: number, cap: boolean, m: Materials): THREE.Group | null {
  const lo = Math.max(y0, chimney.baseY), hi = Math.min(y1, chimney.topY);
  if (hi - lo < 0.01) return null;
  const batch = new GeometryBatch();
  const body = extrudeVertical(chimney.outline, undefined, lo, hi);
  batch.add(body, m.brick);
  body.dispose();
  if (cap && hi >= chimney.topY - 0.01) {
    const b = bounds(chimney.outline);
    const cx = (b.x0 + b.x1) / 2, cz = (b.z0 + b.z1) / 2, w = b.x1 - b.x0, d = b.z1 - b.z0;
    batch.box(m.brick, [w + 3, 4, d + 3], [cx, hi + 2, cz]); // corbel
    batch.box(m.concrete, [w + 6, 3, d + 6], [cx, hi + 5.5, cz]); // cap slab
    batch.box(m.brick, [w * 0.45, 12, d * 0.45], [cx, hi + 13, cz]); // flue
  }
  return batch.toGroup('chimney');
}
