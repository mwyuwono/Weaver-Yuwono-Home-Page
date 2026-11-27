// Full-page screenshot with headless Google Chrome over the DevTools protocol; no npm dependencies (Node 22+).
// Scrolls the page first so lazy images load. Usage: node shot.mjs URL OUT.png WIDTH
// For a PDF review round: magick OUT.png OUT.pdf (or print the page from Chrome).
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const [,, url, out, width = '1280'] = process.argv;
if (!url || !out) { console.error('usage: node shot.mjs URL OUT.png WIDTH'); process.exit(2); }
const port = 9300 + Math.floor(Math.random() * 500);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'shot-'));
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, '--hide-scrollbars', `--window-size=${width},900`, 'about:blank'],
  { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const done = async (code) => {
  const exited = new Promise((r) => chrome.once('exit', r));
  chrome.kill();
  await Promise.race([exited, sleep(5000)]);
  try { fs.rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 }); } catch { /* temp dir; OS cleans up */ }
  process.exit(code);
};

let ws;
for (let i = 0; i < 50 && !ws; i++) {
  try {
    const page = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === 'page');
    if (page) ws = new WebSocket(page.webSocketDebuggerUrl);
  } catch { /* Chrome still starting */ }
  if (!ws) await sleep(200);
}
if (!ws) { console.error("could not connect to Chrome"); await done(1); }
await new Promise((r) => ws.addEventListener('open', r));
let id = 0;
const pending = new Map();
ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } });
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const evaluate = async (expression) => (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result?.result?.value;
const metrics = (height) => send('Emulation.setDeviceMetricsOverride', { width: +width, height, deviceScaleFactor: 1, mobile: +width < 600 });

await metrics(900);
await send('Page.enable');
const nav = await send('Page.navigate', { url });
if (nav.result?.errorText) { console.error(`navigation failed: ${nav.result.errorText}`); await done(1); }
await sleep(2500);
await evaluate(`(async () => {
  for (let y = 0; y < document.documentElement.scrollHeight; y += 500) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 200)); }
  scrollTo(0, 0);
  await Promise.all([...document.images].map((i) => (i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; }))));
})()`);
await sleep(1500);
const height = await evaluate('document.documentElement.scrollHeight');
await metrics(height);
await sleep(1000);
const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
fs.writeFileSync(out, Buffer.from(shot.result.data, 'base64'));
console.log(`${out} ${width}x${height}`);
ws.close();
await done(0);
