/**
 * Cornice construction for the gabled main roof, following standard New England / Greek Revival practice (the drawings
 * give the frieze, bed moulding and return lengths; the rest is conventional carpentry):
 *
 *  EAVE (front and rear): a closed box — level soffit board on top of the bed moulding, a fascia that covers the roof edge
 *  and drips below the soffit, and a stepped crown moulding capping the fascia at the roof edge.
 *
 *  BOXED CORNICE RETURN at each gable corner: the eave box (soffit, fascia, crown) turns the corner and runs back along
 *  the gable wall for the drawn return length, closed by a flat end and capped by a small metal-roofed pent.
 *
 *  RAKE (gable edges): a rake fascia covering the slab edge with the same stepped crown, a sloped soffit under the
 *  overhang and a rake frieze board on the gable wall. Rake fascia and crown die onto the top of the eave crown at the
 *  corner, the rake soffit and frieze onto the return cap — the classic return detail.
 *
 * All values are inches, house coordinates (plan [x, z], z = 0 front wall face, house toward −z).
 */
import type { Vec2 } from '../data/schema';
import type { Materials } from '../materials';
import { GeometryBatch, extrudeAlongX, extrudeAlongZ } from './geometry';
import type { RoofProfile } from './roofProfile';

/** Fascia board thickness. */
export const FASCIA_T = 1.0;
/** Fascia drip below the soffit board's underside. */
const DRIP = 0.75;
/** Soffit board thickness. */
export const SOFFIT_T = 0.75;
/** Crown moulding as stepped bands [dy0, dy1, proud] relative to the roof edge (slab top at the eave tip). */
export const CROWN: [number, number, number][] = [
  [-3.4, -2.3, 0.8],
  [-2.3, -1.0, 1.7],
  [-1.0, 0.35, 2.7],
];
const CROWN_TOP = CROWN[CROWN.length - 1][1];
const CROWN_PROUD = Math.max(...CROWN.map((c) => c[2]));
/** Rake frieze board on the gable wall below the rake soffit. */
const RAKE_FRIEZE = { height: 7.0, proud: 1.0 };
/** Return pent cap: thickness and overhang past the crown. */
const CAP = { t: 0.5, over: 0.25 };

export interface CorniceSpec {
  prof: RoofProfile;
  /** Underside of the eave soffit board (= top of the bed moulding). */
  soffitY: number;
  /** Top of the wall / frieze, where the eave fill starts. */
  wallTop: number;
  wallT: number;
  /** Main block wall faces. */
  xL: number; xR: number; zF: number; zR: number;
  /** Slab ends (rake edges). */
  x0: number; x1: number;
  /** Length of the cornice return along the gable wall, from the corner. */
  returnLen: number;
  /** z ranges where the rake trim on the LEFT gable is interrupted (a chimney rising through the rake). */
  leftCuts: [number, number][];
}

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

/** Slab-top height at the eave tips (the profile is symmetric). */
function eaveEdge(prof: RoofProfile): { ztF: number; ztR: number; T: number } {
  const p = prof.path;
  return { ztF: p[0][0], ztR: p[p.length - 1][0], T: p[0][1] };
}

/**
 * Eave box along one wall (front dir = +1, rear dir = −1) over the slab span [xa, xb]. `gableA` / `gableB` mark span ends
 * that are gable corners (fascia and crown wrap, a cornice return is added); other ends stop square (dormer cheeks).
 */
