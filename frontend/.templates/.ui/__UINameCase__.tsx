import type { FC } from 'react'

import { memo } from 'react'

import { cn } from '@/shared/lib/utils'

interface __UINameCase__Props {
  className?: string
}

export const __UINameCase__: FC<__UINameCase__Props> = memo(
  (props: __UINameCase__Props) => {
    const { className } = props

    return <div className={cn(className)}>test</div>
  },
)
