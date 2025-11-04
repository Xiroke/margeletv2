import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/groups/search')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/groups/search"!</div>
}
