import { type NavigateOptions, useNavigate } from '@tanstack/react-router'
import {
  type LucideIcon,
  MenuIcon,
  PlusIcon,
  SearchIcon,
  Settings,
  SunMoonIcon,
  UserIcon,
  UsersIcon,
} from 'lucide-react'
import { useHotkeys } from 'react-hotkeys-hook'

import { switchTheme } from '@/shared/lib/switchTheme'
import { cn } from '@/shared/lib/utils'
import { Button, type ButtonProps } from '@/shared/ui/button'

import { SheetSearch } from '../SheetSearch'
import cls from './ChatNavigation.module.scss'
import { SettingsDropdown } from './SettingsDropdown'

const ROUTES = {
  createGroup: {
    to: '/groups/createSimple',
  } as NavigateOptions,
  personalGroup: {
    params: (prev: any) => ({ ...prev, groupType: 'personal_group' }),
    to: '/group/$groupType/{-$groupId}',
  } as NavigateOptions,
  simpleGroup: {
    params: (prev: any) => ({ ...prev, groupType: 'simple_group' }),
    to: '/group/$groupType/{-$groupId}',
  } as NavigateOptions,
}

interface NavButtonProps extends ButtonProps {
  icon: LucideIcon
  iconClassName?: string
  label?: string
}

const NavButton = ({ className, icon: Icon, iconClassName, label, ...props }: NavButtonProps) => (
  <Button className={cn('shrink-0', className)} variant="ghost" {...props}>
    <Icon className={cn('size-6', iconClassName)} strokeWidth={2} />
    {label && <span>{label}</span>}
  </Button>
)

interface ChatNavigationProps {
  className?: string
  setIsProfileDialogOpen: (open: boolean) => void
}

export const ChatNavigation = ({ className, setIsProfileDialogOpen }: ChatNavigationProps) => {
  const navigate = useNavigate()

  useHotkeys('ctrl+alt+g', () => navigate(ROUTES.simpleGroup))
  useHotkeys('ctrl+alt+p', () => navigate(ROUTES.personalGroup))

  return (
    <div className={cn(cls.chatNavigation, className)}>
      <SheetSearch>
        <NavButton icon={SearchIcon} />
      </SheetSearch>

      <NavButton icon={PlusIcon} navigateOptions={ROUTES.createGroup} />
      <NavButton icon={UserIcon} navigateOptions={ROUTES.personalGroup} />
      <NavButton icon={UsersIcon} navigateOptions={ROUTES.simpleGroup} />
      <NavButton icon={SunMoonIcon} onClick={switchTheme} />

      <SettingsDropdown setIsProfileDialogOpen={setIsProfileDialogOpen}>
        <NavButton icon={Settings} />
      </SettingsDropdown>
    </div>
  )
}

export const MobileFooterChatNavigation = ({ className }: ChatNavigationProps) => {
  const mobileBtnClass = 'flex flex-col gap-1 text-gray-600 bg-gray-100 h-full w-20 flex-1'

  return (
    <div className={cn('flex justify-center h-14 gap-1 px-4', className)}>
      <NavButton
        className={mobileBtnClass}
        icon={UserIcon}
        label="Local"
        navigateOptions={ROUTES.personalGroup}
      />
      <NavButton
        className={mobileBtnClass}
        icon={UsersIcon}
        label="Groups"
        navigateOptions={ROUTES.simpleGroup}
      />
      <NavButton
        className={mobileBtnClass}
        icon={Settings}
        label="Settings"
      />
    </div>
  )
}

export const MobileHeaderNavigationContainer = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={cn(className, 'flex items-center h-12 border-b px-1')}>
      {children}
    </div>
  )
}

export const MobileHeaderNavigationDefault = () => {
  return (
    <NavButton icon={MenuIcon} />
  )
}
