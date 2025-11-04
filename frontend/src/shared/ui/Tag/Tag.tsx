import type { FC, HTMLAttributes } from 'react';

import { clsx } from 'clsx';
import { memo } from 'react';

import cls from './Tag.module.scss';

interface TagProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant: 'default' | 'inverse' | 'outline' | 'text';
}

export const Tag: FC<TagProps> = memo((props: TagProps) => {
  const { children, className, variant } = props;

  return (
    <div className={clsx(cls.tag, cls[variant], className)}>{children}</div>
  );
});
