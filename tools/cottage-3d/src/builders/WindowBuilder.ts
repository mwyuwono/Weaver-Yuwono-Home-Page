/**
 * WindowBuilder — windows and cased (frame-less) openings.
 *
 * Each distinct window type (size, lites, style, exterior) is authored ONCE as
 * a template batch in the opening's local frame (see openingFrame.ts) and then
 * stamped at every matching opening, so 40 windows cost 40 matrix transforms,
 * not 40 hand-built models. Everything ends up merged per material.
 */
import * as THREE from 'three';
import type { Level, Opening, Trim } from '../data/schema';
import type { Materials } from '../materials';
import { GeometryBatch } from './geometry';
import { openingFrame } from './openingFrame';

export interface SashSpec {
  cx: number; y0: number; w: number; h: number; z: number;
  lites: [number, number];
  stile?: number; rail?: number;
}

/** One sash: stiles + rails (sage-grey), a glass pane, and a muntin grid. */
export function addSash(b: GeometryBatch, m: Materials, s: SashSpec): void {
  const stile = s.stile ?? 2, rail = s.rail ?? 2, t = 1.5;
  const gw = s.w - 2 * stile, gh = s.h - 2 * rail, cy = s.y0 + s.h / 2;
  for (const side of [-1, 1]) b.box(m.sash, [stile, s.h, t], [s.cx + side * (s.w / 2 - stile / 2), cy, s.z]);
  b.box(m.sash, [gw, rail, t], [s.cx, s.y0 + rail / 2, s.z]);
  b.box(m.sash, [gw, rail, t], [s.cx, s.y0 + s.h - rail / 2, s.z]);
  b.box(m.glass, [gw, gh, 0.3], [s.cx, cy, s.z]);
  for (let i = 1; i < s.lites[0]; i++) b.box(m.sash, [0.8, gh, 0.9], [s.cx - gw / 2 + (gw * i) / s.lites[0], cy, s.z]);
  for (let j = 1; j < s.lites[1]; j++) b.box(m.sash, [gw, 0.8, 0.9], [s.cx, s.y0 + rail + (gh * j) / s.lites[1], s.z]);
}

/**
 * Casing on one face of the wall (`faceZ` is the wall face, `dir` ±1 the way it projects): side boards, a head board
 * rising above the opening with a drip cap, and — on exterior faces — a projecting sill. Sizes are measured (data.trim).
 */
export function addCasing(b: GeometryBatch, m: Materials, c: Trim['casing'], w: number, y0: number, h: number, faceZ: number, dir: 1 | -1, exterior: boolean): void {
  const outer = c.outer, proud = c.proud;
  const cz = faceZ + dir * proud / 2;
  const sideW = c.side, sideX = w / 2 + outer - sideW / 2;
  for (const side of [-1, 1]) b.box(m.trim, [sideW, h + c.headAboveOpening, proud], [side * sideX, y0 + (h + c.headAboveOpening) / 2, cz]);
  const headTop = y0 + h + c.headAboveOpening;
  b.box(m.trim, [w + 2 * outer, c.headHeight, proud], [0, headTop - c.headHeight / 2, cz]);
  if (exterior) {
    b.box(m.trim, [w + 2 * outer + 1.6, 0.8, c.dripProud], [0, headTop + 0.4, faceZ + dir * c.dripProud / 2]); // drip cap
    b.box(m.trim, [w + 2 * c.sillWider, c.sillHeight, c.sillProud], [0, y0 - c.sillHeight / 2, faceZ + dir * c.sillProud / 2], [0, 0, 0], { sizeIn: w + 2 * c.sillWider }); // sill: its long edges are a main line of the elevation, so it must not fade with its thin section
  }
}

/** Brow windows (type D), from the front elevation: unit size (its sill is the opening's sill), casing width round it, the casing's projection from the wall face, and the frieze board's projection. */
export const BROW = { w: 34.4, h: 15.6, casing: 0.8, proud: 3.5, frieze: 2.0 };

