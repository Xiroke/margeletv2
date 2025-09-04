import { clsx } from 'clsx';

import { useWS } from '@/app/providers/WebsocketProvider';
import { GroupChatCard } from '@/entities/Group';
import { groupChatTest } from '@/entities/Group/model/test';
import { messageQueryProps } from '@/entities/Message/api';
import { GroupMessage } from '@/entities/Message/ui/GroupMessage/GroupMessage';
import { personalGroupQueryProps } from '@/entities/PersonalGroup/api';
import { simpleGroupQueryProps } from '@/entities/SimpleGroup/api';
import { userQueryProps } from '@/entities/User/api';
import type {
  ReadMessageSchema,
  WsInMessageSchema,
  WsOutDataSchema,
} from '@/shared/api/generated';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useParams } from '@tanstack/react-router';
import { Settings, UserIcon, UsersIcon } from 'lucide-react';
import type { FC, KeyboardEventHandler } from 'react';
import { useEffect, useMemo, useState } from 'react';
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
export const ChatPage: FC<ChatPageProps> = (props: ChatPageProps) => {
  const { className } = props;
  const [knownUsers, setKnownUsers] = useState<Record<string, string>>({});

  const { groupType, groupId } = useParams({
    from: '/$groupType/{-$groupId}',
  });

  const ws = useWS();

  const queryClient = useQueryClient();
  const { data: groups } = useQuery({
    ...groupQueryProps[groupType](),
  });

  const getLatestMessageQuery = messageQueryProps.getLatestMessageOpt({
    path: { group_id: groupId! },
  });

  const { data: messages } = useQuery({
    ...getLatestMessageQuery,
    enabled: !!groupId,
  });

  const unknowbUsers = useMemo(() => {
    if (!messages) return new Set<string>();

    return new Set(
      messages
        .filter((message) => message.user_id && !knownUsers[message.user_id])
        .map((message) => message.user_id),
    );
  }, [messages, knownUsers]);

  const { mutateAsync: usernamesMut } = useMutation({
    ...userQueryProps.getUsernamesByIdMut(),
  });

  const onEnter: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key != 'Enter') return;

    const value = e.currentTarget.value;
    e.currentTarget.value = '';

    const ws_data: WsInMessageSchema = {
      event: 'message',
      data: { message: value, to_group_id: groupId! },
    };

    ws.send(ws_data);
  };

  const onMessageCallback = (data: WsOutDataSchema) => {
    if (data.event == 'message') {
      const ws_inner_data = data.data as ReadMessageSchema;

      queryClient.setQueryData(getLatestMessageQuery.queryKey, (prev) => {
        if (prev) {
          return [ws_inner_data, ...prev];
        } else {
          return [ws_inner_data];
        }
      });
    }
  };

  useEffect(() => {
    ws.onMessage(onMessageCallback);
  }, []);

  useEffect(() => {
    console.log(unknowbUsers);
    if (unknowbUsers.size === 0) return;

    const fetchUsername = async () => {
      const idToUsername = await usernamesMut({
        body: Array.from(unknowbUsers),
      });
      setKnownUsers(idToUsername);
    };

    fetchUsername();
  }, [unknowbUsers]);

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
          <ChatInput onKeyDown={onEnter} />
          {messages &&
            messages.map((message) => (
              <GroupMessage
                key={message.id}
                message={message}
                author={knownUsers[message.user_id]}
              />
            ))}
        </div>
      ) : (
        <div className={cls.unselected_chat}>Выберите группу</div>
      )}
    </div>
  );
};
