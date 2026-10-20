import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // Preserve the browser floor used by Vite 7.
    target: ['chrome107', 'edge107', 'firefox104', 'safari16'],
  },
  plugins: [vue()]
})
