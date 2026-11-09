/**
 * Side profile of the main roof in the (z, y) plane — shared by the roof slab,
 * the gable infill, the frieze and the cornice so they all agree on where the
 * roof is.
 *
 * Schema semantics: eaveY / ridgeY / dormer Y values are TOP surfaces; the
 * underside is `thickness` (vertical) below. The front slope and the main rear
 * slope share one slope derived from eaveY, ridgeY and the plan depth; the
 * optional rear dormer replaces the rear slope behind `zJoin` with a shallower
 * shed roof that ends in an eave tip beyond the rear wall plane.
 */
import type { Roof, Vec2 } from '../data/schema';

export interface RoofProfile {
  /** Top-surface polyline, front tip → ridge → (join) → rear tip, as [z, y]. */
  path: Vec2[];
  /** Vertical slab thickness. */
  thickness: number;
  /** Top surface Y at plan z (z outside the path clamps to the end tips). */
  top(z: number): number;
  /** Underside Y at plan z. */
  under(z: number): number;
  /** z of the path's interior vertices (ridge, join), descending — where the underside changes slope. */
  breaks: number[];
}

export function roofProfile(r: Roof['main']): RoofProfile {
  const mid = (r.zFront + r.zRear) / 2;
  const slope = (r.ridgeY - r.eaveY) / ((r.zFront - r.zRear) / 2);
  const front: Vec2 = [r.zFront + r.overhangEave, r.ridgeY - slope * (r.zFront + r.overhangEave - mid)];
  const d = r.rearDormer;
  const rear: Vec2 = d ? [d.tipZ, d.tipY] : [r.zRear - r.overhangEave, r.ridgeY - slope * (mid - (r.zRear - r.overhangEave))];
  const path: Vec2[] = [front, [mid, r.ridgeY], ...(d ? ([[d.zJoin, d.joinY]] as Vec2[]) : []), rear];

  const top = (z: number): number => {
    if (z >= path[0][0]) return path[0][1];
    for (let i = 0; i < path.length - 1; i++) {
      const [z0, y0] = path[i], [z1, y1] = path[i + 1];
      if (z <= z0 && z >= z1) return y0 + ((y1 - y0) * (z - z0)) / (z1 - z0);
    }
    return path[path.length - 1][1];
  };
  return {
    path, thickness: r.thickness, top,
    under: (z) => top(z) - r.thickness,
    breaks: path.slice(1, -1).map((p) => p[0]),
  };
}
