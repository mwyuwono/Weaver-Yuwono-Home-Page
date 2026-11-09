/**
 * PorchBuilder — the rear porch outside back door F (deck, stair, post with capital, baluster rails, lattice skirt),
 * which sits under the wing hip roof, and the fenced storage behind the wing. Dimensions are measured from the
 * rear/side elevations (data.site.porch / data.site.fence).
 */
import * as THREE from 'three';
import type { HouseData, Site, Vec2 } from '../data/schema';
import type { Materials } from '../materials';
import { GeometryBatch } from './geometry';

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

/** Open lattice panel on the plane through a→c (plan), from y0 to y1: frame plus crossing slats. */
function lattice(b: GeometryBatch, m: Materials, a: Vec2, c: Vec2, y0: number, y1: number): void {
  const len = Math.hypot(c[0] - a[0], c[1] - a[1]);
  const yaw = Math.atan2(-(c[1] - a[1]), c[0] - a[0]);
  const mid: [number, number] = [(a[0] + c[0]) / 2, (a[1] + c[1]) / 2];
  const h = y1 - y0, yc = (y0 + y1) / 2;
  b.box(m.railing, [len, 1.5, 1.5], [mid[0], y0 + 0.75, mid[1]], [0, yaw, 0]);
  b.box(m.railing, [len, 1.5, 1.5], [mid[0], y1 - 0.75, mid[1]], [0, yaw, 0]);
  for (let s = 3; s < len; s += 4) {
    const x = a[0] + (c[0] - a[0]) * (s / len), z = a[1] + (c[1] - a[1]) * (s / len);
    b.box(m.railing, [0.6, h, 0.6], [x, yc, z]);
  }
  for (let s = 3; s < h; s += 4) b.box(m.railing, [len, 0.6, 0.5], [mid[0], y0 + s, mid[1]], [0, yaw, 0]);
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

  // Platform rails on the far edge and the stair-side return; lattice skirt below them.
  levelRail(b, m, p, [d.x0, d.z0 + 1.75], [d.x1, d.z0 + 1.75], d.topY);
  levelRail(b, m, p, [d.x0 + 1.75, d.z0], [d.x0 + 1.75, st.z0], d.topY);
  lattice(b, m, [d.x0, d.z0 + 0.75], [d.x1, d.z0 + 0.75], p.lattice.y0, p.lattice.y1);
  lattice(b, m, [d.x0 + 0.75, d.z0], [d.x0 + 0.75, st.z0], p.lattice.y0, p.lattice.y1);

  // Post carrying the hip roof corner: base block, shaft, two-step capital.
  const shaft = po.shaftY1 - po.shaftY0;
  b.box(m.railing, [po.width + 2, po.shaftY0 - d.topY, po.width + 2], [po.x, (d.topY + po.shaftY0) / 2, po.z]);
  b.box(m.railing, [po.width, shaft, po.width], [po.x, (po.shaftY0 + po.shaftY1) / 2, po.z]);
  b.box(m.railing, [po.width + 1.5, 1.8, po.width + 1.5], [po.x, po.shaftY1 + 0.9, po.z]);
  b.box(m.railing, [po.capWidth, po.capY1 - po.shaftY1 - 1.8, po.capWidth], [po.x, (po.shaftY1 + 1.8 + po.capY1) / 2, po.z]);
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
  }
}
