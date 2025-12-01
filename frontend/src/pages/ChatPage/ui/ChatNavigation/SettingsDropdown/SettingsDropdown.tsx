import type { ReactNode } from 'react'

import { useLogout } from '@/features/auth/api'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'

export interface SettingsDropdownProps {
  children: ReactNode
  className?: string
  setIsProfileDialogOpen: (open: boolean) => void
}

export const SettingsDropdown = ({ children, setIsProfileDialogOpen }: SettingsDropdownProps) => {
  const logout = useLogout()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
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
