import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,  // Enables listening on all interfaces
    port: 5173,
  },
  define: {
    global: {}},
  plugins: [react()],
})
