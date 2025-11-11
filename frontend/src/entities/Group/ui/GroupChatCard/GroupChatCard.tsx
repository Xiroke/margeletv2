import type { FC } from 'react'

import { clsx } from 'clsx'
import { memo } from 'react'

import { cn } from '@/shared/lib/utils'
import { Skeleton } from '@/shared/ui/skeleton'

import type { GroupChat } from '../../model/types'

import cls from './GroupChatCard.module.scss'

interface GroupChatCardProps {
  active: boolean
  className?: string
  groupChat: GroupChat
}

export const GroupChatCardSkeleton = memo(({ className}: { className?: string }) => {
  return (
    <div className={clsx(cls.group_card, className)}>
      <Skeleton className="w-15 h-15 mr-4 rounded-full" />
      <div className={cls.main}>
        <Skeleton className="w-50 h-4" />
        <Skeleton className="w-50 h-3" />
      </div>
      <div className={cls.addition}>
        <Skeleton className="w-6 h-4" />
        <Skeleton className="w-6 h-4" />
      </div>
    </div>
  )
})

export const GroupChatCard: FC<GroupChatCardProps> = memo(
  (props: GroupChatCardProps) => {
    const { active, className, groupChat } = props
    const { avatarUrl, lastMessage, time, title = 'Group', unreadCount } = groupChat

    return (
      <div className={clsx(cls.group_card, active && cls.active, className)}>
        <div className={cn(cls.avatar, 'flex items-center justify-center')}>
          {avatarUrl ? <img alt="group_avatar" src={avatarUrl} /> : title.slice(0, 2)}
        </div>

        <div className={cls.main}>
          <div className={cls.title}>{title}</div>
          {/* <div className={cls.last_message}>{lastMessage}</div> */}
        </div>

        {/* <div className={cn(cls.addition, 'mt-auto mb-1 mr-2')}>
          <div className={cls.time}>{time}</div>
          <Badge className={cls.unread_count} variant={active ? 'default' : 'secondary'}>
            {unreadCount && unreadCount > 0 ? unreadCount : ''}
          </Badge>
        </div> */}
      </div>
    )
  },
)
