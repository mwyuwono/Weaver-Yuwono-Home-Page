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
 *  - corner overrun: the end-cap extension grows by the tier's overrunCss (square caps,
 *    so the overrun stays visible instead of being clipped by round caps);
 *  - LOD fade: per-segment `instanceFeature` (inches) is projected to screen
 *    px in the vertex shader and fades the line out (smoothly, never popping);
 *    tiny edges fade on every tier (an edge's own length caps its feature size);
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
  /** Corner overrun past each segment end, CSS px (drafting overshoot; only on primary outlines, or T-joints read as crosses). */
  overrunCss: number;
}

/**
 * Shared line state written by the explode controller: 0 while every floor sits assembled, 1 once floors separate.
 * "Join" lines (where one level's surface meets the next flush) are multiplied by it.
 */
export const lineState = { separate: 0 };

export const LINE_TIERS: Record<LineTierName, LineTierStyle> = {
  primary: { widthCss: 1.1, opacity: 0.8, minPx: 1.5, overrunCss: 0 },
  secondary: { widthCss: 0.75, opacity: 0.66, minPx: 3, overrunCss: 0 },
  hairline: { widthCss: 0.5, opacity: 0.5, minPx: 5, overrunCss: 0 },
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
attribute float instanceJoin;
uniform float uSeparate;
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
			vLod = ( uMinPx <= 0.0 ? 1.0 : smoothstep( uMinPx, uMinPx * 2.0, cottagePx ) ) * mix( 1.0, uSeparate, instanceJoin );
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
      // Ink is premixed with bare paper (white in the wash target, which the paper pass multiplies) and drawn at full
      // opacity: where segments meet at a corner they no longer double-blend into a dark knot. Alpha is only used for fades.
      color: new THREE.Color(...INK_SRGB.map((c) => 1 - (1 - c) * LINE_TIERS[tier].opacity) as [number, number, number]),
      linewidth: 1,
      transparent: true,
      depthWrite: false,
    });
    this.vertexShader = patchVertexShader(this.vertexShader);
    this.fragmentShader = patchFragmentShader(this.fragmentShader);
    this.uniforms.uPxScale = { value: 1 };
    this.uniforms.uSeparate = { value: 0 };
    this.uniforms.uMinPx = { value: 0 };
    this.uniforms.uOverrun = { value: 0 };
    this.uniforms.uWidthVar = { value: 0.1 };
    this.userData.tier = tier;
    this.userData.baseOpacity = 1;
    this.userData.keepTransparent = true;
    this.opacity = 1;
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
  // Corner overrun: the end-cap extension beyond half width is uOverrun/2 device px, i.e. overrunCss CSS px.
  (u.uOverrun as THREE.IUniform<number>).value = 2 * tier.overrunCss * dpr;
  (u.uSeparate as THREE.IUniform<number>).value = lineState.separate;
}

export interface TierSegments {
  /** Segment endpoints, scene feet, flat xyzxyz… */
  positions: number[];
  /** Owning piece's smallest bbox dimension per segment, inches. */
  sizes: number[];
  /** 1 where the segment is a join between levels (hidden while assembled), else 0. */
  joins: number[];
}

/**
 * Merge collinear segments that touch or overlap (same tier, same join state) into single segments, and drop
 * duplicates. A long edge assembled from many pieces would otherwise draw as many segments whose caps overlap and
 * double-blend into dots along the line. The kept feature size is the largest of the merged pieces.
 */
export function dedupeTierSegments(seg: TierSegments): void {
  type Item = { t0: number; t1: number; size: number };
  const lines = new Map<string, { o: number[]; d: number[]; items: Item[] }>();
  const n = seg.sizes.length;
  for (let s = 0; s < n; s++) {
    let a = seg.positions.slice(6 * s, 6 * s + 3), b = seg.positions.slice(6 * s + 3, 6 * s + 6);
    let d = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
    const l = Math.hypot(d[0], d[1], d[2]);
    if (l < 1e-6) continue;
    d = d.map((v) => v / l);
    // canonical direction: first significant component positive
    const k = Math.abs(d[0]) > 1e-6 ? 0 : Math.abs(d[1]) > 1e-6 ? 1 : 2;
    if (d[k] < 0) { d = d.map((v) => -v); [a, b] = [b, a]; }
    // closest point of the infinite line to the origin
    const ta = a[0] * d[0] + a[1] * d[1] + a[2] * d[2];
    const o = [a[0] - d[0] * ta, a[1] - d[1] * ta, a[2] - d[2] * ta];
    const qd = (v: number): number => Math.round(v * 2000); // direction, ~0.03°
    const qo = (v: number): number => Math.round(v * 400); // offset, ~0.03" (scene feet)
    const key = `${seg.joins[s]}|${qd(d[0])},${qd(d[1])},${qd(d[2])}|${qo(o[0])},${qo(o[1])},${qo(o[2])}`;
    let line = lines.get(key);
    if (!line) { line = { o, d, items: [] }; lines.set(key, line); }
    line.items.push({ t0: ta, t1: ta + l, size: seg.sizes[s] });
  }
  const opos: number[] = [], osizes: number[] = [], ojoins: number[] = [];
  const TOUCH = 0.002; // feet
  for (const [key, line] of lines) {
    const join = Number(key.split('|')[0]);
    line.items.sort((x, y) => x.t0 - y.t0);
    let cur: Item | null = null;
    const flush = (it: Item): void => {
      const { o, d } = line;
      opos.push(o[0] + d[0] * it.t0, o[1] + d[1] * it.t0, o[2] + d[2] * it.t0, o[0] + d[0] * it.t1, o[1] + d[1] * it.t1, o[2] + d[2] * it.t1);
      osizes.push(it.size);
      ojoins.push(join);
    };
    for (const it of line.items) {
      if (cur && it.t0 <= cur.t1 + TOUCH) { cur.t1 = Math.max(cur.t1, it.t1); cur.size = Math.max(cur.size, it.size); }
      else { if (cur) flush(cur); cur = { ...it }; }
    }
    if (cur) flush(cur);
  }
  seg.positions = opos;
  seg.sizes = osizes;
  seg.joins = ojoins;
}

/** Build one fat-line object for a tier (null when the tier has no segments). */
export function buildTierLines(seg: TierSegments, tier: LineTierName): LineSegments2 | null {
  if (seg.positions.length === 0) return null;
  const geo = new LineSegmentsGeometry();
  geo.setPositions(new Float32Array(seg.positions));
  geo.setAttribute('instanceFeature', new THREE.InstancedBufferAttribute(new Float32Array(seg.sizes), 1));
  geo.setAttribute('instanceJoin', new THREE.InstancedBufferAttribute(new Float32Array(seg.joins), 1));
  const lines = new LineSegments2(geo, new CottageLineMaterial(tier));
  lines.renderOrder = 10;
  return lines;
}
