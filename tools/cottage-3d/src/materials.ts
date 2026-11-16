/**
 * Shared material palette — created once, reused by every builder.
 *
 * Every material is a watercolour wash (see render/wash.ts): an earthy warm set of absolute colours (laid over the
 * olive ground by the paper pass), plus an ink-weight class that drives the outline hierarchy.
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
  // Earthy, warm, not brown: limewash and bone surfaces, lead-grey roof, pale stone masonry, sage door and deep olive
  // glazing, on a lichen-olive ground (render/composite.ts). Warmth comes from yellow-green undertones, never from
  // orange/tan hues. Colours are absolute (lit = sun side, shade = turned away); contrast from value and the line.
  // Primary architecture (ink >= 0.85): heavier outlines.
  siding: { lit: '#f6f2e9', shade: '#d9d4c6', ink: 1.0, detail: 'clapboard', shadowWeight: 0.7, poche: 0.9 },
  roof: { lit: '#a9ab9d', shade: '#96988a', ink: 0.98, shadowWeight: 0.55, mottle: 0.04, detail: 'seams', period: 31.25 / 12 },
  concrete: { lit: '#b9b6a8', shade: '#a3a093', ink: 0.93, poche: 0.5 }, // foundation, steps, retaining walls
  brick: { lit: '#d2cdbf', shade: '#b8b3a5', ink: 0.91, shadowWeight: 0.55, mottle: 0.03 }, // chimney: pale stone
  // Secondary detail: finer, lighter lines.
  trim: { lit: '#f9f6ee', shade: '#d3cec0', ink: 0.56, shadowWeight: 0.7 },
  railing: { lit: '#f6f3ea', shade: '#d4cfc1', ink: 0.54, shadowWeight: 0.5 },
  sash: { lit: '#f3efe5', shade: '#d4cfc1', ink: 0.52 },
  door: { lit: '#8f9884', shade: '#737d6b', ink: 0.6 }, // muted sage
  // Glazing: deep olive, no strokes.
  glass: { lit: '#5f6656', shade: '#4a5045', ink: 0.42, shadeRange: 0.25, shadowWeight: 0, mottle: 0, castShadow: false },
  // Interiors (seen when the model is exploded or isolated): the same family, a step quieter.
  interior: { lit: '#f1ede3', shade: '#d8d3c5', ink: 0.46, shadowWeight: 0.2, poche: 0.9 },
  floor: { lit: '#d5d1c2', shade: '#c2beaf', ink: 0.47, shadowWeight: 0.2, mottle: 0.03 },
  wood: { lit: '#cbc7b6', shade: '#b6b2a2', ink: 0.48 },
  cabinet: { lit: '#e8e5da', shade: '#cfcbbe', ink: 0.44 },
  soapstone: { lit: '#727869', shade: '#5e6457', ink: 0.43, shadeRange: 0.4 },
  porcelain: { lit: '#f6f3ec', shade: '#e0dcd0', ink: 0.41 },
  appliance: { lit: '#d9d7cd', shade: '#c3c1b6', ink: 0.4 },
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
