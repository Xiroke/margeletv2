import { memo } from 'react'

import { clsx } from 'clsx'

import cls from './Login.module.scss'

import type { FC } from 'react'

interface LoginProps {
  className?: string
}

/** Докстринг */
export const Login: FC<LoginProps> = memo((props: LoginProps) => {
  const { className } = props

  return <div className={clsx(cls.Login, className)}></div>
})
