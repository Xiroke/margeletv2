import type { FC } from 'react'

import { clsx } from 'clsx'
import { memo } from 'react'

import type { ReadMessageSchema } from '@/shared/api/generated'

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'

import cls from './GroupMessage.module.scss'

interface GroupMessageProps {
  author: string | undefined
  className?: string
  message: ReadMessageSchema
}

export const GroupMessage: FC<GroupMessageProps> = memo(
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
            <span className={cls.created_at}>{timeStr}</span>
          </div>
        </div>
      </div>
    )
  },
)
