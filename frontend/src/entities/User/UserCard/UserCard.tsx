import type { FC } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { clsx } from 'clsx'
import { EllipsisIcon } from 'lucide-react'
import { memo } from 'react'

import { Button } from '@/shared/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu'

interface UserCardProps {
  className?: string
  id: string
  onClick?: () => void
  username?: string
}

const ActionsDropdown = ({ onClick }: { onClick?: () => void }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
        >
          <EllipsisIcon className="size-6" size={24} strokeWidth={1.6} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuItem onClick={_ => onClick?.()}>
          Create personal group
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const UserCard: FC<UserCardProps> = memo(
  (props: UserCardProps) => {
    const { className, onClick, username } = props

    return (
      <div className={clsx(className, 'w-full h-14 flex items-center p-0 pr-4 cursor-pointer justify-between')}>
        <div className="flex gap-2 items-center">
          <Avatar className="w-14 h-14">
            <AvatarImage src="#" />
            <AvatarFallback>{username?.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <p className="text-sm font-medium leading-none">{username}</p>
          </div>
        </div>
        <ActionsDropdown onClick={onClick} />
      </div>
    )
  },
)
