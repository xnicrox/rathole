import { defineConfig } from 'vite';

export default defineConfig({
  publicDir: false,
  build: {
    minify: true,
    rollupOptions: {
      output: {
        entryFileNames: `rathole.js`,
      },
    },
  },
});
