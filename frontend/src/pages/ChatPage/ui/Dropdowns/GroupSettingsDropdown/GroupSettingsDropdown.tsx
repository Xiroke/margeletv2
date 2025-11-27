import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { memo } from 'react'

import { autoGroupQueryProps } from '@/entities/AutoGroup/api'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu'

export const GroupSettingsDropdown = memo(
  ({ children, groupId }: { children: React.ReactNode, groupId: string }) => {
    const navigate = useNavigate()

    const leaveGroup = useMutation(autoGroupQueryProps.leave())

    const handleLeaveGroup = () => {
      const fetchLeaveGroup = async () => {
        await leaveGroup.mutateAsync({ path: { group_id: groupId } })
        navigate({ to: '..' })
      }
      fetchLeaveGroup()
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuItem onClick={handleLeaveGroup}>
            Leave
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
)
