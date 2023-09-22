import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from 'vite-plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    legacy({
        targets: ['defaults', 'not IE 11']
    }),
    vue(),
  ],
  build: {
    rollupOptions: {
      input: 'src/main.js'
    }
  },
  resolve: {
    dedupe: ['vue'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
