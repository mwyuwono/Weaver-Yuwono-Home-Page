/**
 * Shared material palette — created once, reused by every builder.
 *
 * Every material is a watercolour wash (see render/wash.ts): a restrained set of beige, ochre and warm-taupe pigments,
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
  // One restrained family: low chroma, close values, warm neutrals. Contrast comes from the ink line, not the colour.
  // Primary architecture (ink >= 0.85): heavier, darker outlines.
  siding: { lit: '#fcf8ef', shade: '#e4d9c6', ink: 1.0, detail: 'clapboard', shadowWeight: 0.35, poche: 0.9 },
  roof: { lit: '#d6ccc0', shade: '#b9ada0', ink: 0.98, shadowWeight: 0.3, mottle: 0.06, detail: 'seams', period: 31.25 / 12 },
  concrete: { lit: '#e6dfd3', shade: '#c9bfb1', ink: 0.93, poche: 0.5 },
  brick: { lit: '#d3bdb1', shade: '#b9a397', ink: 0.91, shadowWeight: 0.35, mottle: 0.05 },
  // Secondary detail: finer, lighter lines.
  trim: { lit: '#fefdf8', shade: '#ebe3d4', ink: 0.56, shadowWeight: 0.3 },
  railing: { lit: '#fdfaf3', shade: '#e8dfce', ink: 0.54, shadowWeight: 0.25 },
  sash: { lit: '#fcf9f2', shade: '#e6dccb', ink: 0.52 },
  door: { lit: '#7d6352', shade: '#64503f', ink: 0.6 },
  // Glass: a single soft deep warm-grey tint, no strokes.
  glass: { lit: '#9a928a', shade: '#8a8178', ink: 0.42, shadeRange: 0.25, shadowWeight: 0, mottle: 0, castShadow: false },
  // Interiors (seen when the model is exploded or isolated).
  interior: { lit: '#f9f3e7', shade: '#e6dcc9', ink: 0.46, shadowWeight: 0.2, poche: 0.9 },
  floor: { lit: '#e8dcc6', shade: '#d4c6ac', ink: 0.47, shadowWeight: 0.2, mottle: 0.05 },
  wood: { lit: '#dccfba', shade: '#c4b59f', ink: 0.48 },
  cabinet: { lit: '#e8e0d2', shade: '#d0c5b2', ink: 0.44 },
  soapstone: { lit: '#a29a92', shade: '#8c837b', ink: 0.43, shadeRange: 0.4 },
  porcelain: { lit: '#fdfaf4', shade: '#ebe3d4', ink: 0.41 },
  appliance: { lit: '#e9e4da', shade: '#d3cabb', ink: 0.4 },
  // Pale wash that fades to bare paper (the terrain adds its own fade).
  ground: { lit: '#f3efe3', shade: '#e0d8c6', ink: 0.3, shadeRange: 0, shadowWeight: 0.7, mottle: 0.08 },
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
