/**
 * ChimneyBuilder — an extruded brick prism, built in vertical slices so each
 * slice can travel with the level group it passes through (the chimney would
 * otherwise stay behind when floors explode apart). The shaft ends in a plain
 * top, as on the elevations.
 */
import * as THREE from 'three';
import type { Chimney, Vec2 } from '../data/schema';
import type { Materials } from '../materials';
import { GeometryBatch, extrudeVertical, solidFromTriangles } from './geometry';

function bounds(outline: Vec2[]) {
  const xs = outline.map((p) => p[0]), zs = outline.map((p) => p[1]);
  return { x0: Math.min(...xs), x1: Math.max(...xs), z0: Math.min(...zs), z1: Math.max(...zs) };
}

function addPrism(batch: GeometryBatch, outline: Vec2[], y0: number, y1: number, m: Materials): void {
  const body = extrudeVertical(outline, undefined, y0, y1);
  batch.add(body, m.brick);
  body.dispose();
}

/** Chamfer between two rectangles with the same x extents (the wall side stays flat) and different z extents. */
function addTaper(batch: GeometryBatch, wide: Vec2[], narrow: Vec2[], y0: number, y1: number, m: Materials): void {
  const w = bounds(wide), n = bounds(narrow);
  const ring = (b: ReturnType<typeof bounds>, y: number): number[][] => [[b.x0, y, b.z0], [b.x1, y, b.z0], [b.x1, y, b.z1], [b.x0, y, b.z1]];
  const lo = ring(w, y0), hi = ring(n, y1), tris: number[] = [];
  for (let i = 0; i < 4; i++) { // four side quads
    const j = (i + 1) % 4;
    tris.push(...lo[i], ...hi[j], ...lo[j], ...lo[i], ...hi[i], ...hi[j]);
  }
  // No top/bottom faces: the wide prism below and the shaft above close the solid (and avoid coincident faces).
  batch.add(solidFromTriangles(tris, false), m.brick);
}

/** Build the part of the chimney between y0 and y1 (inches). Returns null when empty. */
export function buildChimneySlice(chimney: Chimney, y0: number, y1: number, m: Materials): THREE.Group | null {
  const lo = Math.max(y0, chimney.baseY), hi = Math.min(y1, chimney.topY);
  if (hi - lo < 0.01) return null;
  const batch = new GeometryBatch();
  const br = chimney.breast;
  if (br) {
    // Wide base from grade up to the second subfloor, a chamfer to the shaft, then the shaft itself.
    const wideTop = Math.min(hi, br.topY);
    if (wideTop - lo > 0.01) addPrism(batch, br.outline, lo, wideTop, m);
    if (lo <= br.topY + 0.01 && hi >= br.taperY - 0.01) addTaper(batch, br.outline, chimney.outline, br.topY, br.taperY, m);
    const shaftLo = Math.max(lo, br.taperY);
    if (hi - shaftLo > 0.01) addPrism(batch, chimney.outline, shaftLo, hi, m);
  } else {
    addPrism(batch, chimney.outline, lo, hi, m);
  }
  return batch.toGroup('chimney');
}
