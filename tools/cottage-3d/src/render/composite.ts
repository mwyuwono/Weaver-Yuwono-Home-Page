/**
 * Composite pass: wash on paper + ink outlines.
 *
 * Paper: warm ivory with fine grain and faint mottling in SCREEN space (the sheet does not move when the model orbits),
 * a soft vignette, and wash granulation that settles into the grain like real pigment.
 *
 * Ink: edges come from the geometry buffers, not from the colour.
 *  - depth second-difference (planar slopes give 0, occlusion edges and silhouettes give a lot),
 *  - normal creases between the two sides of a pixel,
 *  - ink-weight changes (a different material).
 * Two radii give the line-weight hierarchy: a fine pass everywhere (thin, pale) and a bolder pass for silhouettes,
 * large depth steps and creases between "primary" materials (wall corners, roof edges). The sample position is shifted
 * by noise of the WORLD position and the stroke pressure varies with it, so lines look hand-drawn but stay glued to the
 * model while orbiting.
 */
import { INK, NOISE } from './glsl';

export const COMPOSITE_VERTEX = /* glsl */ `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

export const COMPOSITE_FRAGMENT = /* glsl */ `
precision highp float;
uniform sampler2D tColor, tNorm, tDepth;
uniform vec2 uRes;
uniform float uDpr, uSS, uNear, uFar;
uniform mat4 uProjInv, uCamWorld;
varying vec2 vUv;
${NOISE}

const vec3 PAPER = vec3(0.955, 0.925, 0.862);
const vec3 INK = ${INK};

float linearDepth(float d) { return 2.0 * uNear * uFar / ((uFar + uNear) - (d * 2.0 - 1.0) * (uFar - uNear)); }

struct Tap { float z; vec3 n; float w; float a; };
Tap tap(vec2 uv) {
  vec4 g = texture2D(tNorm, uv);
  Tap t;
  t.a = g.a;
  float k = 1.0 / max(g.a, 1e-3); // un-premultiply (fading levels are blended)
  vec2 xy = clamp(g.xy * k, 0.0, 1.0) * 2.0 - 1.0;
  t.n = vec3(xy, sqrt(max(0.0, 1.0 - dot(xy, xy))));
  t.w = g.b * k;
  t.z = linearDepth(texture2D(tDepth, uv).r);
  return t;
}

/** x: depth second difference (relative), y: normal crease, z: ink-weight change, w: crease between primary materials; cover: opacity found. */
vec4 edges(vec2 uv, float r, out float cover) {
  const vec2 DIRS[4] = vec2[4](vec2(1.0, 0.0), vec2(0.0, 1.0), vec2(0.7071, 0.7071), vec2(0.7071, -0.7071));
  Tap c = tap(uv);
  vec4 e = vec4(0.0);
  cover = c.a;
  for (int i = 0; i < 4; i++) {
    vec2 d = DIRS[i] * r / uRes;
    Tap a = tap(uv + d), b = tap(uv - d);
    cover = max(cover, max(a.a, b.a));
    // Terrain against terrain is never inked: grade breaks and ramps are suggested by the wash, not drawn as stray lines.
    if (min(c.a, min(a.a, b.a)) > 0.02 && max(c.w, max(a.w, b.w)) < 0.35) continue; // (alpha test is loose: a fading ground must not flicker in and out of this rule)
    e.x = max(e.x, min(abs(a.z + b.z - 2.0 * c.z) / c.z, 1.0));
    if (a.a > 0.5 && b.a > 0.5 && abs(a.z - b.z) < 0.04 * c.z) {
      float crease = 1.0 - dot(a.n, b.n);
      float dw = abs(a.w - b.w);
      // A real edge has both of its sides running on for a pixel more. A one-pixel sliver (an end face lying edge-on inside a joint,
      // tying in depth with the surface beside it) does not: one tap further out we are back on the surface's own value, so it
      // is not an edge. Without this, every coincident-face joint in the model is inked as a dotted line.
      if (crease > 0.1 || dw > 0.02) {
        vec2 step1 = 3.0 * DIRS[i] / uRes;
        Tap a2 = tap(uv + d + step1), b2 = tap(uv - d - step1); // three internal pixels further out (~1.5 canvas px at 2x supersampling)
        float persistN = smoothstep(0.85, 0.97, min(dot(a.n, a2.n), dot(b.n, b2.n)));
        float persistW = 1.0 - smoothstep(0.02, 0.06, max(abs(a.w - a2.w), abs(b.w - b2.w)));
        crease *= persistN;
        dw *= persistW;
      }
      e.y = max(e.y, crease);
      e.z = max(e.z, dw);
      e.w = max(e.w, crease * smoothstep(0.8, 0.9, min(a.w, b.w)));
    }
  }
  return e;
}

