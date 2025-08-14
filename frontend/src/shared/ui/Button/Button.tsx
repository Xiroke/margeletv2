import { memo } from 'react'
import type { FC, HTMLAttributes, ReactNode } from 'react'

import { clsx } from 'clsx'

import cls from './Button.module.scss'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string
  styleType?: 'none' | 'default' | 'text' | 'outline' | 'inverse'
  size?: 'nosize' | 'sm' | 'md'
  isFull?: boolean
  children?: ReactNode
}

/** Докстринг */
export const Button: FC<ButtonProps> = memo((props: ButtonProps) => {
  const {
    className,
    styleType = 'text',
    size = 'sm',
    isFull = false,
    children = '',
    ...rest
  } = props

  return (
    <button
      {...rest}
      className={clsx(
        cls.button,
        cls[styleType],
        cls[size],
        isFull && cls.full,
        className,
      )}
    >
      {children}
    </button>
  )
})
