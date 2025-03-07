import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), chunkSplitPlugin(), VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
    workbox: {
      maximumFileSizeToCacheInBytes: 5 * 1024 ** 2, // 5 MB or set to something else
    },
    manifest: {
      name: 'Ramadan Tracker',
      short_name: 'Ramadan Tracker',
      theme_color: '#060028',
      icons: [
        {
          "src": "manifest-icon-192.maskable.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "any"
        },
        {
          "src": "manifest-icon-192.maskable.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "maskable"
        },
        {
          "src": "manifest-icon-512.maskable.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "any"
        },
        {
          "src": "manifest-icon-512.maskable.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "maskable"
        }
      ]
    }
  })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
})
