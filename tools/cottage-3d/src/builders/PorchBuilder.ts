/**
 * PorchBuilder — the rear porch outside back door F (deck, stair, post with capital, baluster rails, lattice skirt),
 * which sits under the wing hip roof, and the fenced storage behind the wing. Dimensions are measured from the
 * rear/side elevations (data.site.porch / data.site.fence).
 */
import * as THREE from 'three';
import type { HouseData, Site, Vec2 } from '../data/schema';
import type { Materials } from '../materials';
import { GeometryBatch } from './geometry';
import { Grade } from './TerrainBuilder';

type Porch = NonNullable<Site['porch']>;

/** Rail with balusters along a level run a→c (plan) at deck height `y`. */
function levelRail(b: GeometryBatch, m: Materials, p: Porch, a: Vec2, c: Vec2, y: number): void {
  const r = p.rail, len = Math.hypot(c[0] - a[0], c[1] - a[1]);
  const yaw = Math.atan2(-(c[1] - a[1]), c[0] - a[0]);
  const mid: [number, number] = [(a[0] + c[0]) / 2, (a[1] + c[1]) / 2];
  b.box(m.railing, [len, 2.4, 3.5], [mid[0], y + r.topY - 1.2, mid[1]], [0, yaw, 0]); // top rail
  b.box(m.railing, [len, 2, 2], [mid[0], y + r.balusterY0 - 1, mid[1]], [0, yaw, 0]); // bottom rail
  const n = Math.max(2, Math.floor(len / 4.5));
  for (let k = 1; k < n; k++) {
    const x = a[0] + ((c[0] - a[0]) * k) / n, z = a[1] + ((c[1] - a[1]) * k) / n;
    b.box(m.railing, [1.25, r.balusterY1 - r.balusterY0, 1.25], [x, y + (r.balusterY0 + r.balusterY1) / 2, z]);
  }
}

/**
 * Open lattice panel on the plane through a→c (plan), from y0 to y1: frame plus crossing slats.
 * Geometry is unchanged; the slats draw as hairline linework so they fade out
 * (instead of moiréing) as the panel gets small on screen.
 */
function lattice(b: GeometryBatch, m: Materials, a: Vec2, c: Vec2, y0: number, y1: number): void {
  const len = Math.hypot(c[0] - a[0], c[1] - a[1]);
  const yaw = Math.atan2(-(c[1] - a[1]), c[0] - a[0]);
  const mid: [number, number] = [(a[0] + c[0]) / 2, (a[1] + c[1]) / 2];
  const h = y1 - y0, yc = (y0 + y1) / 2;
  const hairline = { tier: 'hairline' as const };
  b.box(m.railing, [len, 1.5, 1.5], [mid[0], y0 + 0.75, mid[1]], [0, yaw, 0], hairline);
  b.box(m.railing, [len, 1.5, 1.5], [mid[0], y1 - 0.75, mid[1]], [0, yaw, 0], hairline);
  for (let s = 3; s < len; s += 4) {
    const x = a[0] + (c[0] - a[0]) * (s / len), z = a[1] + (c[1] - a[1]) * (s / len);
    b.box(m.railing, [0.6, h, 0.6], [x, yc, z], [0, 0, 0], hairline);
  }
  for (let s = 3; s < h; s += 4) b.box(m.railing, [len, 0.6, 0.5], [mid[0], y0 + s, mid[1]], [0, yaw, 0], hairline);
}

