import { memo } from 'react';

import { clsx } from 'clsx';

import { GroupChatCard } from '@/entities/Group';
import { groupChatTest } from '@/entities/Group/model/test';
import { Settings } from 'lucide-react';
import type { FC } from 'react';
import cls from './ChatPage.module.scss';

interface ChatPageProps {
  className?: string;
}

/** Докстринг */
export const ChatPage: FC<ChatPageProps> = memo((props: ChatPageProps) => {
  const { className } = props;

  return (
    <div className={clsx(cls.chat, className)}>
      <div className={cls.control_panel}>
        <Settings size={28} strokeWidth={1.6} />
      </div>
      <div className={cls.group_list}>
        {Array(15)
          .fill(1)
          .map((_, idx) => (
            <GroupChatCard key={idx} groupChat={groupChatTest} />
          ))}
      </div>
      <div className={cls.unselected_chat}>Выберите чат</div>
    </div>
  );
});
