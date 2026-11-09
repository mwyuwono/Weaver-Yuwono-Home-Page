import { defineConfig } from 'vite';

// Static build for plain hosting: relative asset URLs, emitted straight into
// the site's projects/ folder (outside the Vite root, hence emptyOutDir).
export default defineConfig({
  base: './',
  build: {
    outDir: '../../projects/connecticut-cottage',
    emptyOutDir: true,
    chunkSizeWarningLimit: 900,
  },
});