void main() {
  vec2 uv = vUv;
  vec4 colour = texture2D(tColor, uv);
  vec3 wash = colour.rgb + (1.0 - colour.a); // pigment multiplier over bare paper
  float depth = texture2D(tDepth, uv).r;
  float cover = 0.0;

  // world position of this pixel, for stable noise
  vec4 v = uProjInv * vec4(uv * 2.0 - 1.0, depth * 2.0 - 1.0, 1.0);
  vec3 wp = (uCamWorld * vec4(v.xyz / v.w, 1.0)).xyz;
  vec2 css = gl_FragCoord.xy / uDpr;

  // hand wobble: shift the sampling point by up to ~0.2 css px
  vec2 wob = (vec2(vnoise(wp * 2.3), vnoise(wp * 2.3 + 9.0)) - 0.5) * 0.45 * uDpr / uRes;
  float c1, c2;
  vec4 fine = edges(uv + wob, 0.5 * uDpr, c1);
  vec4 bold = edges(uv + wob, 0.95 * uDpr, c2);

  float pressure = 0.72 + 0.28 * vnoise(wp * 0.45);
  float dry = 0.8 + 0.2 * smoothstep(0.1, 0.45, vnoise(wp * 1.3 + 5.0)); // gentle pressure variation; a skipping pen reads as dotted shimmer
  float thin = max(max(smoothstep(0.012, 0.055, fine.x), smoothstep(0.10, 0.35, fine.y)), smoothstep(0.02, 0.06, fine.z)) * dry;
  float thick = max(smoothstep(0.03, 0.10, bold.x), 0.6 * smoothstep(0.12, 0.40, bold.w)); // creases a touch lighter than silhouettes
  float lineA = max(thin * 0.5, thick * 0.78) * pressure * smoothstep(0.35, 0.9, max(c1, c2));

  // pigment pools along the edges of a wash
  #ifndef LITE
  float pcover;
  vec4 wide = edges(uv, 2.6 * uDpr, pcover);
  float pool = max(smoothstep(0.01, 0.06, wide.x), smoothstep(0.15, 0.5, wide.y)) * texture2D(tNorm, uv).a;
  wash *= 1.0 - 0.06 * pool;
  #endif

  // paper: grain (screen space, fixed), mottling and granulation
  float grain = 0.55 * vnoise2(css * 1.1) + 0.3 * vnoise2(css * 2.7 + 11.0) + 0.15 * hash12(floor(gl_FragCoord.xy / uSS));
  float mottle = vnoise2(css * 0.006 + 3.0) * 0.6 + vnoise2(css * 0.02) * 0.4;
  vec3 paper = PAPER * (1.0 + (grain - 0.5) * 0.016 + (mottle - 0.5) * 0.04);
  wash = 1.0 - (1.0 - wash) * (0.93 + 0.14 * grain);

  vec3 col = paper * wash;
  col = mix(col, INK * (0.9 + 0.2 * grain), clamp(lineA, 0.0, 1.0));

  vec2 q = (uv - 0.5) * vec2(1.0, 0.92);
  col *= 1.0 - 0.07 * smoothstep(0.3, 0.85, length(q));
  gl_FragColor = vec4(col, 1.0);
}
`;
