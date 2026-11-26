// Projects plan points through a solved camera: node proj.mjs IMG_0430 x,y,z [x,y,z ...]
import fs from 'node:fs';
const C = JSON.parse(fs.readFileSync(`cameras/${process.argv[2]}.camera.json`));
const yaw = C.yawDeg * Math.PI / 180, pitch = C.pitchDeg * Math.PI / 180, roll = C.rollDeg * Math.PI / 180;
const f = [Math.cos(pitch) * Math.cos(yaw), Math.cos(pitch) * Math.sin(yaw), Math.sin(pitch)], r0 = [Math.sin(yaw), -Math.cos(yaw), 0];
const u0 = [r0[1] * f[2] - r0[2] * f[1], r0[2] * f[0] - r0[0] * f[2], r0[0] * f[1] - r0[1] * f[0]], c = Math.cos(roll), s = Math.sin(roll);
const r = r0.map((v, i) => v * c + u0[i] * s), u = u0.map((v, i) => v * c - r0[i] * s), dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
for (const a of process.argv.slice(3).filter((s) => !s.startsWith("ground:"))) {
  const q = a.split(',').map(Number), d = q.map((v, i) => v - C.position[i]), zc = dot(d, f), xn = dot(d, r) / zc, yn = dot(d, u) / zc, k = 1 + C.k1 * (xn * xn + yn * yn);
  console.log(a, '->', (C.width / 2 + C.focalPx * xn * k).toFixed(0), (C.height / 2 - C.focalPx * yn * k).toFixed(0));
}
// ground: node proj.mjs IMG_0430 ground:u,v  -> plan (x,y) where the pixel ray meets z = 0
for (const a of process.argv.slice(3).filter((s) => s.startsWith('ground:'))) {
  const [pu, pv] = a.slice(7).split(',').map(Number), xn = (pu - C.width / 2) / C.focalPx, yn = -(pv - C.height / 2) / C.focalPx;
  const dir = f.map((v, i) => v + xn * r[i] + yn * u[i]), t = -C.position[2] / dir[2];
  console.log(a, '-> plan', (C.position[0] + t * dir[0]).toFixed(1), (C.position[1] + t * dir[1]).toFixed(1));
}
