import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/food-api': {
        target: 'https://dailyfoodrecalls.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/food-api/, ''),
      }
    }
  }
})  