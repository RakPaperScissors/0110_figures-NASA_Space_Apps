import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // Exposes the server to network
    port: 5173, // Optional: specify port
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
