/**
 * Renderer factory. Colour is composed by render/Pipeline (no tone mapping, no output conversion), so the renderer
 * itself is plain: blurred (variance) shadow map for a soft ground shadow, DPR between 1.5 and 2 (the ink pass needs the pixels; a
 * 1x screen is supersampled and smoothed by the browser).
 */
import * as THREE from 'three';

/** `qa` (dev elevations): plain antialiased canvas at the device pixel ratio, since the QA view draws straight to it. */
export function createRenderer(container: HTMLElement, qa = false): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer({ antialias: qa, powerPreference: 'high-performance' });
  renderer.setPixelRatio(qa ? Math.min(window.devicePixelRatio, 2) : Math.min(Math.max(window.devicePixelRatio, 1.5), 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.VSMShadowMap;
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.setAttribute('role', 'img');
  renderer.domElement.setAttribute('aria-label', 'Hand-drafted 3D model of the Connecticut Cottage. Drag to orbit, scroll to zoom.');
  container.appendChild(renderer.domElement);
  return renderer;
}
