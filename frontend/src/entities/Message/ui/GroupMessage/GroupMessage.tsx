import { memo } from 'react';

import { clsx } from 'clsx';

import type { ReadMessageSchema } from '@/shared/api/generated';
import type { FC } from 'react';
import cls from './GroupMessage.module.scss';

interface GroupMessageProps {
  className?: string;
  message: ReadMessageSchema;
}

/** Докстринг */
export const GroupMessage: FC<GroupMessageProps> = memo(
  (props: GroupMessageProps) => {
    const { className, message } = props;

    return (
      <div className={clsx(cls.group_message, className)}>
        <div className={cls.author}>{message.id}</div>
        <div className={cls.text}>{message.message}</div>
        <div className={cls.created_at}>{message.created_at}</div>
      </div>
    );
  },
);
