import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/groups/')({
  loader: () => { throw redirect({ params: { groupType: 'simple' }, to: '/group/$groupType/{-$groupId}' }) },
})
