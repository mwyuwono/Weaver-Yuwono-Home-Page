// Build-time linework bake: constructs the house in node, runs the full edge classification and writes the merged
// segments to generated/lines.bin (see src/render/bakedLines.ts for the format). Run by `npm run build` / `dev`.
import { build } from 'esbuild';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { computeLinesHash } from './lines-hash.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'generated');
mkdirSync(outDir, { recursive: true });

const bundle = join(outDir, 'bake-entry.mjs');
await build({ entryPoints: [join(root, 'scripts/bake-entry.ts')], bundle: true, platform: 'node', format: 'esm', outfile: bundle, logLevel: 'error' });
const { bake } = await import(pathToFileURL(bundle).href);

const dataFile = ['house.json', 'house.sample.json'].map((f) => join(root, 'src/data', f)).find(existsSync);
const t0 = performance.now();
const { bytes, segments } = bake(JSON.parse(readFileSync(dataFile, 'utf8')), computeLinesHash());
writeFileSync(join(outDir, 'lines.bin'), bytes);
console.log(`[bake-lines] ${segments} segments, ${(bytes.length / 1024).toFixed(0)} KiB, ${Math.round(performance.now() - t0)} ms (${dataFile.split('/').pop()})`);
