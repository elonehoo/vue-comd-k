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
