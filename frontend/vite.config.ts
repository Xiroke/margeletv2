import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import viteReact from '@vitejs/plugin-react'
/// <reference types="vitest/config" />
import path, { resolve } from 'node:path'
// https://vitejs.dev/config/
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

import { settings } from './src/config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    tanstackRouter({
      autoCodeSplitting: true,
    }),
    viteReact(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        bypass: (req, res) => {
          const proxyUrl = new URL(req.url || '', 'http://localhost')
          if (proxyUrl.pathname.startsWith('/api') && res) {
            res.setHeader('x-vite-bypass-fallback', 'true')
            return null
          }
        },
        changeOrigin: true,
        secure: false,
        target: settings.VITE_DEV_BACKEND_URL,
      },
      '/api/ws': {
        changeOrigin: true,
        target: settings.VITE_DEV_BACKEND_URL,
        ws: true,
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    projects: [
      {
        extends: true,
      },
    ],
  },
})