/** Deck, stair, post, rails and lattice. Lives with the first floor. */
export function buildPorch(data: HouseData, m: Materials): THREE.Group | null {
  const p = data.site.porch;
  if (!p) return null;
  const b = new GeometryBatch();
  const d = p.deck, st = p.stair, po = p.post;

  b.box(m.wood, [d.x1 - d.x0, d.topY - d.bottomY, d.z1 - d.z0], [(d.x0 + d.x1) / 2, (d.topY + d.bottomY) / 2, (d.z0 + d.z1) / 2]);

  // Stair: treads nested like the front steps, running toward −x from the platform's left edge.
  const run = st.x1 - st.x0, tread = run / st.risers, rise = (d.topY - st.bottomY) / st.risers;
  for (let i = 1; i < st.risers; i++) {
    const w = i * tread;
    b.box(m.wood, [w, d.topY - rise * i - st.bottomY, st.z1 - st.z0], [st.x1 - w / 2, st.bottomY + (d.topY - rise * i - st.bottomY) / 2, (st.z0 + st.z1) / 2]);
  }
  // Stair rail on its open (far) side: sloped top/bottom rails and balusters on each tread.
  const ang = Math.atan2(rise, tread), r = p.rail, zr = st.z0 + 1.75;
  const rl = Math.hypot(run - tread, rise * (st.risers - 1));
  const sx = st.x1 - (run - tread) / 2, sy = d.topY - (rise * (st.risers - 1)) / 2;
  b.box(m.railing, [rl, 2.4, 3.5], [sx, sy + r.topY - 1.2, zr], [0, 0, ang]);
  b.box(m.railing, [rl, 2, 2], [sx, sy + r.balusterY0 - 1, zr], [0, 0, ang]);
  for (let i = 0; i < st.risers - 1; i++) {
    const x = st.x1 - tread * (i + 0.5), yt = d.topY - rise * (i + 1);
    b.box(m.railing, [1.25, r.balusterY1 - r.balusterY0, 1.25], [x, yt + (r.balusterY0 + r.balusterY1) / 2, zr]);
  }

  // Platform rails run post-to-post: the far rail from the post's right face to the wing wall, the return rail from the post's
  // front face to the stair opening. Both are centred on the post axes so their ends butt against the column FACES (a rail
  // laid along the deck edge would pass through the column, wrapping its corner).
  const half = po.width / 2;
  levelRail(b, m, p, [po.x + half, po.z], [d.x1, po.z], d.topY);
  levelRail(b, m, p, [po.x, po.z + half], [po.x, st.z0], d.topY);
  // Lattice skirt under the deck, from the deck rim down to grade (lowest grade along each run, sunk 1" so no gap shows).
  const grade = new Grade(data);
  const lowest = (a: Vec2, c: Vec2): number => {
    let y = Infinity;
    for (let k = 0; k <= 12; k++) y = Math.min(y, grade.y(a[0] + ((c[0] - a[0]) * k) / 12, a[1] + ((c[1] - a[1]) * k) / 12));
    return y - 1;
  };
  const runs: [Vec2, Vec2][] = [[[d.x0, d.z0 + 0.75], [d.x1, d.z0 + 0.75]], [[d.x0 + 0.75, d.z0], [d.x0 + 0.75, st.z0]]];
  for (const [a, c] of runs) lattice(b, m, a, c, Math.min(p.lattice.y0, lowest(a, c)), p.lattice.y1);

  // Post carrying the hip roof corner: plinth, pedestal block, shaft, then the capital (astragal, neck, echinus, step, abacus)
  // whose top meets the underside of the beam (wing cornice) over the porch.
  const w = po.width;
  b.box(m.railing, [w + 2, po.shaftY0 - d.topY, w + 2], [po.x, (d.topY + po.shaftY0) / 2, po.z]);
  b.box(m.railing, [w, po.shaftY1 - po.shaftY0, w], [po.x, (po.shaftY0 + po.shaftY1) / 2, po.z]);
  for (const [y0, y1, cw] of po.capital) b.box(m.railing, [cw, y1 - y0, cw], [po.x, (y0 + y1) / 2, po.z]);
  return b.toGroup('porch');
}

