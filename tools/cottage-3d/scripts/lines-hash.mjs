// Fingerprint of everything the baked linework depends on: the model data and every source that shapes geometry,
// classification or merging. Shared by the bake script (written into the file) and the vite plugin (expected value).
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const src = join(dirname(fileURLToPath(import.meta.url)), '../src');
// Sources that cannot change the line segments (scene, UI, animation, screen compositing, the loader itself).
const IGNORED = /^(ui|scene|anim)\/|^(main\.ts|style\.css|virtual\.d\.ts|data\/lines\.ts|render\/(Pipeline|composite|glsl)\.ts)$/;

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]));
}

export function computeLinesHash() {
  const hash = createHash('sha1');
  const files = walk(src).map((f) => relative(src, f).split('\\').join('/')).filter((f) => !IGNORED.test(f)).sort();
  for (const f of files) hash.update(f).update(readFileSync(join(src, f)));
  return hash.digest('hex').slice(0, 16);
}
