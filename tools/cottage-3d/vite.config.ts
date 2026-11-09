import { defineConfig, type Plugin } from 'vite';
import { computeLinesHash } from './scripts/lines-hash.mjs';

/**
 * `virtual:lines-hash`: fingerprint of the sources the baked linework depends on, computed fresh on every load so
 * the dev server notices edits and the loader can reject a stale generated/lines.bin (see src/data/lines.ts).
 */
function linesHash(): Plugin {
  const id = '\0virtual:lines-hash';
  return {
    name: 'cottage-lines-hash',
    resolveId: (source) => (source === 'virtual:lines-hash' ? id : null),
    load: (moduleId) => (moduleId === id ? `export default ${JSON.stringify(computeLinesHash())};` : null),
    handleHotUpdate: ({ server }) => {
      const mod = server.moduleGraph.getModuleById(id);
      if (mod) server.moduleGraph.invalidateModule(mod);
    },
  };
}

// Static build for plain hosting: relative asset URLs, emitted straight into
// the site's projects/ folder (outside the Vite root, hence emptyOutDir).
export default defineConfig({
  base: './',
  plugins: [linesHash()],
  build: {
    outDir: '../../projects/connecticut-cottage',
    emptyOutDir: true,
    chunkSizeWarningLimit: 900,
  },
});
