/**
 * Controls — small overlay toolbar built from plain DOM buttons.
 * Two pressed-state groups: view mode (Assembled / Explode) and per-floor
 * isolate toggles (pressing the active floor again returns to Assembled).
 * "Reset view" is a plain action button. All are real <button>s, so they are
 * focusable and keyboard-operable by default.
 */
import type { LevelId } from '../data/schema';
import type { PlateId, ViewState } from '../anim/ExplodeController';

export interface ControlHandlers {
  assemble(): void;
  explode(): void;
  isolate(level: LevelId): void;
  resetView(): void;
  plate(id: PlateId): void;
}

const FLOORS: { id: LevelId; label: string }[] = [
  { id: 'basement', label: 'Basement' },
  { id: 'first', label: 'First' },
  { id: 'second', label: 'Second' },
];

/** Preset presentation views. Plain action buttons (they fly the camera, not a pressed state). */
const PLATES: { id: PlateId; label: string }[] = [
  { id: 'hero', label: 'Hero' },
  { id: 'front', label: 'Front' },
  { id: 'rear', label: 'Rear ¾' },
  { id: 'axon', label: 'Axon' },
];

export class Controls {
  private readonly buttons = new Map<string, HTMLButtonElement>();

  constructor(host: HTMLElement, handlers: ControlHandlers, floors: LevelId[]) {
    const bar = document.createElement('div');
    bar.className = 'ctl-bar';
    bar.setAttribute('role', 'toolbar');
    bar.setAttribute('aria-label', 'Model view controls');

    const mode = this.group(bar, 'View');
    this.toggle(mode, 'assembled', 'Assembled', () => handlers.assemble());
    this.toggle(mode, 'exploded', 'Explode', () => handlers.explode());

    const floor = this.group(bar, 'Isolate floor');
    for (const f of FLOORS.filter((f) => floors.includes(f.id))) {
      this.toggle(floor, f.id, f.label, () => {
        if (this.buttons.get(f.id)?.getAttribute('aria-pressed') === 'true') handlers.assemble();
        else handlers.isolate(f.id);
      });
    }

    const plates = this.group(bar, 'Preset views');
    for (const p of PLATES) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'ctl-btn';
      b.textContent = p.label;
      b.setAttribute('aria-label', `Preset view: ${p.label}`);
      b.addEventListener('click', () => handlers.plate(p.id));
      plates.appendChild(b);
    }

    const reset = document.createElement('button');
    reset.type = 'button';
    reset.className = 'ctl-btn ctl-reset';
    reset.textContent = 'Reset view';
    reset.addEventListener('click', () => handlers.resetView());
    bar.appendChild(reset);

    host.appendChild(bar);
    this.setState({ kind: 'assembled' });
  }

  private group(bar: HTMLElement, label: string): HTMLElement {
    const g = document.createElement('div');
    g.className = 'ctl-group';
    g.setAttribute('role', 'group');
    g.setAttribute('aria-label', label);
    bar.appendChild(g);
    return g;
  }

  private toggle(parent: HTMLElement, id: string, label: string, onClick: () => void): void {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'ctl-btn';
    b.textContent = label;
    b.setAttribute('aria-pressed', 'false');
    b.addEventListener('click', onClick);
    parent.appendChild(b);
    this.buttons.set(id, b);
  }

  /** Reflect the controller's state in the pressed buttons. */
  setState(state: ViewState): void {
    const pressed = state.kind === 'isolate' ? state.level : state.kind;
    for (const [id, b] of this.buttons) b.setAttribute('aria-pressed', String(id === pressed));
  }
}
