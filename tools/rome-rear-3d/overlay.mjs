// Alignment check: photo + 50% blend of the existing render, plus an edge overlay, with observed (green) and projected (red) correspondences.
// Usage: node overlay.mjs IMG_0429 [matchDir]
import fs from 'node:fs'; import { execFileSync } from 'node:child_process';
const name = process.argv[2], dir = process.argv[3] || '../../.claude/preview/rome-rear/match';
const C = JSON.parse(fs.readFileSync(`cameras/${name}.camera.json`)), P = JSON.parse(fs.readFileSync(`cameras/${name}.points.json`));
const yaw = C.yawDeg * Math.PI / 180, pitch = C.pitchDeg * Math.PI / 180, roll = C.rollDeg * Math.PI / 180;
const f = [Math.cos(pitch) * Math.cos(yaw), Math.cos(pitch) * Math.sin(yaw), Math.sin(pitch)], r0 = [Math.sin(yaw), -Math.cos(yaw), 0];
const u0 = [r0[1] * f[2] - r0[2] * f[1], r0[2] * f[0] - r0[0] * f[2], r0[0] * f[1] - r0[1] * f[0]], c = Math.cos(roll), s = Math.sin(roll);
const r = r0.map((v, i) => v * c + u0[i] * s), u = u0.map((v, i) => v * c - r0[i] * s), dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
let draw = '';
for (const q of P.points) {
  if (q.vline) { draw += `-stroke cyan -fill none -draw "circle ${q.px[0]},${q.px[1]} ${q.px[0] + 6},${q.px[1]}" `; continue; }
  const d = q.xyz.map((v, i) => v - C.position[i]), zc = dot(d, f), xn = dot(d, r) / zc, yn = dot(d, u) / zc, k = 1 + C.k1 * (xn * xn + yn * yn);
  const pu = C.width / 2 + C.focalPx * xn * k, pv = C.height / 2 - C.focalPx * yn * k;
  draw += `-stroke lime -fill none -draw "circle ${q.px[0]},${q.px[1]} ${q.px[0] + 7},${q.px[1]}" -stroke red -draw "line ${pu - 9},${pv} ${pu + 9},${pv} line ${pu},${pv - 9} ${pu},${pv + 9}" `;
}
const sh = (cmd) => execFileSync('sh', ['-c', cmd], { stdio: 'inherit' });
const ph = `${dir}/${name}.jpg`, ex = `${dir}/${name}-existing.png`, fl = `${dir}/${name}-existing-flat.png`;
sh(`magick "${ph}" "${ex}" -compose blend -define compose:args=50 -composite -strokewidth 3 ${draw} "${dir}/${name}-overlay-blend.jpg"`);
// edge overlay: edges of the render in red over the photo
sh(`magick "${fl}" -colorspace gray -edge 1 -normalize -threshold 12% -morphology Dilate Disk:1 -transparent black -fill red -colorize 100 /private/tmp/claude-501/s/${name}-edges.png`);
sh(`magick "${ph}" /private/tmp/claude-501/s/${name}-edges.png -compose over -composite -strokewidth 3 ${draw} "${dir}/${name}-overlay-edges.jpg"`);
