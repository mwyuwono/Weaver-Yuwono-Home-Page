/**
 * Cornice construction for the gabled main roof, as drawn on the elevations (Greek Revival, all flat boards):
 *
 *  EAVE (front and rear): above the bed moulding (TrimBuilder) a deep CORONA whose underside is the soffit, a thin CAP
 *  projecting a little further, and the roof edge sitting directly on the cap.
 *
 *  CORNICE RETURN at each gable corner: corona and cap mitre round the corner and run back along the gable wall, each
 *  ending square a step past the one below. The return is flat-topped; nothing is built on it.
 *
 *  RAKE (gable edges): the roof edge, a flat rake fascia set back under it (the corona carried up the slope), a soffit
 *  closing the overhang and a rake frieze board on the gable wall. Fascia, soffit and frieze all die onto the flat top
 *  of the return.
 *
 * All values are inches, house coordinates (plan [x, z], z = 0 front wall face, house toward −z). Projections and
 * heights are measured from the DXF elevations.
 */
import type { Vec2 } from '../data/schema';
import type { Materials } from '../materials';
import { GeometryBatch, extrudeAlongX, sweepProfile } from './geometry';
import type { RoofProfile } from './roofProfile';

export const CORNICE = {
  /** Corona: height above the bed moulding, projection from the wall face, return length from the wall corner. */
  corona: { h: 3.1, proud: 12.9, ret: 22.8 },
  /** Cap on top of the corona. Its projection is also the rake overhang of the roof edge. */
  cap: { h: 1.1, proud: 13.6, ret: 23.4 },
  /** Rake boards, as vertical drops below the roof top surface. */
  rake: { fasciaDrop: 6.9, fasciaT: 1.0, friezeDrop: 15.7, friezeProud: 1.0 },
} as const;

export interface CorniceSpec {
  prof: RoofProfile;
  /** Top of the bed moulding (= underside of the corona, the eave soffit). */
  bedTop: number;
  /** Top of the wall / frieze, where the hidden eave fill starts. */
  wallTop: number;
  wallT: number;
  /** Main block wall faces. */
  xL: number; xR: number; zF: number; zR: number;
  /** z ranges where the rake trim on the LEFT gable is interrupted (a chimney rising through the rake). */
  leftCuts: [number, number][];
}

/** Top of the cap: the flat top of the cornice returns, and the level the roof edge sits on. */
export const capTop = (s: CorniceSpec): number => s.bedTop + CORNICE.corona.h + CORNICE.cap.h;

/**
 * Region between top(z)+b and top(z)+a, clipped below at `clip`, for z in [zLo, zHi], as a (z, y) polygon (or null).
 * The profile is piecewise linear, so the boundary is exact with the profile breaks and crossing points.
 */
function rakeBand(prof: RoofProfile, zHi: number, zLo: number, a: number, b: number, clip: number): Vec2[] | null {
  const zs = new Set<number>([zHi, zLo]);
  const pts = prof.path;
  for (let i = 0; i < pts.length - 1; i++) {
    const [za, ya] = pts[i], [zb, yb] = pts[i + 1];
    if (za < zHi && za > zLo) zs.add(za);
    for (const off of [a, b]) { // where top + off crosses the clip line
      const t = (clip - off - ya) / (yb - ya);
      if (t > 0 && t < 1) { const z = za + (zb - za) * t; if (z < zHi && z > zLo) zs.add(z); }
    }
  }
  const sorted = [...zs].sort((p, q) => q - p);
  const keep = sorted.filter((z) => prof.top(z) + a > clip - 1e-6);
  if (keep.length < 2 || keep[0] - keep[keep.length - 1] < 1e-3) return null;
  const upper: Vec2[] = keep.map((z) => [z, prof.top(z) + a]);
  const lower: Vec2[] = keep.map((z) => [z, Math.max(prof.top(z) + b, clip)]);
  const poly: Vec2[] = [...upper, ...lower.reverse()];
  // Drop consecutive duplicates (the pinch at each end where upper meets the clip).
  return poly.filter((p, i) => { const q = poly[(i + poly.length - 1) % poly.length]; return Math.hypot(p[0] - q[0], p[1] - q[1]) > 1e-4; });
}

/** Split [zLo, zHi] around the cut intervals. */
function spans(zHi: number, zLo: number, cuts: [number, number][]): [number, number][] {
  let out: [number, number][] = [[zHi, zLo]];
  for (const [c0, c1] of cuts) {
    const lo = Math.min(c0, c1), hi = Math.max(c0, c1);
    out = out.flatMap(([h, l]): [number, number][] => (hi <= l || lo >= h ? [[h, l]] : [...(h > hi ? [[h, hi] as [number, number]] : []), ...(lo > l ? [[lo, l] as [number, number]] : [])]));
  }
  return out;
}

const rect = (proud: number, y0: number, y1: number): Vec2[] => [[0, y0], [proud, y0], [proud, y1], [0, y1]];

/**
 * Eave cornice along one wall (front dir = +1, rear dir = −1) from x = xa to xb (xa < xb). `gableA` / `gableB` mark
 * ends at a gable corner, where corona and cap return along the gable wall; other ends stop square (beside the dormer).
 * `wall` is the x range over which the wall below stops at the frieze top and needs the hidden fill above it.
 */
