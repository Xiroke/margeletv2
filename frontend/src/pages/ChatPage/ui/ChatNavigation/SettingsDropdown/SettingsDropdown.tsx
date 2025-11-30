import type { FC } from 'react'

import { Settings } from 'lucide-react'
import { memo } from 'react'

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

export const SettingsDropdown: FC<SettingsDropdownProps> = memo(
  (props: SettingsDropdownProps) => {
    const { setIsProfileDialogOpen } = props
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
  })
