// Pinhole camera solver (dependency-free). Usage: node camera-solve.mjs <photo> [--k1] [--fix-f=<px>]
// Reads cameras/<photo>.points.json: { width, height, points:[{label, xyz:[x,y,z] feet, px:[u,v]}] }
// Writes cameras/<photo>.camera.json. Plan axes: x east, y north, z up (feet).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'cameras');
const name = process.argv[2];
const useK1 = process.argv.includes('--k1');
const dropArg = (process.argv.find((a) => a.startsWith('--drop=')) || '').slice(7).split(';').filter(Boolean);
const P = JSON.parse(fs.readFileSync(path.join(dir, `${name}.points.json`), 'utf8'));
const pts = P.points.filter((p) => !p.exclude && !dropArg.includes(p.label)); // exclude:true = point kept for the overlay only
const { width: Wd, height: Ht } = P;
const cx = Wd / 2, cy = Ht / 2;

// params: [x,y,z, yaw(rad, CCW from east), pitch, roll, f, k1]
function basis(yaw, pitch, roll) {
  const f = [Math.cos(pitch) * Math.cos(yaw), Math.cos(pitch) * Math.sin(yaw), Math.sin(pitch)];
  const r0 = [Math.sin(yaw), -Math.cos(yaw), 0];
  const u0 = [r0[1] * f[2] - r0[2] * f[1], r0[2] * f[0] - r0[0] * f[2], r0[0] * f[1] - r0[1] * f[0]];
  const c = Math.cos(roll), s = Math.sin(roll);
  const r = r0.map((v, i) => v * c + u0[i] * s), u = u0.map((v, i) => v * c - r0[i] * s);
  return { f, r, u };
}
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
function project(p, xyz) {
  const { f, r, u } = basis(p[3], p[4], p[5]);
  const d = [xyz[0] - p[0], xyz[1] - p[1], xyz[2] - p[2]];
  const zc = dot(d, f); if (zc < 0.05) return [1e6, 1e6];
  const xn = dot(d, r) / zc, yn = dot(d, u) / zc, r2 = xn * xn + yn * yn, k = 1 + p[7] * r2;
  return [cx + p[6] * xn * k, cy - p[6] * yn * k];
}
// A point has xyz (feet). A vertical line has vline:[x,y] (a plumb edge at that plan position) and px = any point on its image;
// its residual is the perpendicular pixel distance from px to the projected line.
function lineDist(p, q) {
  const a = project(p, [q.vline[0], q.vline[1], 0.5]), b = project(p, [q.vline[0], q.vline[1], 30]);
  if (a[0] > 1e5 || b[0] > 1e5) return 1e4;
  const dx = b[0] - a[0], dy = b[1] - a[1];
  return (dx * (q.px[1] - a[1]) - dy * (q.px[0] - a[0])) / Math.hypot(dx, dy);
}
function resid(p) {
  const out = [];
  for (const q of pts) { if (q.vline) { out.push(lineDist(p, q)); continue; } const [u, v] = project(p, q.xyz); out.push(u - q.px[0], v - q.px[1]); }
  return out;
}
const cost = (r) => r.reduce((a, b) => a + b * b, 0);
function solve(sol0, free) {
  let p = sol0.slice(), lam = 1e-2, r = resid(p), c = cost(r);
  for (let it = 0; it < 300; it++) {
    const J = free.map((i) => { const h = Math.max(1e-6, Math.abs(p[i]) * 1e-6), q = p.slice(); q[i] += h; return resid(q).map((v, k) => (v - r[k]) / h); });
    const n = free.length, A = Array.from({ length: n }, () => new Array(n).fill(0)), g = new Array(n).fill(0);
    for (let a = 0; a < n; a++) { for (let b = 0; b < n; b++) { let s = 0; for (let k = 0; k < r.length; k++) s += J[a][k] * J[b][k]; A[a][b] = s; } for (let k = 0; k < r.length; k++) g[a] += J[a][k] * r[k]; }
    let improved = false;
    for (let tries = 0; tries < 12; tries++) {
      const M = A.map((row, i) => row.map((v, j) => v + (i === j ? lam * (A[i][i] + 1e-9) : 0)));
      const d = gauss(M, g.map((v) => -v)); if (!d) { lam *= 10; continue; }
      const q = p.slice(); free.forEach((i, k) => (q[i] += d[k]));
      const rq = resid(q), cq = cost(rq);
      if (cq < c) { p = q; r = rq; if (c - cq < 1e-9) { c = cq; return { p, c }; } c = cq; lam = Math.max(lam / 5, 1e-9); improved = true; break; }
      lam *= 5;
    }
    if (!improved) break;
  }
  return { p, c };
}
function gauss(M, b) {
  const n = b.length, A = M.map((r, i) => [...r, b[i]]);
  for (let i = 0; i < n; i++) {
    let m = i; for (let k = i + 1; k < n; k++) if (Math.abs(A[k][i]) > Math.abs(A[m][i])) m = k;
    if (Math.abs(A[m][i]) < 1e-14) return null; [A[i], A[m]] = [A[m], A[i]];
    for (let k = i + 1; k < n; k++) { const f = A[k][i] / A[i][i]; for (let j = i; j <= n; j++) A[k][j] -= f * A[i][j]; }
  }
  const x = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) { let s = A[i][n]; for (let j = i + 1; j < n; j++) s -= A[i][j] * x[j]; x[i] = s / A[i][i]; }
  return x;
}
// multi-start
const hint = P.hint || { pos: [25, 50, 5], yawDeg: -90 };
let rnd = 12345; const R = () => ((rnd = (rnd * 1664525 + 1013904223) >>> 0) / 4294967296);
let best = null;
const free = useK1 ? [0, 1, 2, 3, 4, 5, 6, 7] : [0, 1, 2, 3, 4, 5, 6];
for (let s = 0; s < 3000; s++) {
  const wide = s % 3 === 0 ? 3 : 1;
  const p0 = [hint.pos[0] + (R() - .5) * 30 * wide, hint.pos[1] + (R() - .5) * 30 * wide, 3 + R() * 8,
    (hint.yawDeg + (R() - .5) * 80 * wide) * Math.PI / 180, (R() - .5) * 0.3, (R() - .5) * 0.1, Wd * (0.6 + R() * 1.0), 0];
  const res = solve(p0, useK1 ? free.slice(0, 7) : free); // k1 added after
  if (!best || res.c < best.c) best = res;
}
if (useK1) best = solve(best.p, free);
const p = best.p;
const nPt = pts.filter((q) => !q.vline).length, nLn = pts.length - nPt;
const rLines = pts.filter((q) => q.vline).map((q) => lineDist(p, q));
const rms = Math.sqrt((best.c - rLines.reduce((a, b) => a + b * b, 0)) / nPt);
const lineRms = nLn ? Math.sqrt(rLines.reduce((a, b) => a + b * b, 0) / nLn) : 0;
const per = pts.map((q) => { if (q.vline) return { label: q.label, du: +lineDist(p, q).toFixed(1), dv: 0 }; const [u, v] = project(p, q.xyz); return { label: q.label, du: +(u - q.px[0]).toFixed(1), dv: +(v - q.px[1]).toFixed(1) }; });
const { f, u } = basis(p[3], p[4], p[5]);
const tgt = [p[0] + f[0] * 20, p[1] + f[1] * 20, p[2] + f[2] * 20];
const out = {
  photo: name, width: Wd, height: Ht, position: p.slice(0, 3).map((v) => +v.toFixed(3)), target: tgt.map((v) => +v.toFixed(3)), up: u.map((v) => +v.toFixed(5)),
  yawDeg: +(p[3] * 180 / Math.PI).toFixed(3), pitchDeg: +(p[4] * 180 / Math.PI).toFixed(3), rollDeg: +(p[5] * 180 / Math.PI).toFixed(3),
  focalPx: +p[6].toFixed(2), vfovDeg: +(2 * Math.atan(Ht / 2 / p[6]) * 180 / Math.PI).toFixed(3), k1: +p[7].toFixed(5),
  rmsPx: +rms.toFixed(2), lineRmsPx: +lineRms.toFixed(2), rmsPctWidth: +(rms / Wd * 100).toFixed(3), nPoints: nPt, nVerticalLines: nLn, dropped: dropArg,
};
fs.writeFileSync(path.join(dir, `${name}.camera.json`), JSON.stringify(out, null, 2) + '\n');
console.log(JSON.stringify(out, null, 1)); console.log(per.map((q) => `${q.label}: ${q.du},${q.dv}`).join('\n'));
