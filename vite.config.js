// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig({
  /*  GitHub Pages serves the site at /auto-detail/  */
  base: '/auto-detail/',

  plugins: [
    react(),

    /* Offline‑first PWA — generates service‑worker + manifest.json */
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

  /* nice “@/” import alias */
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') }
  },

  /* Tailwind + Autoprefixer pipeline */
  css: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')]
    }
  },

  /* optional tweak: silence source‑maps in prod */
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
