import type { FC, HTMLAttributes } from 'react'

import { memo } from 'react'

import { cn } from '@/shared/lib/utils'

interface GroupCardProps extends HTMLAttributes<HTMLDivElement> {
  avatarUrl?: string
  className?: string
  title: string
}

export const GroupCard: FC<GroupCardProps> = memo(
  (props: GroupCardProps) => {
    const { avatarUrl, className, title, ...rest } = props

    return (
      <div {...rest} className={cn('flex w-[360px] h-[60px] items-center cursor-pointer text-[var(--text)] rounded-[9999px_24px_24px_9999px] transition-colors duration-300 ease-in-out hover:bg-[var(--accent-second)]', className)}>
        <div className={cn('flex items-center justify-center w-[60px] h-[60px] mr-4 bg-border text-foreground rounded-full')}>
          {avatarUrl ? <img alt="group_avatar" src={avatarUrl} /> : title.slice(0, 2)}
        </div>
        <div className="font-medium">{title}</div>
      </div>
    )
  },
)
