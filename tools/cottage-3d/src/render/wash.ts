/**
 * WashMaterial — replaces every PBR material with a watercolour "wash".
 *
 * It is a MeshLambertMaterial (so the sun's shadow map is available) whose fragment stage is rewritten:
 *  - colour is a pigment MULTIPLIER on the paper (1 = bare paper), mixed lit -> shade by a softly quantised sun term,
 *    with low-frequency pigment-density noise in WORLD space so it never swims while orbiting;
 *  - cast shadows only tint the result (weighted per material), they are never drawn as CG shadow;
 *  - edges are NOT drawn here: geometry-derived vector linework (render/lines.ts) draws the ink in the same pass;
 *  - flat washes only: no hatching or stroke textures. The exceptions are a fine clapboard hairline on siding and standing-seam hairlines on roofs, analytically
 *    antialiased in world space and faded out completely before they could moire (sub-pixel geometry would break up into dotted lines).
 * Everything works in sRGB "painting space"; nothing is tone mapped. Explode
 * fades work through the regular material opacity (transparent during tweens).
 */
import * as THREE from 'three';
import { NOISE } from './glsl';

export type Detail = 'none' | 'clapboard' | 'seams';

export interface WashSpec {
  /** Pigment multiplier where the surface faces the sun / turns away, hex sRGB. */
  lit: string;
  shade: string;
  /** Line-weight class 0..1 (>= 0.85 = primary architecture: heavier, darker outlines). Unique per material so ink separates materials. */
  ink: number;
  detail?: Detail;
  /** 0..1: how strongly the sun term darkens the surface (default 0.8). */
  shadeRange?: number;
  /** 0..1: how strongly cast shadows tint the surface (default 0.3). */
  shadowWeight?: number;
  /** Pigment-density mottling amplitude (default 0.08). */
  mottle?: number;
  /** Section-cut darkening of upward faces (wall tops), as in a poché. */
  poche?: number;
  /** Period of the 'seams' detail, feet (along the horizontal axis across the fall line). */
  period?: number;
  /** False for glass: it never casts a shadow. */
  castShadow?: boolean;
}

/** Direction towards the sun, shared by every wash (set by addLights). */
export const sunDirection = { value: new THREE.Vector3(0, 1, 0) };

const hex = (h: string): THREE.Vector3 => {
  const c = parseInt(h.slice(1), 16);
  return new THREE.Vector3((c >> 16) / 255, ((c >> 8) & 255) / 255, (c & 255) / 255);
};

const DEFAULT: WashSpec = { lit: '#ffffff', shade: '#cccccc', ink: 0.5 };

/** Ground fade towards the paper (in pigment): [centre x, centre z, start, end] in scene feet. */
export type GroundFade = [number, number, number, number];

export class WashMaterial extends THREE.MeshLambertMaterial {
  spec: WashSpec;
  /** Set on the terrain only; fades it to bare paper with distance. */
  fade: GroundFade | null = null;

  constructor(spec: WashSpec = DEFAULT) {
    super({ color: 0xffffff });
    this.spec = spec;
    // Vector linework draws at the exact surface depth; bias faces back so
    // coplanar lines win the depth test (occluded lines still lose it).
    this.polygonOffset = true;
    this.polygonOffsetFactor = 1;
    this.polygonOffsetUnits = 1;
    this.onBeforeCompile = (shader) => this.compile(shader);
  }

  get castsShadow(): boolean {
    return this.spec.castShadow !== false;
  }

  override copy(source: this): this {
    super.copy(source);
    this.spec = source.spec;
    this.fade = source.fade;
    return this;
  }

  /** Programs differ by detail kind and ground fade only; every other parameter is a uniform. */
  override customProgramCacheKey(): string {
    return `wash-${this.spec.detail ?? 'none'}-${this.fade ? 'fade' : ''}`;
  }

