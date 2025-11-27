import type { ReactNode } from 'react'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { SearchIcon } from 'lucide-react'
import { ResultAsync } from 'neverthrow'
import { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { toast } from 'sonner'

import { GroupCard } from '@/entities/Group/ui/GroupCard'
import { personalGroupQueryProps } from '@/entities/PersonalGroup/api'
import { simpleGroupQueryProps } from '@/entities/SimpleGroup/api'
import { userQueryProps } from '@/entities/User/api'
import { UserCard } from '@/entities/User/UserCard'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/shared/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'

interface SheetSearchContentProps {
  children?: ReactNode
  className?: string
  data?: any
  isError: boolean
  isFetching: boolean
  isSuccess: boolean
  query: string
}

const SheetSearchContent = ({
  children,
  className,
  data,
  isError,
  isFetching,
  isSuccess,
  query,
}: SheetSearchContentProps) => {
  if (!query) return <h4 className="mt-40 text-center">Enter query</h4>

  if (isFetching && !isError) return <div className="text-center">Loading...</div>

  if (isSuccess && data) return <div className={cn('flex flex-col gap-4', className)}>{children}</div>

  return <h4 className="mt-40 text-center">No results found</h4>
}

interface SheetSearchUsersContentProps {
  className?: string
  query: string
}

export const SheetSearchUsersContent = ({ className, query }: SheetSearchUsersContentProps) => {
  const { data, isError, isFetching, isSuccess } = useQuery({
    ...userQueryProps.getUserByAccountNameOpt({ query: { account_name: query } }),
    enabled: !!query,
    retry: false,
  })

  const personalGroupCreate = useMutation(personalGroupQueryProps.create())

  const handleClick = async (id: string) => {
    const result = await ResultAsync.fromPromise(
      personalGroupCreate.mutateAsync({ path: { other_user_id: id } }),
      error => error as { detail: string },
    )

    result.match(
      () => toast.success('Personal group created'),
      err => toast.error(err.detail),
    )
  }

  return (
    <SheetSearchContent
      className={className}
      data={data}
      isError={isError}
      isFetching={isFetching}
      isSuccess={isSuccess}
      query={query}
    >
      {data && (
        <div className="flex flex-col gap-2">
          <UserCard id={data.id} onClick={() => handleClick(data.id)} username={data.name} />
        </div>
      )}
    </SheetSearchContent>
  )
}

interface SheetSearchGroupsContentProps {
  className?: string
  query: string
}

export const SheetSearchGroupsContent = ({ className, query }: SheetSearchGroupsContentProps) => {
  const { data, isError, isFetching, isSuccess } = useQuery({
    ...simpleGroupQueryProps.search({ query: { query } }),
    enabled: !!query,
    retry: false,
  })

  const navigate = useNavigate()

  return (
    <SheetSearchContent
      className={className}
      data={data}
      isError={isError}
      isFetching={isFetching}
      isSuccess={isSuccess}
      query={query}
    >
      {data && (
        <div className="flex flex-col gap-2">
          {data.map((group, idx) => (
            <GroupCard key={idx} onClick={() => navigate({ to: `/group/simple_group/${group.id}` })} title={group.title ?? ''} />
          ))}
        </div>
      )}
    </SheetSearchContent>
  )
}

export const SheetSearch = () => {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  useHotkeys('ctrl+alt+s', () =>
    setOpen(true),
  [])

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
        >
          <SearchIcon className="size-6" size={24} strokeWidth={2} />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-1/4 sm:max-w-1/4" side="left">
        <SheetHeader>
          <SheetTitle asChild><h4>Search</h4></SheetTitle>
        </SheetHeader>
        <div className="px-4 -mt-6 flex flex-col gap-6">
          <Input autoFocus onChange={e => setQuery(e.target.value)} placeholder="Enter query" value={query} />

          <Tabs defaultValue="users">
            <TabsList>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="groups">Groups</TabsTrigger>
            </TabsList>

            <TabsContent value="users">
              <SheetSearchUsersContent className="mt-4" query={query} />
            </TabsContent>
            <TabsContent value="groups">
              <SheetSearchGroupsContent className="mt-4" query={query} />
            </TabsContent>

          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  )
}
