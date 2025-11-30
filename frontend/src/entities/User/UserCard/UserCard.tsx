import type { FC } from 'react'

import { useMutation } from '@tanstack/react-query'
import { clsx } from 'clsx'
import { EllipsisIcon } from 'lucide-react'
import { ResultAsync } from 'neverthrow'
import { memo } from 'react'
import { toast } from 'sonner'

import { personalGroupQueryProps } from '@/entities/PersonalGroup/api'
import { AppAvatar } from '@/shared/ui/AppAvatar'
import { Button } from '@/shared/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu'

interface UserCardProps {
  className?: string
  id: string
  username?: string
}

const ActionsDropdown = ({ id }: { id: string }) => {
  const personalGroupCreate = useMutation(personalGroupQueryProps.create())

  const fetchCreatePersonalGroup = async () => {
    const result = await ResultAsync.fromPromise(
      personalGroupCreate.mutateAsync({ path: { other_user_id: id } }),
      error => error as { detail: string },
    )

    result.match(
      () => toast.success('Personal group created'),
      err => toast.error(err.detail),
    )
  }

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
        <DropdownMenuItem onClick={fetchCreatePersonalGroup}>
          Create personal group
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const UserCard: FC<UserCardProps> = memo(
  (props: UserCardProps) => {
    const { className, username } = props

    return (
      <div className={clsx(className, 'w-full h-14 flex items-center p-0 pr-4 cursor-pointer justify-between')}>
        <div className="flex gap-2 items-center">
          <AppAvatar className="mr-4" fallback={username} size={52} />
          <div className="ml-4">
            <p className="text-sm font-medium leading-none">{username}</p>
          </div>
        </div>
        <ActionsDropdown id={props.id} />
      </div>
    )
  },
)
