import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    // Custom plugin to set correct headers for video files (fixes ERR_CACHE_OPERATION_NOT_SUPPORTED)
    {
      name: 'configure-response-headers',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && (req.url.endsWith('.mp4') || req.url.endsWith('.webm') || req.url.endsWith('.mov'))) {
            res.setHeader('Accept-Ranges', 'bytes')
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
            res.setHeader('Pragma', 'no-cache')
            res.setHeader('Expires', '0')
          }
          next()
        })
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.mp4', '**/*.webm', '**/*.mov'],
  build: {
    target: 'es2018',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-framer': ['framer-motion'],
          'vendor-gsap': ['gsap'],
          'vendor-swiper': ['swiper'],
          'vendor-icons': ['react-icons'],
          'vendor-email': ['@emailjs/browser'],
          'vendor-lightbox': ['yet-another-react-lightbox'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    sourcemap: false,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'gsap', 'swiper', 'react-icons', '@emailjs/browser'],
  },
})
