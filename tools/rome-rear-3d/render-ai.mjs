// Photo-guided "after" renderings with the OpenAI Images edits endpoint.
// The first image is the real photo (edited in place); the model render from the matched camera is a reference.
// The key comes from OPENAI_API_KEY (set in ~/.zshenv); it is never printed or written anywhere.
//
//   node render-ai.mjs --view courtyard --photo P.jpg --render R.png --mask M.png \
//     [--ref palette.jpg,...] [--model gpt-image-2.6-flare|gpt-image-2.6-sunburst] [--quality high] [--complexity high] [--n 2] [--size 2048x1536]
//
// Mask: PNG with alpha, same size as the photo; transparent pixels are the area the model may change.
// Prompts: ai/prompts/<view>.txt. Output: .claude/preview/rome-rear/ai/<view>/ (untracked) + a run log with token usage.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const args = Object.fromEntries(process.argv.slice(2).reduce((acc, a, i, all) => (a.startsWith('--') ? [...acc, [a.slice(2), all[i + 1]]] : acc), []));
const need = (k) => { if (!args[k]) { console.error(`missing --${k}`); process.exit(2); } return args[k]; };
const view = need('view'), photo = need('photo'), render = args.render, mask = args.mask;
const model = args.model || 'gpt-image-2.6-flare';
const quality = args.quality || (model.includes('sunburst') ? 'high' : 'medium');
const complexity = args.complexity || 'high';
const n = +(args.n || 1);
const size = args.size || 'auto';
if (!process.env.OPENAI_API_KEY) { console.error('OPENAI_API_KEY is not set (add it to ~/.zshenv)'); process.exit(2); }

const prompt = fs.readFileSync(path.join(HERE, 'ai/prompts', `${view}.txt`), 'utf8').trim();
const outDir = path.resolve(HERE, '../../.claude/preview/rome-rear/ai', view);
fs.mkdirSync(outDir, { recursive: true });

const file = (p, type) => new Blob([fs.readFileSync(p)], { type });
const mime = (p) => (/\.png$/i.test(p) ? 'image/png' : /\.webp$/i.test(p) ? 'image/webp' : 'image/jpeg');
const form = new FormData();
form.append('model', model);
form.append('prompt', prompt);
form.append('image[]', file(photo, mime(photo)), path.basename(photo));
if (render) form.append('image[]', file(render, mime(render)), path.basename(render));
for (const r of (args.ref || '').split(',').filter(Boolean)) form.append('image[]', file(r, mime(r)), path.basename(r));
if (mask) form.append('mask', file(mask, 'image/png'), path.basename(mask));
form.append('quality', quality);
form.append('complexity', complexity);
form.append('n', String(n));
form.append('size', size);
form.append('output_format', 'png');

const t0 = Date.now();
const res = await fetch('https://api.openai.com/v1/images/edits', { method: 'POST', headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }, body: form });
const body = await res.json().catch(() => ({}));
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const log = { view, model, quality, complexity, n, size, photo: path.basename(photo), render: render ? path.basename(render) : null, refs: args.ref || null, mask: mask ? path.basename(mask) : null,
  status: res.status, seconds: (Date.now() - t0) / 1000, usage: body.usage || null, error: body.error?.message || null, outputs: [] };
(body.data || []).forEach((d, i) => {
  const f = path.join(outDir, `${model.replace('gpt-image-', 'gi')}-${quality}-${stamp}-${i + 1}.png`);
  fs.writeFileSync(f, Buffer.from(d.b64_json, 'base64'));
  log.outputs.push(path.basename(f));
});
fs.appendFileSync(path.join(outDir, 'runs.jsonl'), JSON.stringify({ ...log, prompt }) + '\n');
console.log(JSON.stringify(log, null, 1));
if (!res.ok) process.exit(1);
