// Full-page screenshot. Needs playwright-core and Google Chrome. Usage: node shot.mjs URL OUT.png WIDTH
import { chromium } from 'playwright-core';
const [,, url, out, width] = process.argv;
const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const p = await b.newPage({ viewport: { width: +width, height: 900 }, deviceScaleFactor: 1 });
await p.goto(url, { waitUntil: 'networkidle' });
await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 150)); } window.scrollTo(0,0); });
await p.waitForTimeout(1500);
await p.screenshot({ path: out, fullPage: true });
await b.close();
