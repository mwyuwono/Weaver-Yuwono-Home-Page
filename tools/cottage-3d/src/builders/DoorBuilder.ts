/**
 * DoorBuilder — doors in their local opening frame (see openingFrame.ts).
 *  - sym 'E' (front door): stained six-panel leaf with a flat-cornice
 *    entablature and side pilasters (trim Option 1).
 *  - other exterior doors: glazed leaf (sage-grey sash with muntins).
 *  - interior doors: painted six-panel leaf with plain casing.
 */
import * as THREE from 'three';
import type { Level, Opening } from '../data/schema';
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

function buildTemplate(op: Opening, m: Materials): GeometryBatch {
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
    addCasing(b, m, w, 0, head, half, 1, false);
    // Pilasters with base and capital
    for (const side of [-1, 1]) {
      const x = side * (w / 2 + 3 + 2.75);
      b.box(m.trim, [5.5, head - 6, 1.6], [x, 3 + (head - 6) / 2, half + 0.8]);
      b.box(m.trim, [7, 6, 2.4], [x, 3, half + 1.2]);
      b.box(m.trim, [7, 2.5, 2.4], [x, head - 1.25, half + 1.2]);
    }
    // Flat cornice head: architrave, frieze, projecting cornice, crown
    const ew = w + 2 * 6.5 + 8;
    b.box(m.trim, [ew - 2, 3, 1.5], [0, head + 1.5, half + 0.75]);
    b.box(m.trim, [ew, 6, 1.5], [0, head + 6, half + 0.75]);
    b.box(m.trim, [ew + 3, 2.5, 4.5], [0, head + 10.25, half + 2.25]);
    b.box(m.trim, [ew + 5, 1.5, 5.5], [0, head + 12.25, half + 2.75]);
    addCasing(b, m, w, 0, head, -half, -1, false); // interior side
  } else if (op.exterior) {
    addSash(b, m, { cx: 0, y0: 1, w: w - 4, h: head - 3, z: 0, lites: op.lites ?? [2, 4], stile: 4, rail: 4 });
    addCasing(b, m, w, 0, head, half, 1, true);
    addCasing(b, m, w, 0, head, -half, -1, false);
  } else {
    addPanelLeaf(b, m.trim, w - 4, head, 1.75);
    addCasing(b, m, w, 0, head, half, 1, false);
    addCasing(b, m, w, 0, head, -half, -1, false);
  }
  return b;
}

const templates = new Map<string, GeometryBatch>();

/** Build every door of a level into one merged group. */
export function buildDoors(level: Level, m: Materials): THREE.Group {
  const out = new GeometryBatch();
  for (const op of level.openings) {
    if (op.kind !== 'door') continue;
    const key = JSON.stringify([op.sym, op.width, op.depth, op.head, op.lites, op.exterior]);
    let tpl = templates.get(key);
    if (!tpl) {
      tpl = buildTemplate(op, m);
      templates.set(key, tpl);
    }
    out.addBatch(tpl, openingFrame(op, level));
  }
  return out.toGroup(`doors-${level.id}`);
}
