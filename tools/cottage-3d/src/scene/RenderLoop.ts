/**
 * Render-on-demand loop. Frames are only produced while something changes:
 * a tween is running, the controls are moving/damping, or a caller invalidated
 * the view (resize, state change). The loop sleeps when the canvas is
 * off-screen or the tab is hidden, and wakes itself on return.
 */
import * as THREE from 'three';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { TweenSet } from '../anim/tween';

export class RenderLoop {
  private raf = 0;
  private dirty = true;
  private onScreen = true;
  private frames = 0;
  /** Fired after the first frame has been drawn (loading overlay, diagnostics). */
  onFirstFrame: (() => void) | null = null;

  constructor(
    private readonly renderer: THREE.WebGLRenderer,
    private readonly scene: THREE.Scene,
    private readonly camera: THREE.PerspectiveCamera,
    private readonly controls: OrbitControls,
    private readonly tweens: TweenSet,
  ) {
    controls.addEventListener('change', () => this.invalidate());
    controls.addEventListener('start', () => this.invalidate());
    tweens.onStart = () => this.invalidate();
    document.addEventListener('visibilitychange', () => this.invalidate());
    new IntersectionObserver((entries) => {
      this.onScreen = entries.some((e) => e.isIntersecting);
      this.invalidate();
    }).observe(renderer.domElement);
  }

  /** Request a redraw (and wake the loop if it is asleep). */
  invalidate(): void {
    this.dirty = true;
    if (!this.raf && this.onScreen && !document.hidden) this.raf = requestAnimationFrame((t) => this.frame(t));
  }

  private frame(now: number): void {
    this.raf = 0;
    if (!this.onScreen || document.hidden) return;
    const tweening = this.tweens.update(now);
    const moved = this.controls.update();
    if (tweening || moved || this.dirty) {
      this.dirty = false;
      this.renderer.render(this.scene, this.camera);
      if (++this.frames === 1) this.onFirstFrame?.();
      // controls.update() may already have re-armed the loop through its 'change' event
      if (!this.raf) this.raf = requestAnimationFrame((t) => this.frame(t));
    }
  }
}
