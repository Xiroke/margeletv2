import type { FC } from 'react'

import { clsx } from 'clsx'
import { PlusIcon, SearchIcon, Settings, SunMoonIcon, UserIcon, UsersIcon } from 'lucide-react'
import { memo } from 'react'

import { switchTheme } from '@/shared/lib/switchTheme'
import { Button } from '@/shared/ui/button'

import cls from './ChatNavigation.module.scss'

interface ChatNavigationProps {
  className?: string
}

export const ChatNavigation: FC<ChatNavigationProps> = memo(
  (props: ChatNavigationProps) => {
    const { className } = props

    return (
      <div className={clsx(cls.chatNavigation, className)}>
        <Button
          navigateOptions={{
            to: '/search',
          }}
          variant="ghost"
        >
          <SearchIcon className="size-6" size={24} strokeWidth={2} />
        </Button>

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
          <Settings className="size-6" size={24} strokeWidth={1.6} />
        </Button>
      </div>
    )
  },
)
