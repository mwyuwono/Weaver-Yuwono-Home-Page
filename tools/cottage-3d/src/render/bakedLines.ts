/**
 * Baked linework: the classified, merged line segments of every group, computed at build time (scripts/bake-lines.mjs)
 * so the page skips edge extraction and classification at load.
 *
 * Binary layout (little-endian, every section 4-byte aligned):
 *   u32 jsonLength | JSON {hash, entries:[{group, tier, n}]} (zero-padded to 4)
 *   per entry: Float32 positions[6n] (scene feet) | Float32 sizes[n] (inches) | Uint8 joins[n] (zero-padded to 4)
 * `hash` fingerprints the sources the bake depends on (scripts/lines-hash.mjs); a mismatch means the file is stale.
 */
import type { LineTierName } from './lines';

export interface BakedTier {
  positions: ArrayLike<number>;
  sizes: ArrayLike<number>;
  joins: ArrayLike<number>;
}

/** Per group name (level key or 'site-structures'), per tier. A tier with no segments is absent. */
export type LineSets = Record<string, Partial<Record<LineTierName, BakedTier>>>;

interface Index {
  hash: string;
  entries: { group: string; tier: LineTierName; n: number }[];
}

const pad4 = (n: number): number => (n + 3) & ~3;

export function encodeLineSets(sets: LineSets, hash: string): Uint8Array {
  const entries: Index['entries'] = [];
  for (const [group, tiers] of Object.entries(sets)) {
    for (const [tier, seg] of Object.entries(tiers) as [LineTierName, BakedTier][]) entries.push({ group, tier, n: seg.sizes.length });
  }
  const json = new TextEncoder().encode(JSON.stringify({ hash, entries } satisfies Index));
  const head = 4 + pad4(json.length);
  const total = entries.reduce((s, e) => s + 28 * e.n + pad4(e.n), head);
  const out = new Uint8Array(total);
  new DataView(out.buffer).setUint32(0, json.length, true);
  out.set(json, 4);
  let at = head;
  for (const e of entries) {
    const seg = sets[e.group][e.tier] as BakedTier;
    out.set(new Uint8Array(Float32Array.from(seg.positions).buffer), at);
    at += 24 * e.n;
    out.set(new Uint8Array(Float32Array.from(seg.sizes).buffer), at);
    at += 4 * e.n;
    out.set(Uint8Array.from(seg.joins), at);
    at += pad4(e.n);
  }
  return out;
}

/** Decode a baked file. Typed arrays are views into `bytes`. */
export function decodeLineSets(bytes: ArrayBuffer): { hash: string; sets: LineSets } {
  const jsonLength = new DataView(bytes).getUint32(0, true);
  const index = JSON.parse(new TextDecoder().decode(new Uint8Array(bytes, 4, jsonLength))) as Index;
  let at = 4 + pad4(jsonLength);
  const sets: LineSets = {};
  for (const { group, tier, n } of index.entries) {
    const positions = new Float32Array(bytes, at, 6 * n);
    at += 24 * n;
    const sizes = new Float32Array(bytes, at, n);
    at += 4 * n;
    const joins = new Uint8Array(bytes, at, n);
    at += pad4(n);
    (sets[group] ??= {})[tier] = { positions, sizes, joins };
  }
  return { hash: index.hash, sets };
}
