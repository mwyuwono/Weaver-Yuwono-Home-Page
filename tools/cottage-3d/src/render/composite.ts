/**
 * Paper pass: the model's washes are laid over a deep lichen-olive ground (a soft
 * radial gradient), with fine grain, faint mottling and wash granulation that
 * settles into the grain like real pigment. The scene pass writes coverage in
 * alpha, so the ground shows wherever nothing was drawn.
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

// Deep lichen-olive ground (warm green-grey, no brown): #5B6252 light (centre) -> #4E5546 base -> #454B3E dark (edges).
const vec3 BG_LIGHT = vec3(0.357, 0.384, 0.322);
const vec3 BG_BASE = vec3(0.306, 0.333, 0.275);
const vec3 BG_DARK = vec3(0.271, 0.294, 0.243);

void main() {
  vec2 uv = vUv;
  vec4 drawn = texture2D(tWash, uv); // the model's colours; alpha = coverage (0 where only the backdrop shows)
  vec3 wash = drawn.rgb;
  vec2 css = gl_FragCoord.xy / uDpr;

  // paper: grain (screen space, fixed), mottling and granulation
  float grain = 0.55 * vnoise2(css * 1.1) + 0.3 * vnoise2(css * 2.7 + 11.0) + 0.15 * hash12(floor(gl_FragCoord.xy));
  float mottle = vnoise2(css * 0.006 + 3.0) * 0.6 + vnoise2(css * 0.02) * 0.4;
  float tooth = 1.0 + (grain - 0.5) * 0.016 + (mottle - 0.5) * 0.03;
  wash = 1.0 - (1.0 - wash) * (0.93 + 0.14 * grain);

  vec2 q = (uv - 0.5) * vec2(1.0, 0.92);
  float r = length(q);
  vec3 bg = mix(BG_LIGHT, BG_BASE, smoothstep(0.0, 0.55, r));
  bg = mix(bg, BG_DARK, smoothstep(0.5, 0.9, r));

  vec3 col = mix(bg, wash, drawn.a) * tooth;
  col *= 1.0 - 0.03 * smoothstep(0.35, 0.85, r) * drawn.a;
  gl_FragColor = vec4(col, 1.0);
}
`;
