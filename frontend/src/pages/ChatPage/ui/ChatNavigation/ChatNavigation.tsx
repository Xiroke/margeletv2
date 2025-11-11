import type { FC } from 'react'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { clsx } from 'clsx'
import { PlusIcon, SearchIcon, Settings, SunMoonIcon, UserIcon, UsersIcon } from 'lucide-react'
import { ResultAsync } from 'neverthrow'
import { memo, useState } from 'react'
import { toast } from 'sonner'

import { personalGroupQueryProps } from '@/entities/PersonalGroup/api'
import { userQueryProps } from '@/entities/User/api'
import { UserCard } from '@/entities/User/UserCard'
import { authQueryProps } from '@/features/auth/api'
import { switchTheme } from '@/shared/lib/switchTheme'
import { Button } from '@/shared/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { Input } from '@/shared/ui/input'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/shared/ui/sheet'

import cls from './ChatNavigation.module.scss'

interface ChatNavigationProps {
  className?: string
}

const SheetSearch = () => {
  const [query, setQuery] = useState('')
  const { data, isFetching, isSuccess } = useQuery({ ...userQueryProps.getUserByAccountNameOpt({ path: { account_name: query } }), enabled: !!query })
  const personalGroupCreate = useMutation(personalGroupQueryProps.create())

  const onUserCardClick = async (id: string) => {
    const result = await ResultAsync.fromPromise(
      personalGroupCreate.mutateAsync({ path: { other_user_id: id } }),
      error => error as { detail: string },
    )

    if (result.isErr()) {
      toast.error(result.error.detail)
    }
    else {
      toast.success('Personal group created')
    }
  }

  return (
    <Sheet>
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
          <Input onChange={e => setQuery(e.target.value)} placeholder="Enter query" value={query} />
          <div className="flex flex-col gap-4">
            {isFetching && <div>Loading...</div>}
            {query && !isFetching && isSuccess && data && (
              <div className="flex flex-col gap-2">
                <UserCard id={data.id} onClick={() => onUserCardClick(data.id)} username={data.name} />
              </div>
            )}
            {query && !isFetching && !isSuccess && !data && (
              <h4 className="mt-40 text-center">No results found</h4>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

const SettingsDropdown = () => {
  const logout = useMutation(authQueryProps.logoutMut())
  const navigate = useNavigate()

  const onClickLogout = () => {
    logout.mutate({})
    navigate({ to: '/' })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
        >
          <Settings className="size-6" size={24} strokeWidth={1.6} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuItem onClick={() => onClickLogout()}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const ChatNavigation: FC<ChatNavigationProps> = memo(
  (props: ChatNavigationProps) => {
    const { className } = props

    return (
      <div className={clsx(cls.chatNavigation, className)}>
        <SheetSearch />
        <Button
          navigateOptions={{
            to: '/groups/createSimple',
          }}
          variant="ghost"
        >
          <PlusIcon className="size-6" size={24} strokeWidth={2} />
        </Button>

        <Button
          navigateOptions={{
            params: prev => ({
              ...prev,
              groupType: 'personal',
            }),
            to: '/group/$groupType/{-$groupId}',
          }}
          variant="ghost"
        >
          <UserIcon className="size-6" size={24} strokeWidth={2} />
        </Button>

        <Button
          navigateOptions={{
            params: prev => ({
              ...prev,
              groupType: 'simple',
            }),
            to: '/group/$groupType/{-$groupId}',
          }}
          variant="ghost"
        >
          <UsersIcon className="size-6" size={24} strokeWidth={1.6} />
        </Button>

        <Button
          onClick={switchTheme}
          variant="ghost"
        >
          <SunMoonIcon className="size-6" size={24} strokeWidth={1.6} />
        </Button>

        <SettingsDropdown />
      </div>
    )
  },
)
