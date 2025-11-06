import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/demo/tanstack-query')({
  component: TanStackQueryDemo,
})

function TanStackQueryDemo() {
  const { data } = useQuery({
    initialData: [],
    queryFn: () =>
      Promise.resolve([{ name: 'John Doe' }, { name: 'Jane Doe' }]),
    queryKey: ['people'],
  })

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">People list</h1>
      <ul>
        {data.map(person => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  )
}
