import { memo } from 'react';

import { clsx } from 'clsx';

import { GroupChatCard } from '@/entities/Group';
import { groupChatTest } from '@/entities/Group/model/test';
import { messageQueryProps } from '@/entities/Message/api';
import { GroupMessage } from '@/entities/Message/ui/GroupMessage/GroupMessage';
import { personalGroupQueryProps } from '@/entities/PersonalGroup/api';
import { simpleGroupQueryProps } from '@/entities/SimpleGroup/api';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from '@tanstack/react-router';
import { Settings, UserIcon, UsersIcon } from 'lucide-react';
import type { FC } from 'react';
import { ChatInput } from '../ChatInput/ChatInput';
import cls from './ChatPage.module.scss';

interface ChatPageProps {
  className?: string;
}

const groupQueryProps = {
  simple: simpleGroupQueryProps.getMySimpleGroups,
  personal: personalGroupQueryProps.getMyPersonalGroups,
};

/** Докстринг */
export const ChatPage: FC<ChatPageProps> = memo((props: ChatPageProps) => {
  const { className } = props;
  const { groupType, groupId } = useParams({
    from: '/$groupType/{-$groupId}',
  });

  const { data: groups } = useQuery({
    ...groupQueryProps[groupType](),
  });

  const { data: messages } = useQuery({
    ...messageQueryProps.getLatestMessageOpt({ path: { group_id: groupId } }),
    enabled: !!groupId,
  });

  return (
    <div className={clsx(cls.chat, className)}>
      <div className={cls.control_panel}>
        <Link
          className="no_link"
          to="/$groupType/{-$groupId}"
          params={(prev) => ({ ...prev, groupType: 'personal' })}
        >
          <UserIcon size={28} strokeWidth={1.6} />
        </Link>
        <Link
          className="no_link"
          to="/$groupType/{-$groupId}"
          params={(prev) => ({ ...prev, groupType: 'simple' })}
        >
          <UsersIcon size={28} strokeWidth={1.6} />
        </Link>

        <Settings size={28} strokeWidth={1.6} />
      </div>
      <div className={cls.group_list}>
        {groups
          ? groups.map((group, idx) => (
              <Link
                to="."
                params={{ groupId: group.id }}
                className="aSimple"
                key={group.id}
              >
                <GroupChatCard
                  key={idx}
                  groupChat={{ ...groupChatTest, title: group.title }}
                />
              </Link>
            ))
          : 'Нет групп'}
      </div>
      <div className={cls.chat_line} />
      {groupId ? (
        <div className={cls.selected_chat}>
          {messages &&
            messages.map((message) => (
              <GroupMessage key={message.id} message={message} />
            ))}
          <ChatInput />
        </div>
      ) : (
        <div className={cls.unselected_chat}>Выберите группу</div>
      )}
    </div>
  );
});
