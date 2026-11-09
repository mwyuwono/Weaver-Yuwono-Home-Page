/**
 * Drawing-line extraction and classification.
 *
 * A model built from overlapping boxes has many box edges that are not drawing
 * lines: joints between wall pieces, infill flush with a wall face, the seam
 * where one level's wall meets the next. An edge is a drawing line only where
 * the surface really turns. So for every crease edge of a piece we look across
 * it, in the plane of each adjacent face: if another piece continues that face
 * flush (coplanar, same facing), the edge is a joint, not a line.
 *
 *  - covered by a piece of the same group → dropped;
 *  - covered only by another group (levels meet when assembled) → kept as a
 *    "join" line that is hidden while assembled and fades in as floors separate;
 *  - otherwise → drawn.
 *
 * All coordinates here are INCHES, world (assembled) positions.
 */
import type { LineTierName } from './lines';

export interface FaceSide {
  /** Face normal (unit). */
  n: [number, number, number];
  /** In-plane unit direction pointing from the face across the edge (away from the face interior). */
  out: [number, number, number];
}

export interface Candidate {
  a: [number, number, number];
  b: [number, number, number];
  faces: FaceSide[];
  sizeIn: number;
  tier: LineTierName;
}

/** Candidate/triangle collection switch: off when baked line data is used (see render/bakedLines), so builders skip the extraction cost. */
export const lineExtraction = { enabled: true };

export interface LineData {
  candidates: Candidate[];
  /** Every triangle of the group (flat xyz × 3 per triangle), including pieces that draw no lines. */
  tris: number[];
}

type V = [number, number, number];
const sub = (a: V, b: V): V => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot = (a: V, b: V): number => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a: V, b: V): V => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const len = (a: V): number => Math.hypot(a[0], a[1], a[2]);
const scale = (a: V, s: number): V => [a[0] * s, a[1] * s, a[2] * s];
const norm = (a: V): V => { const l = len(a); return l > 0 ? scale(a, 1 / l) : [0, 0, 0]; };

/**
 * Crease and boundary edges of one piece (non-indexed triangle positions, inches) with their adjacent faces.
 * `thresholdDeg`: minimum angle between face normals for a crease.
 */
export function extractCandidates(pos: ArrayLike<number>, thresholdDeg: number, sizeIn: number, tier: LineTierName, out: Candidate[]): void {
  const q = (v: number): number => Math.round(v * 1000);
  const key = (p: V): string => `${q(p[0])},${q(p[1])},${q(p[2])}`;
  const edges = new Map<string, { a: V; b: V; sides: { n: V; c: V }[] }>();
  const cosT = Math.cos((thresholdDeg * Math.PI) / 180);
  for (let t = 0; t + 8 < pos.length; t += 9) {
    const p: V[] = [0, 1, 2].map((k) => [pos[t + 3 * k], pos[t + 3 * k + 1], pos[t + 3 * k + 2]] as V);
    const n = cross(sub(p[1], p[0]), sub(p[2], p[0]));
    if (len(n) < 1e-9) continue;
    const nn = norm(n);
    for (let k = 0; k < 3; k++) {
      const a = p[k], b = p[(k + 1) % 3], c = p[(k + 2) % 3];
      const ka = key(a), kb = key(b);
      const k2 = ka < kb ? `${ka}|${kb}` : `${kb}|${ka}`;
      let e = edges.get(k2);
      if (!e) { e = { a, b, sides: [] }; edges.set(k2, e); }
      e.sides.push({ n: nn, c });
    }
  }
  for (const e of edges.values()) {
    const s = e.sides;
    let crease = s.length === 1;
    for (let i = 0; i < s.length && !crease; i++) for (let j = i + 1; j < s.length; j++) if (dot(s[i].n, s[j].n) < cosT) { crease = true; break; }
    if (!crease) continue;
    const d = norm(sub(e.b, e.a));
    const mid = scale([e.a[0] + e.b[0], e.a[1] + e.b[1], e.a[2] + e.b[2]], 0.5);
    const faces: FaceSide[] = s.map(({ n, c }) => {
      const v = sub(mid, c);
      return { n, out: norm(sub(v, scale(d, dot(v, d)))) };
    });
    // A tiny edge (the end of a cap, a step return) reads as a dot once it is a few pixels long: its own length caps
    // the feature size used for the LOD fade.
    out.push({ a: e.a, b: e.b, faces, sizeIn: Math.min(sizeIn, len(sub(e.b, e.a))), tier });
  }
}

