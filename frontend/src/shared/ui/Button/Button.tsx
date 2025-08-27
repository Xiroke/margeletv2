import { memo } from 'react';

import { clsx } from 'clsx';

import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import cls from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  styleType?: 'none' | 'default' | 'text' | 'outline' | 'inverse';
  size: 'nosize' | 'sm' | 'md';
  isFull?: boolean;
  children?: ReactNode;
}

/** Докстринг */
export const Button: FC<ButtonProps> = memo((props: ButtonProps) => {
  const {
    className,
    size,
    styleType = 'text',
    isFull = false,
    children = '',
    ...rest
  } = props;

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
  );
});
