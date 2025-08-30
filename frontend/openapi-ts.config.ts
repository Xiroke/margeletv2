import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from '@hey-api/openapi-ts';

import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// грузим .env из родителя
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export default defineConfig({
  input: {
    path: process.env.VITE_BACKEND_URL + '/api/openapi.json',
  },
  output: 'src/shared/api/generated',
  plugins: ['@tanstack/react-query'],
});