export function addEaveBox(b: GeometryBatch, m: Materials, s: CorniceSpec, dir: 1 | -1, xa: number, xb: number, gableA: boolean, gableB: boolean): void {
  const { prof, soffitY: SY, wallT } = s;
  const { ztF, ztR, T } = eaveEdge(prof);
  const wallZ = dir === 1 ? s.zF : s.zR, zt = dir === 1 ? ztF : ztR, inner = wallZ - dir * wallT;
  const sTop = SY + SOFFIT_T;
  const under = (z: number) => Math.max(prof.under(z), sTop); // the slab underside is clamped to the soffit top (addSlab)

  // Solid behind the trim: over the wall top (wall x-range only) and in the overhang above the soffit (full span), up to
  // the slab underside. Hidden construction: no lines of its own.
  const wx0 = Math.max(xa, s.xL), wx1 = Math.min(xb, s.xR);
  b.add(extrudeAlongX([[inner, s.wallTop], [wallZ, s.wallTop], [wallZ, under(wallZ)], [inner, under(inner)]], wx0, wx1), m.trim, undefined, { lines: 'none' });
  const uW = prof.under(wallZ), uT = prof.under(zt);
  const fill: Vec2[] = uT < sTop
    ? [[wallZ, sTop], [wallZ + (zt - wallZ) * (uW - sTop) / (uW - uT), sTop], [wallZ, uW]]
    : [[wallZ, sTop], [zt, sTop], [zt, uT], [wallZ, uW]];
  b.add(extrudeAlongX(dir === 1 ? fill : [...fill].reverse(), xa, xb), m.trim, undefined, { lines: 'none' });

  // Soffit board, fascia, crown.
  const zs0 = Math.min(wallZ, zt), zs1 = Math.max(wallZ, zt);
  b.box(m.trim, [xb - xa, SOFFIT_T, zs1 - zs0], [(xa + xb) / 2, SY + SOFFIT_T / 2, (zs0 + zs1) / 2]);
  const ea = gableA ? FASCIA_T : 0, eb = gableB ? FASCIA_T : 0;
  const fy0 = SY - DRIP;
  b.box(m.trim, [xb - xa + ea + eb, T - fy0, FASCIA_T], [(xa - ea + xb + eb) / 2, (fy0 + T) / 2, zt + dir * FASCIA_T / 2]);
  for (const [dy0, dy1, p] of CROWN) {
    const ca = gableA ? FASCIA_T + p : 0, cb = gableB ? FASCIA_T + p : 0;
    b.box(m.trim, [xb - xa + ca + cb, dy1 - dy0, p], [(xa - ca + xb + cb) / 2, T + (dy0 + dy1) / 2, zt + dir * (FASCIA_T + p / 2)]);
  }
  if (gableA) addReturn(b, m, s, dir, -1);
  if (gableB) addReturn(b, m, s, dir, 1);
}

/** Top of the return pent cap at the wall: kept just under the rake soffit. */
function returnCapTop(s: CorniceSpec, wallZ: number): { outer: number; wall: number } {
  const { T } = eaveEdge(s.prof);
  const outer = T + CROWN_TOP + CAP.t;
  return { outer, wall: Math.max(outer, Math.min(outer + 2, s.prof.under(wallZ) - SOFFIT_T - 0.3)) };
}

/** Boxed cornice return at the gable corner on side `side` (−1 left, +1 right) of the eave on `dir`. */
function addReturn(b: GeometryBatch, m: Materials, s: CorniceSpec, dir: 1 | -1, side: -1 | 1): void {
  const { soffitY: SY } = s;
  const { ztF, ztR, T } = eaveEdge(s.prof);
  const wallZ = dir === 1 ? s.zF : s.zR, zt = dir === 1 ? ztF : ztR;
  const xw = side === 1 ? s.xR : s.xL, xo = side === 1 ? s.x1 : s.x0;
  const zEnd = wallZ - dir * s.returnLen;
  const zMin = (p: number, q: number) => Math.min(p, q), zMax = (p: number, q: number) => Math.max(p, q);
  const sTop = SY + SOFFIT_T;

  // Soffit under the return (the eave soffit already covers the corner square out to the tip).
  const xs0 = Math.min(xw, xo), xs1 = Math.max(xw, xo);
  b.box(m.trim, [xs1 - xs0, SOFFIT_T, s.returnLen], [(xs0 + xs1) / 2, SY + SOFFIT_T / 2, (wallZ + zEnd) / 2]);
  // Fascia along the gable side, from the return end to the eave fascia.
  const fy0 = SY - DRIP;
  const fz0 = zMin(zEnd, zt), fz1 = zMax(zEnd, zt);
  b.box(m.trim, [FASCIA_T, T - fy0, fz1 - fz0], [xo + side * FASCIA_T / 2, (fy0 + T) / 2, (fz0 + fz1) / 2]);
  // Crown along the gable side, up to the eave crown (which wraps the corner square).
  const cz1 = zt + dir * FASCIA_T;
  for (const [dy0, dy1, p] of CROWN) {
    const z0 = zMin(zEnd, cz1), z1 = zMax(zEnd, cz1);
    b.box(m.trim, [p, dy1 - dy0, z1 - z0], [xo + side * (FASCIA_T + p / 2), T + (dy0 + dy1) / 2, (z0 + z1) / 2]);
  }
  // Pent cap over the return (roof metal), sloping from the wall down to just past the crown, and the solid under it.
  const cap = returnCapTop(s, wallZ);
  const xc = xo + side * (FASCIA_T + CROWN_PROUD + CAP.over);
  const capPoly: Vec2[] = [[xw, cap.wall], [xc, cap.outer], [xc, cap.outer - CAP.t], [xw, cap.wall - CAP.t]];
  const zz0 = zMin(zEnd - dir * CAP.over, wallZ), zz1 = zMax(zEnd - dir * CAP.over, wallZ);
  const ccw = (poly: Vec2[]): Vec2[] => (side === 1 ? poly : [...poly].reverse());
  b.add(extrudeAlongZ(ccw(capPoly), zz0, zz1), m.roof);
  const capUnder = (x: number) => cap.wall - CAP.t + ((cap.outer - cap.wall) * (x - xw)) / (xc - xw);
  const core: Vec2[] = [[xw, sTop], [xo, sTop], [xo, capUnder(xo)], [xw, capUnder(xw)]];
  b.add(extrudeAlongZ(ccw(core), zMin(zEnd, wallZ), zMax(zEnd, wallZ)), m.trim);
}

