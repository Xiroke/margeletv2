import { createFileRoute } from '@tanstack/react-router'

import { VerifyPage } from '@/pages/VerifyPage/ui/VerifyPage'

export const Route = createFileRoute('/verify/$email/{-$token}')({
  component: VerifyPage,
})
