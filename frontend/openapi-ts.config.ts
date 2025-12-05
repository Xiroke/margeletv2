import { defineConfig } from '@hey-api/openapi-ts'
import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { settings } from './src/config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// load .env from parent
dotenv.config({ path: path.resolve(__dirname, '.env') })

export default defineConfig({
  input: {
    path: settings.VITE_DEV_BACKEND_URL + '/api/openapi.json',
  },
  output: '/src/shared/api/generated',
  plugins: ['@tanstack/react-query'],
})
