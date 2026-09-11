import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    tailwindcss(),
    react(),
    electron({
      entry: 'electron/main.cjs',
      preload: {
        input: 'electron/preload.cjs',
      },
    }),
  ],
  server: {
    port: 5173,
  },
  build: {
    rollupOptions: {
      input: {
        main: 'src/main.jsx',
      },
      external: ['motion/react'],
    },
  },
})
