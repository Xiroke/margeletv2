import type { FC } from 'react';

import { clsx } from 'clsx';
import { memo } from 'react';

import { cn } from '@/shared/lib/utils';
import { Badge } from '@/shared/ui/badge';

import type { GroupChat } from '../../model/types';

import cls from './GroupChatCard.module.scss';

interface GroupChatCardProps {
  className?: string;
  groupChat: GroupChat;
}
export const GroupChatCard: FC<GroupChatCardProps> = memo(
  (props: GroupChatCardProps) => {
    const { className, groupChat } = props;
    const { avatarUrl, lastMessage, time, title, unreadCount } = groupChat;

    return (
      <div className={clsx(cls.group_card, className)}>
        <div className={cn(cls.avatar, 'flex items-center justify-center')}>
          {avatarUrl ? <img alt="group_avatar" src={avatarUrl} /> : title.slice(0, 2)}
        </div>

        <div className={cls.main}>
          <div className={cls.title}>{title}</div>
          <div className={cls.last_message}>{lastMessage}</div>
        </div>

        <div className={cls.addition}>
          <div className={cls.time}>{time}</div>
          <Badge className={cls.unread_count} variant="secondary">
            {unreadCount && unreadCount > 0 ? unreadCount : ''}
          </Badge>
        </div>
      </div>
    );
  }
);
