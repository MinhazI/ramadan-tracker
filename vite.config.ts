import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), chunkSplitPlugin(),
  VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
    workbox: {
      maximumFileSizeToCacheInBytes: 5 * 1024 ** 2, // 5 MB
      runtimeCaching: [
        {
          urlPattern: /(\.js|\.css|\.html)$/, // Match js, css, and html files
          handler: 'NetworkFirst', // This ensures it always tries to get a new version first
          options: {
            cacheName: 'asset-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 24 * 60 * 60, // Cache for 1 day
            },
          },
        },
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|webp)$/, // Images caching
          handler: 'CacheFirst',
          options: {
            cacheName: 'image-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 30 * 24 * 60 * 60, // Cache images for 30 days
            },
          },
        },
      ],
    },
    manifest: {
      name: 'Ramadan Tracker',
      short_name: 'Ramadan Tracker',
      theme_color: '#2e7d32',
      icons: [
        {
          src: 'manifest-icon-192.maskable.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: 'manifest-icon-192.maskable.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: 'manifest-icon-512.maskable.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: 'manifest-icon-512.maskable.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },
  })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
})