  private compile(shader: THREE.WebGLProgramParametersWithUniforms): void {
    const s = this.spec;
    Object.assign(shader.uniforms, {
      uLit: { value: hex(s.lit) },
      uShade: { value: hex(s.shade) },
      uInk: { value: s.ink },
      uParams: { value: new THREE.Vector4(s.shadeRange ?? 0.8, s.shadowWeight ?? 0.3, s.mottle ?? 0.05, s.period ?? 1) },
      uPoche: { value: s.poche ?? 0 },
      uFade: { value: new THREE.Vector4(...(this.fade ?? [0, 0, 1e5, 1e5])) },
      uSunDir: sunDirection,
    });
    const defines = `#define DETAIL_${(s.detail ?? 'none').toUpperCase()}\n${this.fade ? '#define FADE\n' : ''}`;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vWPos;')
      .replace('#include <project_vertex>', '#include <project_vertex>\nvWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    shader.fragmentShader = defines + shader.fragmentShader
      .replace('#include <common>', `#include <common>\n${FRAGMENT_PARS}`)
      .replace('#include <opaque_fragment>', FRAGMENT_MAIN)
      // everything after the colour is ours: no tone mapping, colour-space conversion or fog
      .replace('#include <tonemapping_fragment>', '')
      .replace('#include <colorspace_fragment>', '')
      .replace('#include <fog_fragment>', '')
      .replace('#include <premultiplied_alpha_fragment>', '')
      .replace('#include <dithering_fragment>', '');
  }
}

const FRAGMENT_PARS = /* glsl */ `
varying vec3 vWPos;
uniform vec3 uLit, uShade, uSunDir;
uniform float uInk, uPoche;
uniform vec4 uParams; // x shade range, y shadow weight, z mottle, w seam period (ft)
uniform vec4 uFade;   // ground fade: centre xz, start, end
${NOISE}
const vec3 INK_MUL = vec3(0.55, 0.47, 0.40); // a hairline darkens the wash towards sepia

/** Anti-aliased line through every integer of x, w = width as a fraction of the period. */
float stripe(float x, float w) {
  float fw = fwidth(x);
  float d = abs(fract(x + 0.5) - 0.5);
  return 1.0 - smoothstep(w * 0.5 - fw * 0.75, w * 0.5 + fw * 0.75, d);
}
/** 1 while the period of x is wide enough on screen to draw, fading out before it turns to moire. */
float legible(float x) { return smoothstep(2.4, 5.0, 1.0 / max(fwidth(x), 1e-5)); }

/** Coordinates in the plane of the face (dominant normal axis), feet. */
vec2 planeUV(vec3 p, vec3 n) {
  vec3 a = abs(n);
  return (a.x >= a.y && a.x >= a.z) ? p.zy : (a.z >= a.y ? p.xy : p.xz);
}

`;

const FRAGMENT_MAIN = /* glsl */ `
{
  vec3 wn = normalize(inverseTransformDirection(normal, viewMatrix));
  vec3 p = vWPos;
  float ndl = dot(wn, uSunDir);
  // The sun is a PI-intensity light on a white material, so directDiffuse is max(N.L, 0) * shadow.
  float shadow = ndl > 0.04 ? clamp(reflectedLight.directDiffuse.r / ndl, 0.0, 1.0) : 1.0;
  float facing = clamp(ndl, 0.0, 1.0);
  float t3 = facing * 3.0;
  float banded = min((floor(t3) + smoothstep(0.3, 0.7, fract(t3))) / 3.0, 1.0); // three soft bands
  float tone = (1.0 - mix(facing, banded, 0.6)) * uParams.x;
  float spill = (1.0 - smoothstep(0.2, 0.8, shadow)) * uParams.y;
  float dark = 1.0 - (1.0 - tone) * (1.0 - spill);

  vec3 col = mix(uLit, uShade, dark);
  col = 1.0 - (1.0 - col) * (1.0 + (fbm(p * 0.3) - 0.5) * uParams.z * 2.0); // pigment density
  float line = 0.0; // hairline opacity

  #ifdef DETAIL_CLAPBOARD
  if (abs(wn.y) < 0.5) {
    // 4.5" laps as one fine, even hairline; fades out completely well before the laps get close enough to moire
    float c = p.y / 0.375;
    line = stripe(c, 0.05) * smoothstep(5.0, 11.0, 1.0 / max(fwidth(c), 1e-5)) * 0.2;
  }
  #endif

  #ifdef DETAIL_SEAMS
  if (wn.y > 0.78 && wn.y < 0.9995) {
    // Standing seams run down the fall line: t counts seam periods across it. Ridge caps and rake edges are steeper than this.
    vec2 h = normalize(wn.xz);
    float t = dot(p.xz, vec2(-h.y, h.x)) / uParams.w;
    line = stripe(t, 0.03) * smoothstep(7.0, 16.0, 1.0 / max(fwidth(t), 1e-5)) * 0.34;
  }
  #endif

  col = mix(col, col * INK_MUL, line);
  if (uPoche > 0.0 && wn.y > 0.85) { // wall cut by the section plane
    col = mix(col, vec3(0.66, 0.6, 0.53), uPoche);
  }

  float a = diffuseColor.a;
  #ifdef FADE
  float away = smoothstep(uFade.z, uFade.w, distance(p.xz, uFade.xy));
  col = mix(col, vec3(1.0), away); // fade in pigment, not alpha: the ground stays opaque
  #endif
  gl_FragColor = vec4(col, a);
}
`;
