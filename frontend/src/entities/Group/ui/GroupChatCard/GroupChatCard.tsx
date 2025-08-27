import { clsx } from 'clsx';
import { memo } from 'react';

import { Tag } from '@/shared/ui/Tag/Tag';
import type { FC } from 'react';
import type { GroupChat } from '../../model/types';
import cls from './GroupChatCard.module.scss';

interface GroupChatCardProps {
  className?: string;
  groupChat: GroupChat;
}
export const GroupChatCard: FC<GroupChatCardProps> = memo(
  (props: GroupChatCardProps) => {
    const { className, groupChat } = props;
    const { avatarUrl, title, lastMessage, time, unreadCount } = groupChat;

    return (
      <div className={clsx(cls.group_card, className)}>
        <div className={cls.avatar}>
          {avatarUrl && <img src={avatarUrl} alt="group_avatar" />}
        </div>

        <div className={cls.main}>
          <div className={cls.title}>{title}</div>
          <div className={cls.last_message}>{lastMessage}</div>
        </div>

        <div className={cls.addition}>
          <div className={cls.time}>{time}</div>
          <Tag className={cls.unread_count} styleType="outline">
            {unreadCount && unreadCount > 0 ? unreadCount : ''}
          </Tag>
        </div>
      </div>
    );
  },
);
