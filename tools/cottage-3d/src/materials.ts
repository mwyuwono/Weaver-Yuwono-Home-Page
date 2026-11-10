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
  // Near-white neutrals separated by value only; one cool grey tint for glass; contrast comes from the graphite line.
  // Primary architecture (ink >= 0.85): heavier outlines.
  siding: { lit: '#ffffff', shade: '#e4e5e4', ink: 1.0, detail: 'clapboard', shadowWeight: 0.35, poche: 0.9 },
  roof: { lit: '#d9dadb', shade: '#c0c2c4', ink: 0.98, shadowWeight: 0.3, mottle: 0.04, detail: 'seams', period: 31.25 / 12 },
  concrete: { lit: '#e6e5e2', shade: '#cdccc8', ink: 0.93, poche: 0.5 },
  brick: { lit: '#d2cfcc', shade: '#b9b6b3', ink: 0.91, shadowWeight: 0.35, mottle: 0.03 },
  // Secondary detail: finer, lighter lines.
  trim: { lit: '#ffffff', shade: '#ebebea', ink: 0.56, shadowWeight: 0.3 },
  railing: { lit: '#ffffff', shade: '#e8e8e7', ink: 0.54, shadowWeight: 0.25 },
  sash: { lit: '#fbfbfa', shade: '#e4e5e4', ink: 0.52 },
  door: { lit: '#c3c6c8', shade: '#aeb1b4', ink: 0.6 },
  // Glass: a single soft cool-grey tint, no strokes.
  glass: { lit: '#aab3b9', shade: '#9ba4aa', ink: 0.42, shadeRange: 0.25, shadowWeight: 0, mottle: 0, castShadow: false },
  // Interiors (seen when the model is exploded or isolated).
  interior: { lit: '#fbfbfa', shade: '#e5e6e5', ink: 0.46, shadowWeight: 0.2, poche: 0.9 },
  floor: { lit: '#ebeae7', shade: '#d7d6d2', ink: 0.47, shadowWeight: 0.2, mottle: 0.03 },
  wood: { lit: '#e3e1dd', shade: '#cccac6', ink: 0.48 },
  cabinet: { lit: '#ecebe9', shade: '#d4d3d0', ink: 0.44 },
  soapstone: { lit: '#abadaf', shade: '#96999c', ink: 0.43, shadeRange: 0.4 },
  porcelain: { lit: '#fdfdfc', shade: '#ebebea', ink: 0.41 },
  appliance: { lit: '#ededeb', shade: '#d6d6d3', ink: 0.4 },
  // Pale wash that fades to bare paper (the terrain adds its own fade).
  ground: { lit: '#f3f2ef', shade: '#e1e0dc', ink: 0.3, shadeRange: 0, shadowWeight: 0.7, mottle: 0.06 },
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