function buildTemplate(op: Opening, m: Materials, c: Trim['casing']): GeometryBatch {
  const b = new GeometryBatch();
  const { width: w, depth: d, sill: y0 } = op;
  const h = op.head - op.sill;
  const half = d / 2;

  if (op.kind === 'window' && op.sym === 'D') {
    // Brow window in the frieze: the unit sits out at the frieze board (not back in the wall like the others), in a
    // narrow flat casing the frieze bands die into. The unit is drawn smaller than the scheduled rough opening.
    const w = BROW.w, h = BROW.h;
    const face = half + BROW.frieze, back = -1.75, fz = (face + back) / 2, fd = face - back;
    for (const side of [-1, 1]) b.box(m.trim, [1.5, h, fd], [side * (w / 2 - 0.75), y0 + h / 2, fz]);
    b.box(m.trim, [w - 3, 1.5, fd], [0, y0 + h - 0.75, fz]);
    b.box(m.trim, [w - 3, 1.5, fd], [0, y0 + 0.75, fz]);
    addSash(b, m, { cx: 0, y0: y0 + 1.5, w: w - 3, h: h - 3, z: face - 1.25, lites: op.lites ?? [3, 1], stile: 1.6, rail: 1.6 });
    const c0 = BROW.casing, cz = half + BROW.proud / 2;
    for (const side of [-1, 1]) b.box(m.trim, [c0, h + 2 * c0, BROW.proud], [side * (w / 2 + c0 / 2), y0 + h / 2, cz]);
    for (const y of [y0 - c0 / 2, y0 + h + c0 / 2]) b.box(m.trim, [w, c0, BROW.proud], [0, y, cz]);
  } else if (op.kind === 'window') {
    // Jamb frame
    for (const side of [-1, 1]) b.box(m.trim, [1.5, h, 3.5], [side * (w / 2 - 0.75), y0 + h / 2, 0]);
    b.box(m.trim, [w - 3, 1.5, 3.5], [0, y0 + h - 0.75, 0]);
    b.box(m.trim, [w - 3, 1.5, 3.5], [0, y0 + 0.75, 0]);
    // Sashes
    const iw = w - 3, ih = h - 3, lites = op.lites ?? [2, 2];
    if (op.style === 'double-hung' || op.style === undefined) {
      const sh = ih / 2 + 0.5; // sashes overlap at the meeting rail
      addSash(b, m, { cx: 0, y0: y0 + 1.5, w: iw, h: sh, z: 0.8, lites }); // lower sash (inside→outside order is cosmetic)
      addSash(b, m, { cx: 0, y0: y0 + 1.5 + ih - sh, w: iw, h: sh, z: -0.8, lites });
    } else {
      addSash(b, m, { cx: 0, y0: y0 + 1.5, w: iw, h: ih, z: 0, lites });
    }
    addCasing(b, m, c, w, y0, h, half, 1, op.exterior);
    if (!op.exterior) addCasing(b, m, c, w, y0, h, -half, -1, false);
  } else {
    // Cased opening: trim on both faces only.
    addCasing(b, m, c, w, y0, h, half, 1, false);
    addCasing(b, m, c, w, y0, h, -half, -1, false);
  }
  return b;
}

const templates = new Map<string, GeometryBatch>();

/** Build all windows and cased openings of a level into one merged group. */
export function buildWindows(level: Level, m: Materials, casing: Trim['casing']): THREE.Group {
  const out = new GeometryBatch();
  for (const op of level.openings) {
    if (op.kind === 'door') continue;
    const key = JSON.stringify([op.kind, op.sym, op.width, op.depth, op.sill, op.head, op.lites, op.style, op.exterior]);
    let tpl = templates.get(key);
    if (!tpl) {
      tpl = buildTemplate(op, m, casing);
      templates.set(key, tpl);
    }
    out.addBatch(tpl, openingFrame(op, level));
  }
  return out.toGroup(`windows-${level.id}`);
}
