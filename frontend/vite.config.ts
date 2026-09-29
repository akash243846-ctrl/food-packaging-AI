import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    strictPort: false,
    host: '127.0.0.1',
    proxy: {
      // Proxy backend API calls
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      // Proxy Gemini API calls through Node.js (IPv4) to avoid browser IPv6 timeout
      '/gemini-api': {
        target: 'https://generativelanguage.googleapis.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/gemini-api/, ''),
      },
      // Proxy NVIDIA NIM API calls through Node.js to avoid CORS or IPv6 issues
      '/nvidia-api': {
        target: 'https://integrate.api.nvidia.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/nvidia-api/, ''),
      },
    },
  },
})
