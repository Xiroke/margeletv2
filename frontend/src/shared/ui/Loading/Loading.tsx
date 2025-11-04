import type {FC} from 'react';

import { clsx } from 'clsx';
import {  memo } from 'react';

import cls from './Loading.module.scss';

interface LoadingProps {
  className?: string;
  color?: 'primary' | 'white';
  size?: 'large' | 'medium' | 'small';
  variant?: 'dots' | 'spinner';
}

export const Loading: FC<LoadingProps> = memo((props) => {
  const {
    className,
    color = 'white',
    size = 'medium',
    variant = 'spinner',
  } = props;
  if (variant === 'dots') {
    return (
      <div className={cls.dots}>
        <div className={cls.dot} />
        <div className={cls.dot} />
        <div className={cls.dot} />
      </div>
    );
  }

  const loadingClassName = clsx([
    cls.loading,
    cls[size],
    cls[color],
    cls[variant],
    className,
  ]);

  return <div className={loadingClassName} />;
});
