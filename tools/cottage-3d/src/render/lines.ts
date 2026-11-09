/**
 * Vector linework — geometry-derived ink lines.
 *
 * Each ink line comes from a real model edge (THREE.EdgesGeometry over the
 * builder pieces, before they are merged), drawn as a screen-space fat line
 * (LineSegments2 + a patched copy of the three r170 line shader). Tiers carry
 * the drafting hierarchy: primary architecture heavy, secondary detail finer,
 * hairline detail finest and faded out with distance so far views read as
 * clean massing instead of speckled moire.
 *
 * Shader patches (all verified against the pinned three 0.170.0 source):
 *  - corner overrun: the end-cap extension grows by ~2 CSS px (square caps,
 *    so the overrun stays visible instead of being clipped by round caps);
 *  - LOD fade: per-segment `instanceFeature` (inches) is projected to screen
 *    px in the vertex shader and fades the line out (smoothly, never popping);
 *    primary lines never fade;
 *  - width variation: ±10% from a world-position hash, stable while orbiting;
 *  - no tone-mapping / output-colour conversion: washes and paper are authored
 *    directly in sRGB, and the lines must match them exactly.
 */
import * as THREE from 'three';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js';
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js';
import { IN } from '../units';

export type LineTierName = 'primary' | 'secondary' | 'hairline';

export interface LineTierStyle {
  /** Line width, CSS px (multiplied by devicePixelRatio at upload). */
  widthCss: number;
  /** Base opacity; the explode controller multiplies the group fade over this. */
  opacity: number;
  /** Projected feature size (CSS px) below which the line starts fading; 0 = never fades. */
  minPx: number;
}

export const LINE_TIERS: Record<LineTierName, LineTierStyle> = {
  primary: { widthCss: 1.3, opacity: 0.85, minPx: 0 },
  secondary: { widthCss: 0.8, opacity: 0.7, minPx: 3 },
  hairline: { widthCss: 0.5, opacity: 0.55, minPx: 5 },
};

/** Tier from a wash material's ink weight (matches the material palette bands). */
export function tierForInk(ink: number): LineTierName {
  return ink >= 0.85 ? 'primary' : ink >= 0.5 ? 'secondary' : 'hairline';
}

/** Sepia ink authored in sRGB — must stay identical to render/glsl INK. */
export const INK_SRGB: [number, number, number] = [0.353, 0.263, 0.188];

function replaceOrThrow(src: string, find: string | RegExp, replace: string, what: string): string {
  if (typeof find === 'string' ? !src.includes(find) : !find.test(src)) {
    throw new Error(`[cottage-3d] line shader patch failed (${what}): pattern not found in three r170 source`);
  }
  return src.replace(find, replace);
}

const VERTEX_DECLS = /* glsl */ `
attribute float instanceFeature;
uniform float uPxScale;
uniform float uMinPx;
uniform float uOverrun;
uniform float uWidthVar;
varying float vLod;
float cottageHash(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.yzx + 33.33);
  return fract((p.x + p.y) * p.z);
}
`;

const FRAGMENT_DECLS = /* glsl */ `
varying float vLod;
`;

function patchVertexShader(src: string): string {
  let out = VERTEX_DECLS + src;
  // Corner overrun: extend the end caps past the segment ends (in the same
  // units as linewidth, i.e. 2x device px — see updateLineUniforms).
  out = replaceOrThrow(
    out,
    /if \( position\.y < 0\.0 \) \{\s+offset \+= - dir;\s+\} else if \( position\.y > 1\.0 \) \{\s+offset \+= dir;\s+\}/,
    `if ( position.y < 0.0 ) {

					offset += - dir * ( 1.0 + uOverrun / linewidth );

				} else if ( position.y > 1.0 ) {

					offset += dir * ( 1.0 + uOverrun / linewidth );

				}`,
    'endcaps',
  );
  // Width variation, stable while orbiting (world-space hash of the segment).
  out = replaceOrThrow(
    out,
    'offset *= linewidth;',
    'offset *= linewidth * ( 1.0 + uWidthVar * ( cottageHash( instanceStart * 0.37 ) * 2.0 - 1.0 ) );',
    'width',
  );
  // LOD fade: project the owning piece's feature size (inches) to screen px.
  out = replaceOrThrow(
    out,
    'gl_Position = clip;',
    `float cottageDepth = max( -0.5 * ( start.z + end.z ), 1e-3 );
			float cottagePx = instanceFeature * uPxScale / cottageDepth;
			vLod = uMinPx <= 0.0 ? 1.0 : smoothstep( uMinPx, uMinPx * 2.0, cottagePx );
			gl_Position = clip;`,
    'lod',
  );
  return out;
}