/** Rake trim on one gable (side −1 left / +1 right): fascia, crown, soffit and frieze. */
export function addRake(b: GeometryBatch, m: Materials, s: CorniceSpec, side: -1 | 1): void {
  const { prof } = s;
  const { ztF, ztR, T } = eaveEdge(prof);
  const t = prof.thickness;
  const xw = side === 1 ? s.xR : s.xL, xo = side === 1 ? s.x1 : s.x0;
  const cuts = side === -1 ? s.leftCuts : [];
  const crownTop = T + CROWN_TOP;
  const capTop = Math.max(returnCapTop(s, s.zF).wall, returnCapTop(s, s.zR).wall);
  const reach = FASCIA_T + CROWN_PROUD;
  const xr = (a: number, w: number): [number, number] => (side === 1 ? [a, a + w] : [a - w, a]);

  const emit = (zHi: number, zLo: number, a: number, bb: number, clip: number, xa: number, xb: number) => {
    for (const [h, l] of spans(zHi, zLo, cuts)) {
      const poly = rakeBand(prof, h, l, a, bb, clip);
      if (poly) b.add(extrudeAlongX(poly, xa, xb), m.trim);
    }
  };
  // Fascia: covers the slab edge, drips below the rake soffit; sits on the eave crown at both ends.
  emit(ztF + reach, ztR - reach, 0, -(t + SOFFIT_T + DRIP), crownTop, ...xr(xo, FASCIA_T));
  for (const [dy0, dy1, p] of CROWN) emit(ztF + reach, ztR - reach, dy1, dy0, crownTop, ...xr(xo + side * FASCIA_T, p));
  // Sloped soffit under the overhang, wall to fascia; dies onto the return caps.
  emit(s.zF, s.zR, -t, -(t + SOFFIT_T), capTop, ...(side === 1 ? [xw, xo] as [number, number] : [xo, xw] as [number, number]));
  // Rake frieze on the gable wall under the soffit.
  emit(s.zF, s.zR, -(t + SOFFIT_T), -(t + SOFFIT_T + RAKE_FRIEZE.height), capTop, ...xr(xw, RAKE_FRIEZE.proud));
}

/** Crown bands on the outer face of a straight fascia (dormer, wing hip), as boxes. `face`: outer face position and outward axis. */
export function addCrownBands(b: GeometryBatch, m: Materials, edgeTop: number, along: 'x' | 'z', a0: number, a1: number, face: number, out: 1 | -1, wrap: [boolean, boolean] = [false, false]): void {
  for (const [dy0, dy1, p] of CROWN) {
    const lo = a0 - (wrap[0] ? p : 0), hi = a1 + (wrap[1] ? p : 0);
    const c = face + out * p / 2, y = edgeTop + (dy0 + dy1) / 2, h = dy1 - dy0;
    if (along === 'x') b.box(m.trim, [hi - lo, h, p], [(lo + hi) / 2, y, c]);
    else b.box(m.trim, [p, h, hi - lo], [c, y, (lo + hi) / 2]);
  }
}

/**
 * Rake fascia + crown only (the shed dormer's sides, whose cheek walls take the place of a soffit and frieze). The fascia
 * covers the slab edge and drops `drop` below the underside; both die onto `clip` (the dormer crown top) at the eave.
 */
export function addPlainRake(b: GeometryBatch, m: Materials, prof: RoofProfile, xo: number, side: -1 | 1, zHi: number, zLo: number, zEave: number, drop: number, clip: number): void {
  const xr = (a: number, w: number): [number, number] => (side === 1 ? [a, a + w] : [a - w, a]);
  // The fascia runs down to the eave fascia's back face (no clip: on a shallow shed slope a clipped fascia would bare the slab edge).
  const fas = rakeBand(prof, zHi, zEave, 0, -(prof.thickness + drop), -Infinity);
  if (fas) b.add(extrudeAlongX(fas, ...xr(xo, FASCIA_T)), m.trim);
  for (const [dy0, dy1, p] of CROWN) {
    const poly = rakeBand(prof, zHi, zLo, dy1, dy0, clip);
    if (poly) b.add(extrudeAlongX(poly, ...xr(xo + side * FASCIA_T, p)), m.trim);
  }
}
