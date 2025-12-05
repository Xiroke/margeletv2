import { createFileRoute } from '@tanstack/react-router'

import { BackendConfigPage } from '@/pages/ChatPage/ui/BackendConfigPage/ui/BackendConfigPage'

export const Route = createFileRoute('/backend/config')({
  component: BackendConfigPage,
})
