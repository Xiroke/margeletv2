import type { HTMLAttributes } from 'react'

import { cn } from '@/shared/lib/utils'
import { AppAvatar } from '@/shared/ui/AppAvatar'

interface GroupCardProps extends HTMLAttributes<HTMLDivElement> {
  avatarUrl?: string
  className?: string
  title: string
}

export const GroupCard = ({ avatarUrl, className, title, ...rest }: GroupCardProps) => {
  return (
    <div {...rest} className={cn('flex w-[360px] h-[60px] items-center cursor-pointer text-[var(--text)] rounded-[9999px_24px_24px_9999px] transition-colors duration-300 ease-in-out hover:bg-[var(--accent-second)]', className)}>
      <AppAvatar avatarUrl={avatarUrl} className="mr-4" fallback={title} size={52} />
      <div className="font-medium">{title}</div>
    </div>
  )
}
