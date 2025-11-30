import type { FC } from 'react'

import { memo } from 'react'

import { cn } from '@/shared/lib/utils'

interface AppAvatarProps {
  avatarUrl?: null | string
  className?: string
  fallback?: string
  size?: number
}

export const AppAvatar: FC<AppAvatarProps> = memo(({
  avatarUrl,
  className,
  fallback,
  size = 40,
}) => {
  return (
    <div
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full bg-muted items-center justify-center',
        className,
      )}
      style={{
        fontSize: Math.floor(size * 0.3),
        height: size,
        width: size,
      }}
    >
      {avatarUrl
        ? (
            <img
              alt="Avatar"
              className="aspect-square h-full w-full object-cover"
              src={avatarUrl}
            />
          )
        : (
            <span className="uppercase text-muted-foreground leading-none select-none">
              {fallback?.slice(0, 2) ?? '?'}
            </span>
          )}
    </div>
  )
})
