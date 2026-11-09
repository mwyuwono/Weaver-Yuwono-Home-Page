/**
 * WindowBuilder — windows and cased (frame-less) openings.
 *
 * Each distinct window type (size, lites, style, exterior) is authored ONCE as
 * a template batch in the opening's local frame (see openingFrame.ts) and then
 * stamped at every matching opening, so 40 windows cost 40 matrix transforms,
 * not 40 hand-built models. Everything ends up merged per material.
 */
import * as THREE from 'three';
import type { Level, Opening } from '../data/schema';
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

/** Flat casing (two sides + head) on one face of the wall; `faceZ` is the wall face, `dir` ±1 the way it projects. */
export function addCasing(b: GeometryBatch, m: Materials, w: number, y0: number, h: number, faceZ: number, dir: 1 | -1, drip: boolean): void {
  const cz = faceZ + dir * 0.5;
  for (const side of [-1, 1]) b.box(m.trim, [3.5, h, 1], [side * (w / 2 + 1.75), y0 + h / 2, cz]);
  b.box(m.trim, [w + 7, 3.5, 1], [0, y0 + h + 1.75, cz]);
  if (drip) b.box(m.trim, [w + 8, 0.8, 1.8], [0, y0 + h + 3.9, faceZ + dir * 0.9]);
}

function buildTemplate(op: Opening, m: Materials): GeometryBatch {
  const b = new GeometryBatch();
  const { width: w, depth: d, sill: y0 } = op;
  const h = op.head - op.sill;
  const half = d / 2;

  if (op.kind === 'window') {
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
    if (op.exterior) {
      addCasing(b, m, w, y0, h, half, 1, true);
      b.box(m.trim, [w + 5, 1.5, 3.2], [0, y0 - 0.75, half + 1.1]); // projecting sill
    } else {
      addCasing(b, m, w, y0, h, half, 1, false);
      addCasing(b, m, w, y0, h, -half, -1, false);
    }
  } else {
    // Cased opening: trim on both faces only.
    addCasing(b, m, w, y0, h, half, 1, false);
    addCasing(b, m, w, y0, h, -half, -1, false);
  }
  return b;
}

const templates = new Map<string, GeometryBatch>();

/** Build all windows and cased openings of a level into one merged group. */
export function buildWindows(level: Level, m: Materials): THREE.Group {
  const out = new GeometryBatch();
  for (const op of level.openings) {
    if (op.kind === 'door') continue;
    const key = JSON.stringify([op.kind, op.width, op.depth, op.sill, op.head, op.lites, op.style, op.exterior]);
    let tpl = templates.get(key);
    if (!tpl) {
      tpl = buildTemplate(op, m);
      templates.set(key, tpl);
    }
    out.addBatch(tpl, openingFrame(op, level));
  }
  return out.toGroup(`windows-${level.id}`);
}
