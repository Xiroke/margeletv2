import { createFileRoute } from '@tanstack/react-router'

import { RegistrationPage } from '@/pages/RegistrationPage'

export const Route = createFileRoute('/registration')({
  component: RegistrationPage,
})
