/**
 * Shared material palette — created once, reused by every builder.
 *
 * Every material is a watercolour wash (see render/wash.ts): an abstract near-white neutral set,
 * given as multipliers on the paper (1 = bare paper), plus an ink-weight class that drives the outline hierarchy.
 * Material distinctions come from value and the ink hierarchy, not from realistic surfaces or hatch textures.
 */
import { DoubleSide } from 'three';
import { WashMaterial, type WashSpec } from './render/wash';

export interface Materials {
  siding: WashMaterial;
  trim: WashMaterial;
  sash: WashMaterial;
  glass: WashMaterial;
  door: WashMaterial;
  brick: WashMaterial;
  roof: WashMaterial;
  interior: WashMaterial;
  floor: WashMaterial;
  concrete: WashMaterial;
  cabinet: WashMaterial;
  soapstone: WashMaterial;
  porcelain: WashMaterial;
  appliance: WashMaterial;
  wood: WashMaterial;
  ground: WashMaterial;
  railing: WashMaterial;
}

const SPECS: Record<keyof Materials, WashSpec> = {
  // Abstract presentation palette: the model reads as a sophisticated white study model, not a picture of surface materials.
  // Warm near-white neutrals (to sit on the case page's warm paper) separated by value only; one sage-grey tint for
  // glass and door; contrast comes from the graphite line.
  // Primary architecture (ink >= 0.85): heavier outlines.
  siding: { lit: '#ffffff', shade: '#e7e5de', ink: 1.0, detail: 'clapboard', shadowWeight: 0.7, poche: 0.9 },
  roof: { lit: '#dddad4', shade: '#c5c2bc', ink: 0.98, shadowWeight: 0.55, mottle: 0.04, detail: 'seams', period: 31.25 / 12 },
  concrete: { lit: '#e7e5de', shade: '#ceccc5', ink: 0.93, poche: 0.5 },
  brick: { lit: '#d2d0c9', shade: '#b9b6b0', ink: 0.91, shadowWeight: 0.55, mottle: 0.03 },
  // Secondary detail: finer, lighter lines.
  trim: { lit: '#ffffff', shade: '#eeebe5', ink: 0.56, shadowWeight: 0.7 },
  railing: { lit: '#ffffff', shade: '#ebe8e2', ink: 0.54, shadowWeight: 0.5 },
  sash: { lit: '#fefbf5', shade: '#e7e5de', ink: 0.52 },
  door: { lit: '#bfc4bb', shade: '#a9afa6', ink: 0.6 },
  // Glass: a single soft sage-grey tint (the case page's green accent, much diluted), no strokes.
  glass: { lit: '#aab3ab', shade: '#9ba59d', ink: 0.42, shadeRange: 0.25, shadowWeight: 0, mottle: 0, castShadow: false },
  // Interiors (seen when the model is exploded or isolated).
  interior: { lit: '#fefbf5', shade: '#e8e6df', ink: 0.46, shadowWeight: 0.2, poche: 0.9 },
  floor: { lit: '#eceae3', shade: '#d8d6cf', ink: 0.47, shadowWeight: 0.2, mottle: 0.03 },
  wood: { lit: '#e3e1da', shade: '#cccac3', ink: 0.48 },
  cabinet: { lit: '#eeebe5', shade: '#d5d3cc', ink: 0.44 },
  soapstone: { lit: '#b0aea7', shade: '#9c9a93', ink: 0.43, shadeRange: 0.4 },
  porcelain: { lit: '#fffdf7', shade: '#eeebe5', ink: 0.41 },
  appliance: { lit: '#efede6', shade: '#d8d6cf', ink: 0.4 },
  // Pale wash that fades to bare paper (the terrain adds its own fade).
  ground: { lit: '#f4f2eb', shade: '#e2e0d9', ink: 0.3, shadeRange: 0, shadowWeight: 0.7, mottle: 0.06 },
};

function createMaterials(): Materials {
  const out = {} as Materials;
  for (const key of Object.keys(SPECS) as (keyof Materials)[]) {
    const m = new WashMaterial(SPECS[key]);
    m.name = key;
    if (key === 'roof') m.side = DoubleSide; // the roof slabs are thin shells
    out[key] = m;
  }
  return out;
}

/** The one palette instance. */
export const materials: Materials = createMaterials();
