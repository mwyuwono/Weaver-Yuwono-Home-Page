/**
 * A tiny tween engine: keyed, delayed, interruptible. Starting a tween with a
 * key that is already running replaces it; callers capture the CURRENT value
 * as the new start, which is what makes retargeting mid-flight seamless.
 */
export const easeInOutCubic = (t: number): number => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

interface Tween {
  t0: number;
  delay: number;
  duration: number;
  update: (eased: number) => void;
  done?: () => void;
}

export class TweenSet {
  private readonly tweens = new Map<string, Tween>();
  /** Called whenever a tween is added, so an idle render loop can wake up. */
  onStart: (() => void) | null = null;

  start(key: string, spec: { delay?: number; duration: number; update: (eased: number) => void; done?: () => void }): void {
    this.tweens.set(key, { t0: performance.now(), delay: spec.delay ?? 0, duration: spec.duration, update: spec.update, done: spec.done });
    this.onStart?.();
  }

  cancel(key: string): void {
    this.tweens.delete(key);
  }

  /** Advance all tweens to `now` (ms, performance.now clock). Returns true while any are still pending. */
  update(now: number): boolean {
    for (const [key, tw] of this.tweens) {
      const elapsed = now - tw.t0 - tw.delay;
      if (elapsed < 0) continue;
      const t = tw.duration <= 0 ? 1 : Math.min(1, elapsed / tw.duration);
      tw.update(easeInOutCubic(t));
      if (t >= 1) {
        this.tweens.delete(key);
        tw.done?.();
      }
    }
    return this.tweens.size > 0;
  }
}