/** Triangles bucketed by plane (quantised normal + offset) for coplanar coverage queries. */
export class PlaneIndex {
  private readonly buckets = new Map<string, number[]>();
  /** Per triangle: n(3), d, three inward edge planes (xyz + offset, unit length), bbox min(3) max(3). */
  private readonly rec: number[] = [];
  private static readonly REC = 22;
  private static readonly D_STEP = 0.5; // inches
  private readonly min: V = [Infinity, Infinity, Infinity];
  private readonly max: V = [-Infinity, -Infinity, -Infinity];

  constructor(groups: number[][]) {
    for (const tris of groups) {
      for (let t = 0; t + 8 < tris.length; t += 9) {
        const a: V = [tris[t], tris[t + 1], tris[t + 2]], b: V = [tris[t + 3], tris[t + 4], tris[t + 5]], c: V = [tris[t + 6], tris[t + 7], tris[t + 8]];
        const n = cross(sub(b, a), sub(c, a));
        if (len(n) < 1e-9) continue;
        const nn = norm(n);
        const id = this.rec.length / PlaneIndex.REC;
        const r = this.rec;
        r.push(nn[0], nn[1], nn[2], dot(nn, a));
        for (const [p, q] of [[a, b], [b, c], [c, a]] as [V, V][]) {
          const e = norm(cross(nn, sub(q, p))); // points into the triangle
          r.push(e[0], e[1], e[2], dot(e, p));
        }
        for (let k = 0; k < 3; k++) r.push(Math.min(a[k], b[k], c[k]));
        for (let k = 0; k < 3; k++) r.push(Math.max(a[k], b[k], c[k]));
        for (let k = 0; k < 3; k++) { this.min[k] = Math.min(this.min[k], a[k], b[k], c[k]); this.max[k] = Math.max(this.max[k], a[k], b[k], c[k]); }
        const k = this.key(nn, dot(nn, a));
        const list = this.buckets.get(k) ?? [];
        list.push(id);
        this.buckets.set(k, list);
      }
    }
  }

  private key(n: V, d: number, dOff = 0): string {
    const r = (v: number): number => Math.round(v * 50) / 50 + 0; // +0 folds −0
    return `${r(n[0])},${r(n[1])},${r(n[2])}|${Math.round(d / PlaneIndex.D_STEP) + dOff}`;
  }

  /** Is point p covered by a triangle facing `n`, lying in the plane through p? */
  covers(p: V, n: V): boolean {
    const [px, py, pz] = p;
    if (px < this.min[0] - 0.1 || px > this.max[0] + 0.1 || py < this.min[1] - 0.1 || py > this.max[1] + 0.1 || pz < this.min[2] - 0.1 || pz > this.max[2] + 0.1) return false;
    const d = n[0] * px + n[1] * py + n[2] * pz;
    const r = this.rec;
    const T = 0.06, E = 1e-4;
    for (const off of [-1, 0, 1]) {
      const list = this.buckets.get(this.key(n, d, off));
      if (!list) continue;
      for (const id of list) {
        const o = id * PlaneIndex.REC;
        if (px < r[o + 16] - T || px > r[o + 19] + T || py < r[o + 17] - T || py > r[o + 20] + T || pz < r[o + 18] - T || pz > r[o + 21] + T) continue;
        if (r[o] * n[0] + r[o + 1] * n[1] + r[o + 2] * n[2] < 0.9995) continue;
        if (Math.abs(r[o] * px + r[o + 1] * py + r[o + 2] * pz - r[o + 3]) > T) continue;
        if (r[o + 4] * px + r[o + 5] * py + r[o + 6] * pz - r[o + 7] < -E) continue;
        if (r[o + 8] * px + r[o + 9] * py + r[o + 10] * pz - r[o + 11] < -E) continue;
        if (r[o + 12] * px + r[o + 13] * py + r[o + 14] * pz - r[o + 15] < -E) continue;
        return true;
      }
    }
    return false;
  }
}

