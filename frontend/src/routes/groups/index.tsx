import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/groups/')({
  loader: () => { throw redirect({ params: { groupType: 'simple_group' }, to: '/group/$groupType/{-$groupId}' }) },
})
