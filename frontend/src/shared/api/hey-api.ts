import { settings } from '@/config'

import type { CreateClientConfig } from './generated/client.gen'

export const createClientConfig: CreateClientConfig = config => ({
  ...config,
  baseUrl: settings.VITE_BACKEND_URL,
  credentials: 'include',
})
