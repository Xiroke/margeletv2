import { createFileRoute } from '@tanstack/react-router'

import { ChatPage } from '@/pages/ChatPage'

// groupType - simple | personal | search
export const Route = createFileRoute('/group/$groupType/{-$groupId}')({
  component: ChatPage,
})
