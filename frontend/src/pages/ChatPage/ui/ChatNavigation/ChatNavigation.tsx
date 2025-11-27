import type { FC } from 'react'

import { clsx } from 'clsx'
import { PlusIcon, SunMoonIcon, UserIcon, UsersIcon } from 'lucide-react'
import { memo, useRef } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

import { switchTheme } from '@/shared/lib/switchTheme'
import { Button } from '@/shared/ui/button'

import type { SettingsDropdownProps } from './SettingsDropdown/SettingsDropdown'

import { SheetSearch } from '../SheetSearch'
import cls from './ChatNavigation.module.scss'
import { SettingsDropdown } from './SettingsDropdown'

interface ChatNavigationProps {
  className?: string
  settingsProps: SettingsDropdownProps
}

export const ChatNavigation: FC<ChatNavigationProps> = memo(
  (props: ChatNavigationProps) => {
    const { className, settingsProps } = props

    const simpleGroupButtonRef = useRef<HTMLButtonElement>(null)
    const personalGroupButtonRef = useRef<HTMLButtonElement>(null)

    useHotkeys('ctrl+alt+g', () => simpleGroupButtonRef.current?.click(),
    )
    useHotkeys('ctrl+alt+p', () => personalGroupButtonRef.current?.click(),
    )

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
          ref={personalGroupButtonRef}
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
          ref={simpleGroupButtonRef}
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

        <SettingsDropdown {...settingsProps} />
      </div>
    )
  },
)