/** Step across the edge used for the coverage probe, inches. */
const PROBE = 0.25;

/** Is the edge point at parameter t a joint against `index` (some face continued flush across it)? */
function coveredAt(c: Candidate, index: PlaneIndex, t: number): boolean {
  const p: V = [c.a[0] + (c.b[0] - c.a[0]) * t, c.a[1] + (c.b[1] - c.a[1]) * t, c.a[2] + (c.b[2] - c.a[2]) * t];
  // (a) a face continues flush across the edge → joint;
  for (const f of c.faces) if (index.covers([p[0] + f.out[0] * PROBE, p[1] + f.out[1] * PROBE, p[2] + f.out[2] * PROBE], f.n)) return true;
  // (b) every face beside the edge is buried against a coincident, opposite-facing face (a jamb against its infill, a
  //     box end against the next box) → the edge is inside the solid.
  return c.faces.every((f) => index.covers([p[0] - f.out[0] * PROBE, p[1] - f.out[1] * PROBE, p[2] - f.out[2] * PROBE], [-f.n[0], -f.n[1], -f.n[2]]));
}

/** 0 = joint within its own group (drop), 1 = join with another group (shown when floors separate), 2 = drawing line. */
export type EdgeState = 0 | 1 | 2;

/**
 * Split an edge into runs by state. An edge can be a joint along part of its length only (a window jamb is a real
 * reveal beside the glass but a joint against the sill and header infill), so it is sampled about every inch.
 * Returns [t0, t1, state] runs; adjacent equal states are merged.
 */
export function classifyEdge(c: Candidate, own: PlaneIndex, others: PlaneIndex[]): [number, number, EdgeState][] {
  const state = (t: number): EdgeState => (coveredAt(c, own, t) ? 0 : others.some((o) => coveredAt(c, o, t)) ? 1 : 2);
  const length = Math.hypot(c.b[0] - c.a[0], c.b[1] - c.a[1], c.b[2] - c.a[2]);
  // Quick path: probes about every 12" agree → one run (a partial joint shorter than that between two probes is missed;
  // the model has none that matter).
  const nq = Math.max(5, Math.min(17, Math.ceil(length / 12) + 1));
  const quick = Array.from({ length: nq }, (_, i) => state(0.02 + (0.96 * i) / (nq - 1)));
  if (quick.every((s) => s === quick[0])) return [[0, 1, quick[0]]];
  const n = Math.max(5, Math.min(160, Math.ceil(length)));
  const samples: EdgeState[] = [];
  for (let i = 0; i < n; i++) samples.push(state((i + 0.5) / n));
  const runs: [number, number, EdgeState][] = [];
  let start = 0;
  for (let i = 1; i <= n; i++) {
    if (i === n || samples[i] !== samples[start]) {
      runs.push([start === 0 ? 0 : start / n, i === n ? 1 : i / n, samples[start]]);
      start = i;
    }
  }
  // Sampling noise at the ends of a covered stretch leaves slivers that would read as dots: a drawn run shorter than
  // 2" on a longer edge is not a drawing line.
  return runs.filter(([t0, t1, st]) => st === 0 || (t1 - t0) * length >= 2 || length < 3);
}