/** Fenced storage behind the wing: posts with caps, three rails and X bracing per run, and a low curb. Static site. */
export function addFence(b: GeometryBatch, data: HouseData, m: Materials): void {
  const f = data.site.fence;
  if (!f) return;
  const w = f.postWidth;
  for (const [x, z] of f.posts) {
    b.box(m.railing, [w, f.capY0 - f.shaftY0, w], [x, (f.shaftY0 + f.capY0) / 2, z]);
    b.box(m.railing, [w + 1.5, f.capY1 - f.capY0, w + 1.5], [x, (f.capY0 + f.capY1) / 2, z]);
  }
  const wallZ = data.roof.main.zRear;
  const pts: Vec2[] = [[f.posts[0][0], wallZ], ...f.posts];
  const xs = pts.map((q) => q[0]), zs = pts.map((q) => q[1]);
  const centre: Vec2 = [(Math.min(...xs) + Math.max(...xs)) / 2, (Math.min(...zs) + Math.max(...zs)) / 2]; // middle of the enclosure
  for (let i = 0; i < pts.length - 1; i++) {
    const [a, c] = [pts[i], pts[i + 1]];
    const len = Math.hypot(c[0] - a[0], c[1] - a[1]) - w;
    const yaw = Math.atan2(-(c[1] - a[1]), c[0] - a[0]);
    const mid: [number, number] = [(a[0] + c[0]) / 2, (a[1] + c[1]) / 2];
    for (const [y0, y1] of f.rails) b.box(m.railing, [len, y1 - y0, 2], [mid[0], (y0 + y1) / 2, mid[1]], [0, yaw, 0]);
    // X bracing in the panel between the two lower rails
    const top = f.rails[1][0], bottom = f.rails[2][1], h = top - bottom, ang = Math.atan2(h, len - 2 * w);
    for (const sign of [-1, 1]) b.box(m.railing, [Math.hypot(len - 2 * w, h), 3, 1.5], [mid[0], (top + bottom) / 2, mid[1]], [0, yaw, sign * ang]);
    b.box(m.concrete, [len + w, f.curbY[1] - f.curbY[0], 6], [mid[0], (f.curbY[0] + f.curbY[1]) / 2, mid[1]], [0, yaw, 0]);
    addBoarding(b, m, f, a, c, i === 0, centre);
  }
}

/** Vertical board pitch and thickness, inches (nominal 1x6 boards; 0.3" shadow-gap joints so each plank reads as a plank). */
const BOARD_W = 5.5, BOARD_T = 0.8;

/**
 * Solid vertical boarding behind one fence run (a→c): the enclosure hides what is stored inside, so the boards fill the panel
 * from the curb to the top rail, tight-jointed, on the INSIDE face of the frame. The posts, rails and X bracing stay as the
 * visible frame in front of them. `fromWall` runs start flush against the house wall rather than at a post.
 */
function addBoarding(b: GeometryBatch, m: Materials, f: NonNullable<Site['fence']>, a: Vec2, c: Vec2, fromWall: boolean, centre: Vec2): void {
  const run = Math.hypot(c[0] - a[0], c[1] - a[1]);
  const u: Vec2 = [(c[0] - a[0]) / run, (c[1] - a[1]) / run];
  let n: Vec2 = [-u[1], u[0]]; // normal pointing into the enclosure
  if ((centre[0] - a[0]) * n[0] + (centre[1] - a[1]) * n[1] < 0) n = [-n[0], -n[1]];
  const rail = 2; // rail thickness: the boards sit just behind it
  const off = rail / 2 + BOARD_T / 2 + 0.05;
  const t0 = fromWall ? 0 : f.postWidth / 2, t1 = run - f.postWidth / 2;
  const count = Math.max(1, Math.round((t1 - t0) / BOARD_W)), bw = (t1 - t0) / count;
  const y0 = f.curbY[1], y1 = f.rails[0][1] - 0.3, yaw = Math.atan2(-u[1], u[0]);
  for (let k = 0; k < count; k++) {
    const t = t0 + (k + 0.5) * bw;
    b.box(m.railing, [bw - 0.3, y1 - y0, BOARD_T], [a[0] + u[0] * t + n[0] * off, (y0 + y1) / 2, a[1] + u[1] * t + n[1] * off], [0, yaw, 0], { tier: 'secondary' });
  }
}
