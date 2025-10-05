import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // Expose to network
    port: 5173,
  },
  preview: {
    host: '0.0.0.0', // Required for Railway
    port: process.env.PORT || 4173,
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
