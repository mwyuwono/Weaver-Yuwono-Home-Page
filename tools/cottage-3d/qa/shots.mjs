// Screenshot harness: serves the built dist and captures fixed views (SwiftShader; run ONE at a time, slow).
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdirSync } from 'node:fs';
const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(join(here, '../package.json'));
const { chromium } = require('playwright');
const dist = resolve(here, '../../../projects/connecticut-cottage/model');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };
const server = createServer(async (req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname));
  try { const body = await readFile(join(dist, path.endsWith('/') ? path + 'index.html' : path)); res.writeHead(200, { 'content-type': types[extname(path)] ?? 'application/octet-stream' }).end(body); } catch { res.writeHead(404).end(); }
}).listen(0);
const { port } = server.address();
const browser = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
// usage: node qa/shots.mjs <hero|mobile|rear|far|exploded|door|cam> [outDir=qa/out] [prefix=shot] [cam: px,py,pz,tx,ty,tz inches]
const mode = process.argv[2];
const out = resolve(process.argv[3] ?? join(here, 'out')) + '/';
const prefix = process.argv[4] ?? 'shot';
mkdirSync(out, { recursive: true });
const mobile = mode === 'mobile';
const [W, H] = mobile ? [390, 844] : [1280, 800];
const ctx = await browser.newContext(mobile ? { viewport: { width: W, height: H }, deviceScaleFactor: 3, isMobile: true, hasTouch: true } : { viewport: { width: W, height: H }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
page.on('pageerror', (e) => console.log('ERR ' + e.message));
page.on('console', (m) => { if (m.type() === 'error' || m.text().includes('cottage')) console.log(m.text()); });
await page.goto(`http://localhost:${port}/index.html${mode === 'cam' ? '?cam=' + process.argv[5] : ''}`);
await page.waitForFunction(() => document.getElementById('cottage-loading')?.classList.contains('done'), null, { timeout: 240000 });
await page.waitForTimeout(3500);
const shot = (n) => page.screenshot({ path: out + prefix + '-' + n + '.png', timeout: 240000 });
const click = (t) => page.locator(t).first().evaluate((e) => e.click());
if (mode !== 'cam') await page.mouse.move(640, 400);
if (mode === 'hero') await shot('hero');
else if (mode === 'cam') await shot('cam');
else if (mode === 'mobile') await shot('mobile');
else if (mode === 'rear') { await page.mouse.down(); await page.mouse.move(1040, 400, { steps: 20 }); await page.mouse.up(); await page.waitForTimeout(3500); await shot('rear34'); }
else if (mode === 'far') { for (let i = 0; i < 6; i++) await page.mouse.wheel(0, 300); await page.waitForTimeout(5000); await shot('far'); }
else if (mode === 'exploded') { await page.getByRole('button', { name: /explode/i }).first().click(); await page.waitForTimeout(6000); await shot('exploded'); }
else if (mode === 'door') {
  await page.mouse.down(); await page.mouse.move(640 - 90, 400 + 30, { steps: 10 }); await page.mouse.up();
  for (let i = 0; i < 7; i++) await page.mouse.wheel(0, -300);
  await page.waitForTimeout(1500);
  await page.mouse.move(640, 500); await page.mouse.down({ button: 'right' }); await page.mouse.move(640, 250, { steps: 10 }); await page.mouse.up({ button: 'right' });
  await page.waitForTimeout(4500);
  await shot('closeup-door');
}
await browser.close(); server.close();
