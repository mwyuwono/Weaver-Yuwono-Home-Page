/**
 * Paper pass: the wash (a pigment multiplier over bare paper) is laid on the
 * paper, with fine grain, faint mottling, wash granulation that settles into
 * the grain like real pigment, and a soft vignette.
 *
 * Ink is NOT drawn here: geometry-derived vector linework (render/lines.ts)
 * already draws the outlines in the main pass, so this shader never does
 * edge detection, pigment pooling, sliver rejection or supersampled tent
 * filtering. Paper grain is fixed in SCREEN space (the sheet does not move
 * when the model orbits).
 */
import { NOISE } from './glsl';

export const PAPER_VERTEX = /* glsl */ `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

export const PAPER_FRAGMENT = /* glsl */ `
precision highp float;
uniform sampler2D tWash;
uniform float uDpr;
varying vec2 vUv;
${NOISE}

const vec3 PAPER = vec3(0.955, 0.925, 0.862);

void main() {
  vec2 uv = vUv;
  vec3 wash = texture2D(tWash, uv).rgb; // pigment multiplier over bare paper
  vec2 css = gl_FragCoord.xy / uDpr;

  // paper: grain (screen space, fixed), mottling and granulation
  float grain = 0.55 * vnoise2(css * 1.1) + 0.3 * vnoise2(css * 2.7 + 11.0) + 0.15 * hash12(floor(gl_FragCoord.xy));
  float mottle = vnoise2(css * 0.006 + 3.0) * 0.6 + vnoise2(css * 0.02) * 0.4;
  vec3 paper = PAPER * (1.0 + (grain - 0.5) * 0.016 + (mottle - 0.5) * 0.04);
  wash = 1.0 - (1.0 - wash) * (0.93 + 0.14 * grain);

  vec3 col = paper * wash;

  vec2 q = (uv - 0.5) * vec2(1.0, 0.92);
  col *= 1.0 - 0.07 * smoothstep(0.3, 0.85, length(q));
  gl_FragColor = vec4(col, 1.0);
}
`;
