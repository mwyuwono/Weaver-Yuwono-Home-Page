#!/usr/bin/env node
/**
 * Dev-only overlay QA (not bundled): serves the BUILT app (projects/connecticut-cottage),
 * screenshots the straight-on orthographic QA view of each face (`?qa=front|rear|left|right`,
 * 2 px per inch, see src/scene/qaView.ts) and composites the DXF elevation linework in red
 * over it with qa/compare.py (which also prints the alignment metrics).
 *
 *   npm run build && node qa/overlay.mjs [face ...]        -> /home/claude/dxf/qa-<face>.png
 *   env: DXF (default /home/claude/dxf/cottage.dxf), OUT (default /home/claude/dxf)
 */
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const here = dirname(fileURLToPath(import.meta.url));
const dist = join(here, '../../../projects/connecticut-cottage');
const dxf = process.env.DXF ?? '/home/claude/dxf/cottage.dxf';
const out = process.env.OUT ?? '/home/claude/dxf';
const faces = process.argv.length > 2 ? process.argv.slice(2) : ['front', 'rear', 'left', 'right'];
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png' };

const server = createServer(async (req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
  try {
    const body = await readFile(join(dist, path.endsWith('/') ? path + 'index.html' : path));
    res.writeHead(200, { 'content-type': types[extname(path)] ?? 'application/octet-stream' }).end(body);
  } catch {
    res.writeHead(404).end();
  }
}).listen(0);
const { port } = server.address();

const browser = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
try {
  for (const face of faces) {
    const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });
    page.on('pageerror', (e) => console.error(`[${face}] page error:`, e.message));
    await page.goto(`http://localhost:${port}/index.html?qa=${face}`);
    await page.waitForSelector('body[data-qa-ready="1"]', { timeout: 60000 });
    const model = join(out, `qa-${face}-model.png`);
    await page.screenshot({ path: model });
    await page.close();
    execFileSync('python3', ['-I', join(here, 'compare.py'), dxf, face, model, join(out, `qa-${face}.png`)], { stdio: 'inherit' });
  }
} finally {
  await browser.close();
  server.close();
}
