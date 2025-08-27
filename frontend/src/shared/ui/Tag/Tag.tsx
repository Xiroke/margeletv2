import { memo } from 'react';

import { clsx } from 'clsx';

import type { FC, HTMLAttributes } from 'react';
import cls from './Tag.module.scss';

interface TagProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  styleType: 'default' | 'text' | 'outline' | 'inverse';
}

/** Докстринг */
export const Tag: FC<TagProps> = memo((props: TagProps) => {
  const { className, styleType, children } = props;

  return (
    <div className={clsx(cls.tag, cls[styleType], className)}>{children}</div>
  );
});