export function addEave(b: GeometryBatch, m: Materials, s: CorniceSpec, dir: 1 | -1, xa: number, xb: number, gableA: boolean, gableB: boolean, wall: [number, number] = [xa, xb]): void {
  const { prof, wallT } = s;
  const wallZ = dir === 1 ? s.zF : s.zR, inner = wallZ - dir * wallT;
  const y0 = s.bedTop, y1 = y0 + CORNICE.corona.h, y2 = y1 + CORNICE.cap.h;
  const under = (z: number) => Math.max(prof.under(z), y2); // the skin underside never drops below the cap top (addSlab clamps it)

  // Corona and cap, mitred round the gable corners. The cap is a thin moulding: its lines fade unless it is large on screen.
  const parts: [number, number, { proud: number; ret: number }, number | undefined][] = [[y0, y1, CORNICE.corona, undefined], [y1, y2, CORNICE.cap, 2.4]];
  for (const [lo, hi, part, sizeIn] of parts) {
    const pts: Vec2[] = [];
    if (gableA) pts.push([xa, wallZ - dir * part.ret]);
    pts.push([xa, wallZ], [xb, wallZ]);
    if (gableB) pts.push([xb, wallZ - dir * part.ret]);
    const geo = sweepProfile(dir === 1 ? pts : pts.reverse(), rect(part.proud, lo, hi));
    b.add(geo, m.trim, undefined, sizeIn ? { sizeIn } : undefined);
    geo.dispose();
  }

  // Hidden construction: over the wall top up to the roof, and the wedge between the cap and the roof in the overhang.
  if (wall[1] - wall[0] > 0.01) {
    b.add(extrudeAlongX([[inner, s.wallTop], [wallZ, s.wallTop], [wallZ, under(wallZ)], [inner, under(inner)]], wall[0], wall[1]), m.trim, undefined, { lines: 'none' });
  }
  const zt = wallZ + dir * CORNICE.cap.proud;
  const wedge: Vec2[] = [[wallZ, y2], [zt, y2], [zt, under(zt)], [wallZ, under(wallZ)]];
  // An end that stops square shows the wedge's end face (the cut end of the eave), so it keeps its outline there.
  b.add(extrudeAlongX(wedge, xa, xb), m.trim, undefined, { lines: gableA && gableB ? 'none' : 'outline', sizeIn: 6 });
}

/** Rake trim on one gable (side −1 left / +1 right): fascia, hidden body with the soffit, and frieze. */
export function addRake(b: GeometryBatch, m: Materials, s: CorniceSpec, side: -1 | 1): void {
  const { prof } = s;
  const p = prof.path, ztF = p[0][0], ztR = p[p.length - 1][0];
  const t = prof.thickness, k = CORNICE.rake, clip = capTop(s);
  const xw = side === 1 ? s.xR : s.xL;
  const cuts = side === -1 ? s.leftCuts : [];
  const inner = CORNICE.corona.proud - k.fasciaT; // fascia back face, from the wall
  const xr = (a: number, w: number): [number, number] => (side === 1 ? [xw + a, xw + a + w] : [xw - a - w, xw - a]);

  const emit = (zHi: number, zLo: number, a: number, bb: number, x: [number, number], opts?: { lines: 'none' }) => {
    for (const [h, l] of spans(zHi, zLo, cuts)) {
      const poly = rakeBand(prof, h, l, a, bb, clip);
      if (poly) b.add(extrudeAlongX(poly, x[0], x[1]), m.trim, undefined, opts);
    }
  };
  // Fascia: the corona carried up the rake, set back under the roof edge; dies onto the return cap.
  emit(ztF, ztR, -t, -k.fasciaDrop, xr(inner, k.fasciaT));
  // Body behind the fascia; its underside is the rake soffit, flush with the fascia's lower edge.
  emit(ztF, ztR, -t, -k.fasciaDrop, xr(0, inner), { lines: 'none' });
  // Rake frieze on the gable wall under the soffit.
  emit(s.zF, s.zR, -k.fasciaDrop, -k.friezeDrop, xr(0, k.friezeProud));
}

/**
 * Rake board for the shed dormer (side −1 left / +1 right of the dormer): one solid board against the cheek wall under
 * the roof edge, from the dormer eave up the slope until it dies into the main roof (`floor` = main roof top surface).
 */
export function addDormerRake(b: GeometryBatch, m: Materials, prof: RoofProfile, floor: (z: number) => number, xCheek: number, side: -1 | 1, proud: number, drop: number, zLo: number, zHi: number): void {
  const up = (z: number) => prof.top(z) - prof.thickness, lo = (z: number) => prof.top(z) - drop;
  // Both boundaries and the floor are straight over this range: bisect for where each meets the main roof.
  const meet = (f: (z: number) => number): number => {
    let a = zLo, c = zHi;
    if (f(c) > floor(c)) return c;
    for (let i = 0; i < 40; i++) { const mid = (a + c) / 2; if (f(mid) > floor(mid)) a = mid; else c = mid; }
    return a;
  };
  const zUp = meet(up), zBot = meet(lo);
  if (zUp - zLo < 0.01) return;
  const poly: Vec2[] = [[zLo, lo(zLo)], [zLo, up(zLo)], [zUp, up(zUp)], [zBot, lo(zBot)]];
  b.add(extrudeAlongX(poly, ...(side === 1 ? [xCheek, xCheek + proud] as [number, number] : [xCheek - proud, xCheek] as [number, number])), m.trim);
}