function patchFragmentShader(src: string): string {
  let out = FRAGMENT_DECLS + src;
  out = replaceOrThrow(
    out,
    'float alpha = opacity;',
    `if ( vLod <= 0.004 ) discard;
			float alpha = opacity * vLod;`,
    'alpha',
  );
  // Square caps: keep the overrun extension visible (round caps would clip it
  // back to the segment end, hiding the drafting overshoot).
  out = replaceOrThrow(
    out,
    /#else\s+if \( abs\( vUv\.y \) > 1\.0 \) \{\s+float a = vUv\.x;\s+float b = \( vUv\.y > 0\.0 \) \? vUv\.y - 1\.0 : vUv\.y \+ 1\.0;\s+float len2 = a \* a \+ b \* b;\s+if \( len2 > 1\.0 \) discard;\s+\}\s+#endif/,
    '#else\n\n				#endif',
    'caps',
  );
  // Lines are authored in sRGB like the washes — no conversion on the way out.
  out = replaceOrThrow(out, '#include <tonemapping_fragment>', '', 'tonemapping');
  out = replaceOrThrow(out, '#include <colorspace_fragment>', '', 'colorspace');
  return out;
}

/**
 * A fat-line material for one ink tier. The shader is a patched copy of
 * three's line shader (same program for every tier — only uniforms differ).
 */
export class CottageLineMaterial extends LineMaterial {
  constructor(tier: LineTierName = 'secondary') {
    super({
      color: new THREE.Color(...INK_SRGB),
      linewidth: 1,
      transparent: true,
      depthWrite: false,
    });
    this.vertexShader = patchVertexShader(this.vertexShader);
    this.fragmentShader = patchFragmentShader(this.fragmentShader);
    this.uniforms.uPxScale = { value: 1 };
    this.uniforms.uMinPx = { value: 0 };
    this.uniforms.uOverrun = { value: 0 };
    this.uniforms.uWidthVar = { value: 0.1 };
    this.userData.tier = tier;
    this.userData.baseOpacity = LINE_TIERS[tier].opacity;
    this.userData.keepTransparent = true;
    this.opacity = LINE_TIERS[tier].opacity;
  }
}

/**
 * Per-frame upload for every line material: drawing-buffer resolution, tier
 * width (CSS px × devicePixelRatio — the shader's linewidth unit is 2x device
 * px), LOD scale from the current camera, and the 2-CSS-px corner overrun.
 */
export function updateLineUniforms(
  mat: CottageLineMaterial,
  bufferWidth: number,
  bufferHeight: number,
  cameraFovDeg: number,
  dpr: number,
): void {
  // The fat-line shader's linewidth unit is resolution pixels (full width),
  // so CSS widths scale by the device pixel ratio directly.
  const tier = LINE_TIERS[mat.userData.tier as LineTierName];
  mat.resolution.set(bufferWidth, bufferHeight);
  mat.linewidth = tier.widthCss * dpr;
  const u = mat.uniforms as Record<string, THREE.IUniform>;
  (u.uPxScale as THREE.IUniform<number>).value =
    (IN * 0.5 * bufferHeight) / Math.tan(THREE.MathUtils.degToRad(cameraFovDeg / 2));
  (u.uMinPx as THREE.IUniform<number>).value = tier.minPx * dpr;
  // Corner overrun: the end-cap extension beyond half width is uOverrun/2
  // device px, i.e. 2 CSS px.
  (u.uOverrun as THREE.IUniform<number>).value = 4 * dpr;
}

export interface TierSegments {
  /** Segment endpoints, scene feet, flat xyzxyz… */
  positions: number[];
  /** Owning piece's smallest bbox dimension per segment, inches. */
  sizes: number[];
}

/**
 * Drop exactly coincident segments (same tier, endpoints equal to 0.001"):
 * stacked pieces in one batch (floor caps + sides rims, chimney slice joints
 * inside a level) would otherwise double-draw and double their overruns.
 * Only within one batch — segments that separate in the exploded view live
 * in different batches and are never merged.
 */
export function dedupeTierSegments(seg: TierSegments): void {
  const seen = new Set<string>();
  const opos: number[] = [], osizes: number[] = [];
  const q = (v: number): number => Math.round(v * 1000);
  for (let s = 0; s < seg.sizes.length; s++) {
    const ax = seg.positions[6 * s], ay = seg.positions[6 * s + 1], az = seg.positions[6 * s + 2];
    const bx = seg.positions[6 * s + 3], by = seg.positions[6 * s + 4], bz = seg.positions[6 * s + 5];
    const ka = `${q(ax)},${q(ay)},${q(az)}`, kb = `${q(bx)},${q(by)},${q(bz)}`;
    const key = ka < kb ? `${ka}|${kb}` : `${kb}|${ka}`;
    if (seen.has(key)) continue;
    seen.add(key);
    opos.push(ax, ay, az, bx, by, bz);
    osizes.push(seg.sizes[s]);
  }
  seg.positions = opos;
  seg.sizes = osizes;
}

/** Build one fat-line object for a tier (null when the tier has no segments). */
export function buildTierLines(seg: TierSegments, tier: LineTierName): LineSegments2 | null {
  if (seg.positions.length === 0) return null;
  const geo = new LineSegmentsGeometry();
  geo.setPositions(new Float32Array(seg.positions));
  geo.setAttribute('instanceFeature', new THREE.InstancedBufferAttribute(new Float32Array(seg.sizes), 1));
  const lines = new LineSegments2(geo, new CottageLineMaterial(tier));
  lines.renderOrder = 10;
  return lines;
}
