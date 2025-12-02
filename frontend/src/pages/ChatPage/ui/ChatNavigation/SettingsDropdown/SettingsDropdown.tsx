import type { ReactNode } from 'react'

import { useState } from 'react'

import { useLogout } from '@/features/auth/api'
import { Button } from '@/shared/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui/drawer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'

export interface SettingsMenuProps {
  children: ReactNode
  className?: string
  setIsProfileDialogOpen: (open: boolean) => void
}

export const SettingsDropdown = ({ children, setIsProfileDialogOpen }: SettingsMenuProps) => {
  const logout = useLogout()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuItem onClick={() => setIsProfileDialogOpen(true)}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const SettingsDrawer = ({ children, setIsProfileDialogOpen }: SettingsMenuProps) => {
  const logout = useLogout()
  const [open, setOpen] = useState(false)

  const handleProfileClick = () => {
    setOpen(false)
    setIsProfileDialogOpen(true)
  }

  const handleLogoutClick = () => {
    setOpen(false)
    logout()
  }

  return (
    <Drawer onOpenChange={setOpen} open={open}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Menu</DrawerTitle>
          </DrawerHeader>

          <div className="p-4 flex flex-col gap-4">
            <Button
              className="w-full justify-start h-12 text-lg"
              onClick={handleProfileClick}
              variant="outline"
            >
              Profile
            </Button>

            <Button
              className="w-full justify-start h-12 text-lg"
              onClick={handleLogoutClick}
              variant="destructive"
            >
              Log out
            </Button>
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button className="w-full" variant="ghost">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
