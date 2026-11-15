import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

const LITURGIA_API = 'https://liturgia.up.railway.app';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'offline.html'],
      manifest: {
        name: 'SOPRO — vida espiritual católica',
        short_name: 'SOPRO',
        description:
          'Plataforma comunitária para organizar a vida espiritual católica: liturgia, orações, calendário e formações.',
        lang: 'pt-BR',
        dir: 'ltr',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#faf7f2',
        theme_color: '#faf7f2',
        categories: ['lifestyle', 'education'],
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: '/icons/icon-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2,ico}'],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api\//],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            // Chamadas à API de liturgia: rede primeiro, cache como reserva.
            urlPattern: /^https:\/\/liturgia\.up\.railway\.app\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'liturgia-api',
              networkTimeoutSeconds: 6,
              expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^\/api\/liturgia\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'liturgia-proxy',
              networkTimeoutSeconds: 6,
              expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      devOptions: { enabled: false },
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
    // Sandbox de preview e túneis: aceita o host do proxy e subdomínios e2b.app.
    allowedHosts: true,
    // Proxy opcional: defina VITE_LITURGIA_API_BASE=/api/liturgia no .env
    // para contornar eventuais bloqueios de CORS em desenvolvimento.
    proxy: {
      '/api/liturgia': {
        target: LITURGIA_API,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/liturgia/, '/v2'),
      },
    },
  },
  preview: { host: '0.0.0.0', port: 4173, allowedHosts: true },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    css: false,
  },
});
