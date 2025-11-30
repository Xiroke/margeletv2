import type { FC } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { clsx } from 'clsx'
import { CopyIcon, EditIcon, TrashIcon } from 'lucide-react'
import { memo } from 'react'
import { useCopyToClipboard } from 'usehooks-ts'

import type { MessageRead } from '@/shared/api/generated'

import { cn } from '@/shared/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/shared/ui/context-menu'

import { messageQueryProps } from '../../api'
import cls from './GroupMessage.module.scss'

interface GroupMessageProps {
  author: string | undefined
  className?: string
  message: MessageRead
  onEdit: () => void
}

export const GroupMessage = (props: GroupMessageProps) => {
  const { author, className, message, onEdit, ...rest } = props

  const queryClient = useQueryClient()

  const deleteMessage = useMutation(messageQueryProps.delete())

  const handleDelete = () => {
    const fetchDelete = async () => {
      await deleteMessage.mutateAsync({ path: { message_id: message.id } })
      queryClient.invalidateQueries({ queryKey: messageQueryProps.getCursorMessagesInfKey({ path: { group_id: message.to_group_id } }) })
    }

    fetchDelete()
  }

  const [, copyToClipboard] = useCopyToClipboard()

  return (
    <ContextMenu>
      <ContextMenuTrigger className="w-full">
        <GroupMessageContent {...rest} author={author} message={message} onEdit={onEdit} />
      </ContextMenuTrigger>
      <ContextMenuContent className={cn('w-52', className)}>
        <ContextMenuItem onClick={() => onEdit()}>
          <EditIcon />
          Edit
        </ContextMenuItem>
        <ContextMenuItem onClick={() => copyToClipboard(message.message)}>
          <CopyIcon />
          Copy
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDelete}>
          <TrashIcon />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export const GroupMessageContent: FC<GroupMessageProps> = memo(
  (props: GroupMessageProps) => {
    const { author, className, message } = props

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const time_created_at = new Date(message.created_at)
    const timeStr = new Intl.DateTimeFormat('ru-RU', {
      hour: '2-digit',
      hour12: false,
      minute: '2-digit',
      timeZone: userTimeZone,
    }).format(time_created_at)

    return (
      <div className={clsx(cls.group_message, className)}>
        <Avatar className="size-10">
          <AvatarImage src="/undefined" />
          <AvatarFallback>{author?.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className={cls.message}>
          {author && <span className={cls.author}>{author}</span>}

          <div className={cls.message_row}>
            <span className={cls.text}>{message.message}</span>
            <span className={cn(cls.created_at, 'text-foreground/40')}>
              {message.is_edited && '(edited)'}
              {' '}
              {timeStr}
            </span>
          </div>
        </div>
      </div>
    )
  },
)
