import { type NavigateOptions, useNavigate } from '@tanstack/react-router'
import {
  BadgePlusIcon,
  LogOutIcon,
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

import { useLogout } from '@/features/auth/api'
import { switchTheme } from '@/shared/lib/switchTheme'
import { cn } from '@/shared/lib/utils'
import { Button, type ButtonProps } from '@/shared/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/shared/ui/sheet'

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
  const mobileBtnClass = 'flex flex-col gap-1 bg-muted text-muted-foreground h-full w-20 flex-1'

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
      <SheetSearch>
        <NavButton
          className={mobileBtnClass}
          icon={SearchIcon}
          label="Search"
        />
      </SheetSearch>
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

export const MobileHeaderNavigationDefault = ({ onClickMenu }: { onClickMenu: () => void }) => {
  return (
    <NavButton icon={MenuIcon} onClick={onClickMenu} />
  )
}

interface MobileMenuProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export const MobileMenu = ({ open, setOpen }: MobileMenuProps) => {
  const buttonClassName = '!px-0 w-full gap-6 justify-start'
  const logout = useLogout()

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetContent className="p-4" side="left">
        <SheetTitle className="sr-only">Mobile menu</SheetTitle>
        <SheetDescription className="sr-only">Mobile menu with different functions</SheetDescription>
        Menu
        <div className=" mt-4 text-sm font-medium ">Actions</div>
        <div className="flex flex-col gap-3 items-start text-base">
          <NavButton className={buttonClassName} icon={BadgePlusIcon} iconClassName="size-6" label="Create group" navigateOptions={ROUTES.createGroup} />
          <NavButton className={buttonClassName} icon={UserIcon} iconClassName="size-6" label="Profile" />
          <NavButton className={buttonClassName} icon={SunMoonIcon} iconClassName="size-6" label="Switch theme" onClick={switchTheme} />
          <NavButton className={cn(buttonClassName, 'text-destructive')} icon={LogOutIcon} iconClassName="size-6" label="Log out" onClick={logout} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
