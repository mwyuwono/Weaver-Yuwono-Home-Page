/**
 * DoorBuilder — doors in their local opening frame (see openingFrame.ts).
 *  - sym 'E' (front door): stained six-panel leaf with a flat-cornice
 *    entablature and side pilasters (trim Option 1).
 *  - other exterior doors: glazed leaf (sage-grey sash with muntins).
 *  - interior doors: painted six-panel leaf with plain casing.
 */
import * as THREE from 'three';
import type { Level, Opening, Trim } from '../data/schema';
import type { Materials } from '../materials';
import { GeometryBatch } from './geometry';
import { openingFrame } from './openingFrame';
import { addCasing, addSash } from './WindowBuilder';

/** Six raised panels (2 across x 3 high) on a slab, both faces. */
function addPanelLeaf(b: GeometryBatch, mat: THREE.Material, w: number, h: number, thick: number): void {
  const y0 = 0.75, lh = h - 2.75;
  b.box(mat, [w, lh, thick], [0, y0 + lh / 2, 0]);
  const stile = 4.5, rail = 5;
  const pw = (w - 3 * stile) / 2, ph = (lh - 4 * rail) / 3;
  for (let c = 0; c < 2; c++) {
    for (let r = 0; r < 3; r++) {
      const x = -w / 2 + stile + pw / 2 + c * (pw + stile);
      const y = y0 + rail + ph / 2 + r * (ph + rail);
      for (const face of [-1, 1]) b.box(mat, [pw, ph, 0.5], [x, y, face * (thick / 2 + 0.2)]);
    }
  }
}

/** Front door surround (measured): pilasters with base and capital, a head board and a two-step cornice, both sides mirrored. */
function addSurround(b: GeometryBatch, m: Materials, s: Trim['doorSurround'], half: number): void {
  const [px0, px1] = s.pilasterX, [py0, py1] = s.pilasterY, pw = px1 - px0, z = half;
  for (const side of [-1, 1]) {
    const x = side * (px0 + px1) / 2;
    b.box(m.trim, [pw, py1 - py0, s.proud], [x, (py0 + py1) / 2, z + s.proud / 2]);
    b.box(m.trim, [pw + 1.6, s.baseY[1] - s.baseY[0], s.proud + 0.8], [x, (s.baseY[0] + s.baseY[1]) / 2, z + (s.proud + 0.8) / 2]);
    b.box(m.trim, [pw + 1.6, s.capitalTopY - py1, s.proud + 0.8], [x, (py1 + s.capitalTopY) / 2, z + (s.proud + 0.8) / 2]);
  }
  const [h0, h1] = s.headY, [c0, c1] = s.corniceY, [w0, w1] = s.corniceHalfWidth, mid = (c0 + c1) / 2;
  b.box(m.trim, [2 * px1 + 1.6, h1 - h0, s.proud], [0, (h0 + h1) / 2, z + s.proud / 2]);
  b.box(m.trim, [2 * w0, mid - c0, s.proud + 2.2], [0, (c0 + mid) / 2, z + (s.proud + 2.2) / 2]);
  b.box(m.trim, [2 * w1, c1 - mid, s.proud + 3.4], [0, (mid + c1) / 2, z + (s.proud + 3.4) / 2]);
}

function buildTemplate(op: Opening, m: Materials, c: Trim['casing'], s: Trim['doorSurround']): GeometryBatch {
  const b = new GeometryBatch();
  const { width: w, depth: d, head } = op;
  const half = d / 2;
  const front = op.sym === 'E';

  // Jamb frame
  for (const side of [-1, 1]) b.box(m.trim, [2, head, 3.5], [side * (w / 2 - 1), head / 2, 0]);
  b.box(m.trim, [w - 4, 2, 3.5], [0, head - 1, 0]);
  b.box(m.trim, [w, 1, 6], [0, 0.5, 0]); // threshold

  if (front) {
    addPanelLeaf(b, m.door, w - 4, head, 1.75);
    addCasing(b, m, c, w, 0, head, half, 1, false);
    addSurround(b, m, s, half);
    addCasing(b, m, c, w, 0, head, -half, -1, false); // interior side
  } else if (op.exterior) {
    addSash(b, m, { cx: 0, y0: 1, w: w - 4, h: head - 3, z: 0, lites: op.lites ?? [2, 4], stile: 4, rail: 4 });
    addCasing(b, m, c, w, 0, head, half, 1, true);
    addCasing(b, m, c, w, 0, head, -half, -1, false);
  } else {
    addPanelLeaf(b, m.trim, w - 4, head, 1.75);
    addCasing(b, m, c, w, 0, head, half, 1, false);
    addCasing(b, m, c, w, 0, head, -half, -1, false);
  }
  return b;
}

const templates = new Map<string, GeometryBatch>();

/** Build every door of a level into one merged group. */
export function buildDoors(level: Level, m: Materials, trim: Trim): THREE.Group {
  const out = new GeometryBatch();
  for (const op of level.openings) {
    if (op.kind !== 'door') continue;
    const key = JSON.stringify([op.sym, op.width, op.depth, op.head, op.lites, op.exterior]);
    let tpl = templates.get(key);
    if (!tpl) {
      tpl = buildTemplate(op, m, trim.casing, trim.doorSurround);
      templates.set(key, tpl);
    }
    out.addBatch(tpl, openingFrame(op, level));
  }
  return out.toGroup(`doors-${level.id}`);
}
