import type { FC } from 'react'

import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { clsx } from 'clsx'
import { PlusIcon, Settings, SunMoonIcon, UserIcon, UsersIcon } from 'lucide-react'
import { memo } from 'react'

import { authQueryProps } from '@/features/auth/api'
import { switchTheme } from '@/shared/lib/switchTheme'
import { Button } from '@/shared/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'

import { SheetSearch } from '../SheetSearch'
import cls from './ChatNavigation.module.scss'

interface ChatNavigationProps {
  className?: string
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
              groupType: 'personal_group',
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
              groupType: 'simple_group',
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
