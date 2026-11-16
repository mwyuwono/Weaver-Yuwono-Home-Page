/**
 * Side profiles of the roofs in the (z, y) plane — shared by the roof slab, the gable infill, the cornice wedge and
 * the dormer so they all agree on where the roof is.
 *
 * Schema semantics: eaveY / ridgeY / dormer Y values are TOP surfaces. What is modelled is the roof SKIN (metal and its
 * edge, `SKIN` thick vertically): the elevations draw the roof edge as a thin double line sitting directly on the cornice
 * cap, with the rake fascia below it. (data.roof.main.thickness is the depth down to the rake fascia's lower edge and is
 * not used for geometry.)
 * The main profile is the plain symmetric gable (front tip → ridge → rear tip); the rear dormer is inset from the
 * gable ends, so outside its cheek walls the main roof runs on to the normal rear eave and the dormer has its own
 * shallower profile (`dormerProfile`).
 */
import type { Roof, Vec2 } from '../data/schema';

/** Vertical thickness of the roof skin (roof edge as drawn on the side elevations: 1.3"). */
export const SKIN = 1.3;

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
  return fromPath([[zf, r.ridgeY - slope * (zf - mid)], [mid, r.ridgeY], [zr, r.ridgeY - slope * (mid - zr)]], SKIN);
}

/** Main profile cut off at plan z (the dormer zone: the main slab stops at the rear wall plane). */
export function truncatedProfile(prof: RoofProfile, z: number): RoofProfile {
  const keep = prof.path.filter((p) => p[0] > z);
  return fromPath([...keep, [z, prof.top(z)]], prof.thickness);
}

/** The part of a profile between plan z = zHi and zLo (zHi > zLo). */
export function clippedProfile(prof: RoofProfile, zHi: number, zLo: number): RoofProfile {
  const keep = prof.path.filter((p) => p[0] < zHi && p[0] > zLo);
  return fromPath([[zHi, prof.top(zHi)], ...keep, [zLo, prof.top(zLo)]], prof.thickness);
}

/** Dormer roof: from where it leaves the main rear slope to its eave tip. */
export function dormerProfile(r: Roof['main']): RoofProfile | null {
  const d = r.rearDormer;
  return d ? fromPath([[d.zJoin, d.joinY], [d.tipZ, d.tipY]], SKIN) : null;
}
