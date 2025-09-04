import { memo } from 'react';

import { clsx } from 'clsx';

import type { ReadMessageSchema } from '@/shared/api/generated';
import type { FC } from 'react';
import cls from './GroupMessage.module.scss';

interface GroupMessageProps {
  className?: string;
  message: ReadMessageSchema;
  author: string;
}

/** Докстринг */
export const GroupMessage: FC<GroupMessageProps> = memo(
  (props: GroupMessageProps) => {
    const { className, message, author } = props;

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const time_created_at = new Date(message.created_at);
    const timeStr = new Intl.DateTimeFormat('ru-RU', {
      timeZone: userTimeZone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(time_created_at);

    return (
      <div className={clsx(cls.group_message, className)}>
        <div className={cls.author}>{author}</div>
        <div className={cls.text}>{message.message}</div>
        <div className={cls.created_at}>{timeStr}</div>
      </div>
    );
  },
);
