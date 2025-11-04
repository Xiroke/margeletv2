
import type { FC } from 'react';

import { clsx } from 'clsx';
import { memo } from 'react';

import cls from './Separator.module.scss';

interface SeparatorProps {
  backgroundColor?: string;
  className?: string;
  isVertical?: boolean;
  margin?: string;
  thickness?: string;
}

export const Separator: FC<SeparatorProps> = memo((props: SeparatorProps) => {
  const {
    backgroundColor = 'var(--accent-primary)',
    className,
    isVertical = false,
    margin = '8px 0',
  } = props;

  return (
    <div
      className={clsx(
        cls.separator,
        isVertical ? cls.vertical : cls.horizontal,
        className
      )}
      style={{
        backgroundColor,
        margin,
      }}
    />
  );
});
