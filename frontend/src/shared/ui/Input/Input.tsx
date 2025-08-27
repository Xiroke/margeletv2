import { clsx } from "clsx"
import { memo } from "react"

import type { FC, InputHTMLAttributes } from "react"
import cls from "./Input.module.scss"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  label?: string
  error?: string
  isFull?: boolean
}

/** Универсальный Input */
export const Input: FC<InputProps> = memo((props: InputProps) => {
  const { className, label, error, isFull = false, ...rest } = props

  return (
    <div className={clsx(cls.wrapper, isFull && cls.full, className)}>
      {label && <label className={cls.label}>{label}</label>}
      <input {...rest} className={clsx(cls.input, error && cls.error)} />
      {error && <span className={cls.errorMessage}>{error}</span>}
    </div>
  )
})
