import { createFileRoute } from '@tanstack/react-router'

import { SearchPage } from '@/pages/SearchPage/ui/SearchPage'

export const Route = createFileRoute('/search')({
  component: SearchPage,
})
