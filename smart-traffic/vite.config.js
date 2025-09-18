import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }) // opens report after build
  ],
  build: {
    chunkSizeWarningLimit: 1500,
  },
})
