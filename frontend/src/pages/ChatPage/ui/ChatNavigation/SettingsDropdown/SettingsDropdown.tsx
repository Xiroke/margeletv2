import { Settings } from 'lucide-react'

import { useLogout } from '@/features/auth/api'
import { Button } from '@/shared/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'

export interface SettingsDropdownProps {
  className?: string
  setIsProfileDialogOpen: (open: boolean) => void
}

export const SettingsDropdown = ({ setIsProfileDialogOpen, ...props }: SettingsDropdownProps) => {
  const logout = useLogout()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          {...props}
          variant="ghost"
        >
          <Settings className="size-6" size={24} strokeWidth={1.6} />
        </Button>
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
