/**
 * Shared material palette — created once, reused by every builder.
 *
 * Every material is a watercolour wash (see render/wash.ts): a warm-neutral set of absolute colours (laid over the
 * taupe ground by the paper pass), plus an ink-weight class that drives the outline hierarchy.
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
  // Warm-neutral presentation palette (Matt's approved rendering): warm ivory house, stone and limestone accents, muted
  // olive-grey glazing, on a deep taupe ground (render/composite.ts). Colours are absolute (lit = sun side, shade =
  // turned away); low saturation, no pure white or black, no cool greys. Contrast comes from value and the charcoal line.
  // Primary architecture (ink >= 0.85): heavier outlines.
  siding: { lit: '#f8ecdd', shade: '#ddd0be', ink: 1.0, detail: 'clapboard', shadowWeight: 0.7, poche: 0.9 },
  roof: { lit: '#bfb1a2', shade: '#b0a191', ink: 0.98, shadowWeight: 0.55, mottle: 0.04, detail: 'seams', period: 31.25 / 12 },
  concrete: { lit: '#c0ab95', shade: '#a99580', ink: 0.93, poche: 0.5 }, // foundation, steps, retaining walls
  brick: { lit: '#cdbba5', shade: '#b5a18c', ink: 0.91, shadowWeight: 0.55, mottle: 0.03 }, // chimney: warm limestone
  // Secondary detail: finer, lighter lines.
  trim: { lit: '#fbeddb', shade: '#cdbda9', ink: 0.56, shadowWeight: 0.7 },
  railing: { lit: '#f8eada', shade: '#d3c3af', ink: 0.54, shadowWeight: 0.5 },
  sash: { lit: '#f6e8d6', shade: '#d6c8b5', ink: 0.52 },
  door: { lit: '#a49c89', shade: '#817969', ink: 0.6 },
  // Glazing: deep muted olive-grey, no strokes.
  glass: { lit: '#727362', shade: '#55594d', ink: 0.42, shadeRange: 0.25, shadowWeight: 0, mottle: 0, castShadow: false },
  // Interiors (seen when the model is exploded or isolated): the same family, a step quieter.
  interior: { lit: '#f3e5d3', shade: '#dacdbb', ink: 0.46, shadowWeight: 0.2, poche: 0.9 },
  floor: { lit: '#d8cab8', shade: '#c4b6a3', ink: 0.47, shadowWeight: 0.2, mottle: 0.03 },
  wood: { lit: '#cdbda7', shade: '#b8a892', ink: 0.48 },
  cabinet: { lit: '#ebddca', shade: '#d1c3b0', ink: 0.44 },
  soapstone: { lit: '#86836f', shade: '#6e6c5c', ink: 0.43, shadeRange: 0.4 },
  porcelain: { lit: '#f7ecdf', shade: '#e2d6c7', ink: 0.41 },
  appliance: { lit: '#ddd3c5', shade: '#c5bbad', ink: 0.4 },
  // The ground is the backdrop: it only lays the house's soft cast shadow (see render/wash.ts FADE).
  ground: { lit: '#ffffff', shade: '#ffffff', ink: 0.3, shadeRange: 0, shadowWeight: 1.0, mottle: 0 },
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
