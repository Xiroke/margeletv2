import type { FC } from 'react'

import { clsx } from 'clsx'
import { memo } from 'react'

import cls from './__UINameCase__.module.scss'

interface __UINameCase__Props {
  className?: string
}

export const __UINameCase__: FC<__UINameCase__Props> = memo(
  (props: __UINameCase__Props) => {
    const { className } = props

    return <div className={clsx(cls.__uiNameCase__, className)}>test</div>
  },
)
