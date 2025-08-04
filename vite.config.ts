// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig({
  /* GitHub Pages base path */
  base: '/auto-detail/',

  /* 1. Exclude Framer Motion from esbuild pre-bundling so its module directives survive */
  optimizeDeps: {
    exclude: ['framer-motion']
  },

  plugins: [
    /* 2. React plugin applies Babel/SWC transform that preserves "use client" */
    react(),

    /* 3. Offline-first PWA support */
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt'],
      manifest: {
        name: 'Detailing Kalkulačka Pro+',
        short_name: 'DetKalk',
        description: 'Granulární kalkulačka auto detailingu',
        start_url: '/auto-detail/',
        theme_color: '#2c3e50',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          { src: '/auto-detail/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/auto-detail/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: '/auto-detail/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],

  /* Path alias for cleaner imports */
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') }
  },

  /* Tailwind + Autoprefixer pipeline */
  css: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')]
    }
  },

  /* Production build settings */
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
