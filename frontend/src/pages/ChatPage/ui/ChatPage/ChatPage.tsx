import { memo } from 'react';

import { clsx } from 'clsx';

import { GroupChatCard } from '@/entities/Group';
import { groupChatTest } from '@/entities/Group/model/test';
import { simpleGroupQueryProps } from '@/entities/SimpleGroup/api';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from '@tanstack/react-router';
import { Settings } from 'lucide-react';
import type { FC } from 'react';
import cls from './ChatPage.module.scss';

interface ChatPageProps {
  className?: string;
}

/** Докстринг */
export const ChatPage: FC<ChatPageProps> = memo((props: ChatPageProps) => {
  const { className } = props;
  const { groupId } = useParams({ from: '/chat/{-$groupId}' });

  const { data: groups } = useQuery({
    ...simpleGroupQueryProps.getMySimpleGroups(),
  });

  return (
    <div className={clsx(cls.chat, className)}>
      <div className={cls.control_panel}>
        <Settings size={28} strokeWidth={1.6} />
      </div>
      <div className={cls.group_list}>
        {groups
          ? groups.map((group, idx) => (
              <Link to="." params={{ groupId: group.id }} className="aSimple">
                <GroupChatCard
                  key={idx}
                  groupChat={{ ...groupChatTest, title: group.title }}
                />
              </Link>
            ))
          : 'Нет групп'}
      </div>
      {groupId ? (
        <>Сообщения</>
      ) : (
        <div className={cls.unselected_chat}>Выберите чат</div>
      )}
    </div>
  );
});
