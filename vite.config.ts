/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    minify: 'esbuild'
  },
  server: {
    host: true,
    port: 3000,
    open: false
  },
  test: {
    setupFiles: ['./tests/setup.ts'],
    server: {
      deps: {
        external: ['node:sqlite']
      }
    }
  }
});
