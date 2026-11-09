/**
 * Shared material palette — created once, reused by every builder.
 *
 * Every material is a watercolour wash (see render/wash.ts): a restrained set of beige, ochre and warm-taupe pigments,
 * given as multipliers on the paper (1 = bare paper), plus an ink-weight class that drives the outline hierarchy.
 * Material distinctions come from selective drafting detail (`detail`), not from realistic surfaces.
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
  // Primary architecture (ink >= 0.85): heavier, darker outlines.
  siding: { lit: '#fbf6ec', shade: '#dccfba', ink: 1.0, detail: 'clapboard', shadowWeight: 0.35, poche: 0.9 },
  roof: { lit: '#d2c6b8', shade: '#ad9f90', ink: 0.98, shadowWeight: 0.3, hatch: 0.3, mottle: 0.1 },
  concrete: { lit: '#e2dacd', shade: '#bdb2a3', ink: 0.93, detail: 'stipple', poche: 0.5 },
  brick: { lit: '#dcb9a0', shade: '#b8957f', ink: 0.91, detail: 'brick', shadowWeight: 0.35, mottle: 0.1 },
  // Secondary detail: finer, lighter lines.
  trim: { lit: '#fefcf6', shade: '#e6dccb', ink: 0.56, shadowWeight: 0.3, hatch: 0.35 },
  railing: { lit: '#fcf9f1', shade: '#e4d9c6', ink: 0.54, shadowWeight: 0.25, hatch: 0.25 },
  sash: { lit: '#fbf7ee', shade: '#e0d5c2', ink: 0.52, hatch: 0.3 },
  door: { lit: '#c29a6e', shade: '#a07c56', ink: 0.6, hatch: 0.4 },
  glass: { lit: '#a39a91', shade: '#85796f', ink: 0.42, detail: 'glass', shadeRange: 0.3, shadowWeight: 0, hatch: 0, mottle: 0.05, castShadow: false },
  // Interiors (seen when the model is exploded or isolated).
  interior: { lit: '#f8f1e3', shade: '#e0d4bf', ink: 0.46, shadowWeight: 0.2, poche: 0.9 },
  floor: { lit: '#ecd9b6', shade: '#d3bb92', ink: 0.47, detail: 'floor', shadowWeight: 0.2, hatch: 0.2, mottle: 0.1 },
  wood: { lit: '#e0c49b', shade: '#c4a47a', ink: 0.48, hatch: 0.3 },
  cabinet: { lit: '#e6ddcc', shade: '#cbbfa8', ink: 0.44, hatch: 0.3 },
  soapstone: { lit: '#9c928a', shade: '#82786f', ink: 0.43, shadeRange: 0.4, hatch: 0.2 },
  porcelain: { lit: '#fdfaf4', shade: '#e8dfce', ink: 0.41, hatch: 0.2 },
  appliance: { lit: '#e7e1d6', shade: '#cdc4b4', ink: 0.4, hatch: 0.2 },
  // Pale wash that fades to bare paper (the terrain adds its own fade).
  ground: { lit: '#f2eee0', shade: '#d9cfbc', ink: 0.3, detail: 'ground', shadeRange: 0, shadowWeight: 0.75, mottle: 0.12, hatch: 0 },
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
