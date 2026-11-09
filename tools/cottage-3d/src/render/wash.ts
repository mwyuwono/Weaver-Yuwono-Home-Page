/**
 * WashMaterial — replaces every PBR material with a watercolour "wash".
 *
 * It is a MeshLambertMaterial (so the sun's shadow map is available) whose fragment stage is rewritten:
 *  - colour is a pigment MULTIPLIER on the paper (1 = bare paper), mixed lit -> shade by a softly quantised sun term,
 *    with low-frequency pigment-density noise in WORLD space so it never swims while orbiting;
 *  - cast shadows only tint the result (weighted per material), they are never drawn as CG shadow;
 *  - selective drafting detail per material (clapboard, brick coursing, glass strokes ...) and diagonal hatching in the
 *    shade, all procedural in world space and faded by screen-space derivatives so thin lines never alias;
 *  - a second render target receives view normal.xy, the material's ink weight and opacity for the ink pass (Pipeline.ts).
 * Everything works in sRGB "painting space"; nothing is tone mapped.
 */
import * as THREE from 'three';
import { NOISE } from './glsl';

export type Detail = 'none' | 'clapboard' | 'brick' | 'glass' | 'ground' | 'floor' | 'stipple';

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
  /** Hatching opacity in shaded areas (default 0.5). */
  hatch?: number;
  /** Section-cut darkening of upward faces (wall tops), as in a poché. */
  poche?: number;
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
      uParams: { value: new THREE.Vector4(s.shadeRange ?? 0.8, s.shadowWeight ?? 0.3, s.mottle ?? 0.08, s.hatch ?? 0.5) },
      uPoche: { value: s.poche ?? 0 },
      uFade: { value: new THREE.Vector4(...(this.fade ?? [0, 0, 1e5, 1e5])) },
      uSunDir: sunDirection,
    });
    const defines = `#define DETAIL_${(s.detail ?? 'none').toUpperCase()}\n${this.fade ? '#define FADE\n' : ''}`;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vWPos;')
      .replace('#include <project_vertex>', '#include <project_vertex>\nvWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    shader.fragmentShader = defines + shader.fragmentShader
      .replace('#include <common>', `#include <common>\nlayout(location = 1) out highp vec4 gNormal;\n${FRAGMENT_PARS}`)
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
uniform vec4 uParams; // x shade range, y shadow weight, z mottle, w hatch
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

/** Diagonal pen hatching that thickens into cross-hatching in deep shade. */
float hatching(vec3 p, vec3 n, float dark) {
  vec2 uv = planeUV(p, n);
  float wobble = (vnoise2(uv * 3.0) - 0.5) * 0.12;
  float h1 = (uv.x - uv.y) / 0.26 + wobble;
  float h2 = (uv.x + uv.y) / 0.26 + wobble;
  float a = stripe(h1, 0.10) * legible(h1) * smoothstep(0.38, 0.8, dark);
  float b = stripe(h2, 0.08) * legible(h2) * smoothstep(0.78, 0.98, dark);
  return max(a * 0.38, b * 0.3);
}

float segment(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a, ba = b - a;
  return length(pa - ba * clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0));
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
    float c = p.y / 0.375; // 4.5" laps
    float pick = smoothstep(0.30, 0.65, fbm(p * 0.22 + 3.0)); // the draughtsman draws laps only in places
    line = stripe(c, 0.07) * legible(c) * (0.18 + 0.4 * pick + 0.25 * dark);
  }
  #endif
  #ifdef DETAIL_BRICK
  if (abs(wn.y) < 0.5) {
    vec2 uv = planeUV(p, wn);
    float row = floor(uv.y / 0.2222);
    float bu = uv.x / 0.6667 + 0.5 * mod(row, 2.0);
    float brick = hash12(vec2(floor(bu), row));
    float pick = smoothstep(0.25, 0.6, fbm(p * 0.35 + 5.0));
    float rows = stripe(uv.y / 0.2222, 0.08) * legible(uv.y / 0.2222) * (0.25 + 0.4 * pick);
    float joints = stripe(bu, 0.06) * legible(bu * 3.0) * step(0.45, brick) * (0.15 + 0.4 * pick);
    line = max(rows, joints);
    col *= 0.95 + 0.07 * brick; // each brick a touch different
  }
  #endif
  #ifdef DETAIL_GLASS
  {
    float d = dot(p, vec3(0.9, 1.1, 0.8)) * 1.7;
    float s = fract(d);
    float strokes = smoothstep(0.34, 0.36, s) * (1.0 - smoothstep(0.40, 0.42, s)) + smoothstep(0.56, 0.57, s) * (1.0 - smoothstep(0.585, 0.595, s));
    col = mix(col, vec3(0.93, 0.9, 0.85), strokes * 0.6 * legible(d));
  }
  #endif
  #ifdef DETAIL_FLOOR
  if (wn.y > 0.8) {
    float b = p.z / 0.4167; // 5" boards
    line = stripe(b, 0.06) * legible(b) * 0.3;
  }
  #endif
  #ifdef DETAIL_STIPPLE
  {
    vec2 uv = planeUV(p, wn) / 0.09;
    float speck = step(0.86, hash12(floor(uv))) * (1.0 - smoothstep(0.2, 0.34, length(fract(uv) - 0.5)));
    line = speck * legible(uv.x) * (0.1 + 0.5 * dark);
  }
  #endif
  #ifdef DETAIL_GROUND
  {
    float near = 1.0 - smoothstep(8.0, 30.0, distance(p.xz, uFade.xy));
    float contour = stripe(p.y / 1.0, 0.03) * legible(p.y) * 0.15 * near; // fine contour lines
    vec2 cell = floor(p.xz / 1.6);
    float tufts = 0.0;
    for (int i = 0; i < 3; i++) { // short pen strokes standing for grass, clustered in sparse tufts
      vec2 h = vec2(hash12(cell + float(i) * 7.1), hash12(cell + float(i) * 3.7 + 1.0));
      vec2 a = (cell + 0.15 + 0.7 * h) * 1.6;
      vec2 b = a + vec2(0.07 * (h.y - 0.5), 0.55 * (0.5 + h.x));
      float w = 0.014;
      float px = fwidth(p.x) + fwidth(p.z);
      tufts += (1.0 - smoothstep(w, w + px, segment(p.xz, a, b))) * step(0.62, hash12(cell + 9.0)) * step(h.x, 0.8);
    }
    line = max(contour, min(tufts, 1.0) * 0.32 * near * near);
  }
  #endif

  line = max(line, hatching(p, wn, dark) * uParams.w * 2.0);
  col = mix(col, col * INK_MUL, line);
  if (uPoche > 0.0 && wn.y > 0.85) { // wall cut by the section plane
    float c = (p.x + p.z) / 0.11;
    col = mix(col, vec3(0.66, 0.6, 0.53), uPoche);
    col = mix(col, col * INK_MUL, stripe(c, 0.12) * legible(c) * 0.35 * uPoche);
  }

  float a = diffuseColor.a;
  float cover = a; // what the ink pass sees
  #ifdef FADE
  float away = smoothstep(uFade.z, uFade.w, distance(p.xz, uFade.xy));
  col = mix(col, vec3(1.0), away); // fade in pigment, not alpha: the ground stays opaque
  cover *= 1.0 - away;
  #endif
  gl_FragColor = vec4(col, a);
  gNormal = vec4(normal.xy * 0.5 + 0.5, uInk, cover);
}
`;
