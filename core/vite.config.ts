import * as path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import distCss from '@elonehoo/vite-plugin-dist-css'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue(),
    distCss()
  ],
  build: {
    // Preserve the browser floor used by Vite 7.
    target: ['chrome107', 'edge107', 'firefox104', 'safari16'],
    outDir: 'dist',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'vue-comd-k',
      fileName: (format) => `index.${format}.js`,
    },
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
