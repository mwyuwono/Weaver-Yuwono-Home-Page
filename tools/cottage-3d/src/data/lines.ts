/**
 * Loader for the build-time baked linework (generated/lines.bin, written by scripts/bake-lines.mjs). Returns
 * undefined, with a console warning, when the file is missing or was baked from different sources than the ones
 * being served; House then classifies at runtime exactly as the bake would have.
 */
import linesHash from 'virtual:lines-hash';
import { decodeLineSets, type LineSets } from '../render/bakedLines';

// A glob (not a plain import) so a missing file is not a build error.
const urls = import.meta.glob<string>('../../generated/lines.bin', { query: '?url', import: 'default', eager: true });

export async function loadBakedLines(): Promise<LineSets | undefined> {
  const url = urls['../../generated/lines.bin'];
  if (!url) {
    console.warn('[cottage-3d] baked linework missing (run `npm run bake`); classifying at load');
    return undefined;
  }
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { hash, sets } = decodeLineSets(await res.arrayBuffer());
    if (hash !== linesHash) {
      console.warn('[cottage-3d] baked linework is stale (run `npm run bake`); classifying at load');
      return undefined;
    }
    return sets;
  } catch (err) {
    console.warn('[cottage-3d] baked linework unreadable; classifying at load', err);
    return undefined;
  }
}
