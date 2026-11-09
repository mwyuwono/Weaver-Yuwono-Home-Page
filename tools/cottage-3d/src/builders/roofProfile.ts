/**
 * Side profiles of the roofs in the (z, y) plane — shared by the roof slab, the gable infill, the cornice wedge and
 * the dormer so they all agree on where the roof is.
 *
 * Schema semantics: eaveY / ridgeY / dormer Y values are TOP surfaces; the underside is `thickness` (vertical) below.
 * The main profile is the plain symmetric gable (front tip → ridge → rear tip); the rear dormer is inset from the
 * gable ends, so outside its cheek walls the main roof runs on to the normal rear eave and the dormer has its own
 * shallower profile (`dormerProfile`).
 */
import type { Roof, Vec2 } from '../data/schema';

export interface RoofProfile {
  /** Top-surface polyline as [z, y], high z first. */
  path: Vec2[];
  /** Vertical slab thickness. */
  thickness: number;
  /** Top surface Y at plan z (z outside the path clamps to the end tips). */
  top(z: number): number;
  /** Underside Y at plan z. */
  under(z: number): number;
  /** z of the path's interior vertices (ridge), descending — where the underside changes slope. */
  breaks: number[];
}

function fromPath(path: Vec2[], thickness: number): RoofProfile {
  const top = (z: number): number => {
    if (z >= path[0][0]) return path[0][1];
    for (let i = 0; i < path.length - 1; i++) {
      const [z0, y0] = path[i], [z1, y1] = path[i + 1];
      if (z <= z0 && z >= z1) return y0 + ((y1 - y0) * (z - z0)) / (z1 - z0);
    }
    return path[path.length - 1][1];
  };
  return { path, thickness, top, under: (z) => top(z) - thickness, breaks: path.slice(1, -1).map((p) => p[0]) };
}

export function roofProfile(r: Roof['main']): RoofProfile {
  const mid = (r.zFront + r.zRear) / 2;
  const slope = (r.ridgeY - r.eaveY) / ((r.zFront - r.zRear) / 2);
  const zf = r.zFront + r.overhangEave, zr = r.zRear - r.overhangEave;
  return fromPath([[zf, r.ridgeY - slope * (zf - mid)], [mid, r.ridgeY], [zr, r.ridgeY - slope * (mid - zr)]], r.thickness);
}

/** Main profile cut off at plan z (the dormer zone: the main slab stops at the rear wall plane). */
export function truncatedProfile(prof: RoofProfile, z: number): RoofProfile {
  const keep = prof.path.filter((p) => p[0] > z);
  return fromPath([...keep, [z, prof.top(z)]], prof.thickness);
}

/** Dormer roof: from where it leaves the main rear slope to its eave tip. */
export function dormerProfile(r: Roof['main']): RoofProfile | null {
  const d = r.rearDormer;
  return d ? fromPath([[d.zJoin, d.joinY], [d.tipZ, d.tipY]], r.thickness) : null;
}
