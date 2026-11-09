/**
 * ExplodeController — drives the level groups between three kinds of state:
 *   assembled        every group at its true height
 *   exploded         groups lifted by increasing offsets, with clear gaps
 *   isolate(level)   chosen level (and those below) in place; levels above
 *                    slide up and fade out
 * and retargets the camera to frame the result.
 *
 * Fading uses each level group's own material clones (see House.flatten), so
 * shared materials are never touched. Transitions are tweened with easing and
 * a small stagger; issuing a new command mid-flight retargets from the current
 * positions.
 */
import { lineState } from '../render/lines';
import * as THREE from 'three';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { LevelId } from '../data/schema';
import type { House, LevelKey } from '../model/House';
import { frameBox, type Insets, type View } from '../scene/framing';
import type { TweenSet } from './tween';

export type ViewState = { kind: 'assembled' } | { kind: 'exploded' } | { kind: 'isolate'; level: LevelId };

/** Preset presentation views ("plates"). */
export type PlateId = 'hero' | 'front' | 'rear' | 'axon';

/** Bottom → top. */
const ORDER: LevelKey[] = ['basement', 'first', 'second', 'roof'];
/** Moving parts: the levels plus the terrain group, which sinks away and fades whenever the model is not assembled. */
type NodeKey = LevelKey | 'site';
const SITE_SINK = 60; // feet
/** Exploded lift per group, feet (clear gaps of ~7–8 ft between neighbours). */
const EXPLODE_LIFT: Record<LevelKey, number> = { basement: 0, first: 7, second: 14, roof: 22 };
/** How far hidden levels slide up while fading out, feet. */
const HIDE_LIFT = 16;
const DURATION = 1100;
const STAGGER = 80;
/** Default hero direction (target → camera): front-left, slightly above. */
/** Minimum camera elevation (radians) while floors are separated. */
const MIN_ELEVATION = THREE.MathUtils.degToRad(32);
const HERO_DIR = new THREE.Vector3(-0.72, 0.42, 1);
/** Rear three-quarter: same side as the hero, from behind. */
const REAR34_DIR = new THREE.Vector3(-0.72, 0.42, -1);
/** Exploded axon: high front-left, reading the separated plates from above. */
const AXON_DIR = new THREE.Vector3(-0.7, 0.75, 1);
/** Front elevation: straight down the +z axis (front faces +z). */
const FRONT_DIR = new THREE.Vector3(0, 0.02, 1);
/** Plate camera flights ease over ~900 ms; free orbit always remains. */
const PLATE_DURATION = 900;
const DEFAULT_FOV = 32;
const FRONT_FOV = 12;

interface Node {
  group: THREE.Group;
  materials: THREE.Material[];
  y: number;
  opacity: number;
}

export class ExplodeController {
  private readonly nodes = new Map<NodeKey, Node>();
  private current: ViewState = { kind: 'assembled' };
  private readonly reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  /** Notified whenever the state changes, so UI can reflect it. */
  onState: ((s: ViewState) => void) | null = null;
  /** Reports how much of the canvas the UI covers; separated floors are framed between the header and the control bar. */
  insets: (() => Insets) | null = null;

  constructor(
    private readonly house: House,
    private readonly camera: THREE.PerspectiveCamera,
    private readonly controls: OrbitControls,
    private readonly tweens: TweenSet,
  ) {
    for (const key of [...ORDER, 'site'] as NodeKey[]) {
      const group = key === 'site' ? house.site : house.levels.get(key);
      if (!group) continue;
      const materials = new Set<THREE.Material>();
      group.traverse((o) => {
        if (o instanceof THREE.Mesh) materials.add(o.material);
      });
      this.nodes.set(key, { group, materials: [...materials], y: 0, opacity: 1 });
    }
    // A user drag takes over from any running camera move (and leaves the
    // narrow front-elevation field of view behind).
    controls.addEventListener('start', () => {
      tweens.cancel('camera');
      if (this.camera.fov !== DEFAULT_FOV) {
        this.camera.fov = DEFAULT_FOV;
        this.camera.updateProjectionMatrix();
      }
    });
  }

  get state(): ViewState {
    return this.current;
  }

  /** True while the terrain is (becoming) visible, i.e. the camera must stay above grade. */
  get groundActive(): boolean {
    return this.current.kind === 'assembled';
  }

  assemble(): void { this.go({ kind: 'assembled' }); }
  explode(): void { this.go({ kind: 'exploded' }); }
  isolate(level: LevelId): void { this.go({ kind: 'isolate', level }); }

  /** Put the camera at the hero angle, framed for the current state. */
  resetView(): void {
    this.moveCamera(this.frame(this.current, HERO_DIR));
  }

  /**
   * Fly to a preset presentation view ("plate"). Hero/Front/Rear assemble
   * the model; the axon explodes it. Free orbit remains afterwards; grabbing
   * the model restores the default field of view.
   */
  plate(id: PlateId): void {
    if (id === 'axon') {
      this.explode();
      this.fly(AXON_DIR, { kind: 'exploded' }, DEFAULT_FOV);
      return;
    }
    this.assemble();
    if (id === 'hero') this.fly(HERO_DIR, { kind: 'assembled' }, DEFAULT_FOV);
    else if (id === 'rear') this.fly(REAR34_DIR, { kind: 'assembled' }, DEFAULT_FOV);
    else this.fly(FRONT_DIR, { kind: 'assembled' }, this.frontFov());
  }

