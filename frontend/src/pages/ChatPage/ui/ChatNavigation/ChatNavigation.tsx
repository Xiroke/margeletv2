import { type NavigateOptions, useNavigate } from '@tanstack/react-router'
import { clsx } from 'clsx'
import { PlusIcon, SunMoonIcon, UserIcon, UsersIcon } from 'lucide-react'
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

const simpleGroupNavigateOptions: NavigateOptions = {
  params: (prev) => ({
    ...prev,
    groupType: 'simple_group',
  }),
  to: '/group/$groupType/{-$groupId}',
}

const personalGroupNavigateOptions: NavigateOptions = {
  params: (prev) => ({
    ...prev,
    groupType: 'personal_group',
  }),
  to: '/group/$groupType/{-$groupId}',
}

const IconNavigationProps = { className: 'size-6', size: 24, strokeWidth: 2 }

export const ChatNavigation = ({ className, settingsProps }: ChatNavigationProps) => {
  const navigate = useNavigate()

  useHotkeys('ctrl+alt+g', () => navigate(simpleGroupNavigateOptions),
  )
  useHotkeys('ctrl+alt+p', () => navigate(personalGroupNavigateOptions),
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
        <PlusIcon {...IconNavigationProps} />
      </Button>

      <Button
        navigateOptions={personalGroupNavigateOptions}
        variant="ghost"
      >
        <UserIcon {...IconNavigationProps} />
      </Button>

      <Button
        navigateOptions={simpleGroupNavigateOptions}
        variant="ghost"
      >
        <UsersIcon {...IconNavigationProps} />
      </Button>

      <Button
        onClick={switchTheme}
        variant="ghost"
      >
        <SunMoonIcon {...IconNavigationProps} />
      </Button>

      <SettingsDropdown {...settingsProps} />
    </div>
  )
}

export const MobileChatNavigation = ChatNavigation