  /** Widest field of view (starting from FRONT_FOV) that still fits the zoom limit. */
  private frontFov(): number {
    let fov = FRONT_FOV;
    for (;;) {
      this.camera.fov = fov;
      this.camera.updateProjectionMatrix();
      const view = this.frame({ kind: 'assembled' }, FRONT_DIR);
      if (view.position.distanceTo(view.target) <= this.controls.maxDistance * 0.98 || fov >= DEFAULT_FOV) {
        return fov;
      }
      fov += 2;
    }
  }

  /** Camera flight for a plate: ~900 ms, eased, retargeting any running move. */
  private fly(dir: THREE.Vector3, state: ViewState, fov: number): void {
    this.camera.fov = fov;
    this.camera.updateProjectionMatrix();
    const target = this.frame(state, dir);
    const fromPos = this.camera.position.clone(), fromTarget = this.controls.target.clone();
    this.tweens.start('camera', {
      duration: this.reduceMotion ? 0 : PLATE_DURATION,
      update: (e) => {
        this.camera.position.lerpVectors(fromPos, target.position, e);
        this.controls.target.lerpVectors(fromTarget, target.target, e);
      },
    });
  }

  /** Place the camera immediately (initial layout and window resizes before any interaction). */
  snapCamera(): void {
    const view = this.frame(this.current, HERO_DIR);
    this.camera.position.copy(view.position);
    this.controls.target.copy(view.target);
    this.controls.update();
  }

  private go(state: ViewState): void {
    this.current = state;
    const targets = this.targets(state);
    const exploding = state.kind !== 'assembled';
    ([...ORDER, 'site'] as NodeKey[]).forEach((key, i) => {
      const node = this.nodes.get(key);
      const to = targets.get(key);
      if (!node || !to) return;
      const fromY = node.y, fromO = node.opacity;
      const rank = key === 'site' ? 0 : exploding ? i : ORDER.length - 1 - i; // lift bottom-up, settle top-down; the ground goes first
      this.tweens.start(`level:${key}`, {
        delay: this.reduceMotion ? 0 : rank * STAGGER,
        duration: this.reduceMotion ? 0 : DURATION,
        update: (e) => this.apply(node, fromY + (to.y - fromY) * e, fromO + (to.opacity - fromO) * e),
        done: () => this.apply(node, to.y, to.opacity),
      });
    });
    this.moveCamera(this.frame(state));
    this.onState?.(state);
  }

  /** Target lift and opacity per group for a state. */
  private targets(state: ViewState): Map<NodeKey, { y: number; opacity: number }> {
    const out = new Map<NodeKey, { y: number; opacity: number }>();
    out.set('site', state.kind === 'assembled' ? { y: 0, opacity: 1 } : { y: -SITE_SINK, opacity: 0 });
    const keep = state.kind === 'isolate' ? ORDER.indexOf(state.level) : ORDER.length;
    ORDER.forEach((key, i) => {
      if (state.kind === 'assembled') out.set(key, { y: 0, opacity: 1 });
      else if (state.kind === 'exploded') out.set(key, { y: EXPLODE_LIFT[key], opacity: 1 });
      else out.set(key, i <= keep ? { y: 0, opacity: 1 } : { y: HIDE_LIFT + i, opacity: 0 });
    });
    return out;
  }

  private apply(node: Node, y: number, opacity: number): void {
    node.y = y;
    node.opacity = opacity;
    node.group.position.y = y;
    node.group.visible = opacity > 0.01;
    // Join lines (where floors meet flush) appear as soon as any floor leaves its assembled position.
    let sep = 0;
    for (const [key, n] of this.nodes) if (key !== 'site') sep = Math.max(sep, Math.min(1, Math.abs(n.y) / 1.5));
    lineState.separate = sep;
    const transparent = opacity < 0.999;
    for (const m of node.materials) {
      // Linework materials carry their tier's base opacity and stay
      // transparent always (they fade with the group, never toggle programs).
      const base = (m.userData.baseOpacity as number | undefined) ?? 1;
      const keepTransparent = (m.userData.keepTransparent as boolean | undefined) ?? false;
      m.opacity = opacity * base;
      if (!keepTransparent) {
        m.depthWrite = !transparent;
        if (m.transparent !== transparent) {
          m.transparent = transparent;
          m.needsUpdate = true; // transparency changes the compiled program's alpha output
        }
      }
    }
  }

  /**
   * View that frames the groups visible in `state`. Without `dir` the camera keeps
   * its current azimuth, lifted to at least MIN_ELEVATION when floors are separated
   * so the plates read from above.
   */
  private frame(state: ViewState, dir?: THREE.Vector3): View {
    const targets = this.targets(state);
    const box = new THREE.Box3();
    for (const [key, t] of targets) {
      const b = this.house.bounds.get(key as LevelKey); // the terrain is not part of the framing
      if (b && t.opacity > 0) box.union(b.clone().translate(new THREE.Vector3(0, t.y, 0)));
    }
    let look = dir?.clone();
    if (!look) {
      look = this.camera.position.clone().sub(this.controls.target);
      const horizontal = Math.hypot(look.x, look.z);
      if (horizontal < 1e-6) look.copy(HERO_DIR);
      else if (state.kind !== 'assembled') look.y = Math.max(look.y, horizontal * Math.tan(MIN_ELEVATION));
    }
    return frameBox(box, look, this.camera, 1.12, state.kind === 'assembled' ? undefined : this.insets?.());
  }

  private moveCamera(target: View): void {
    const fromPos = this.camera.position.clone(), fromTarget = this.controls.target.clone();
    this.tweens.start('camera', {
      duration: this.reduceMotion ? 0 : DURATION + 200,
      update: (e) => {
        this.camera.position.lerpVectors(fromPos, target.position, e);
        this.controls.target.lerpVectors(fromTarget, target.target, e);
      },
    });
  }
}
