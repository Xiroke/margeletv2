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
import type { FC } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { ChatInput } from '../ChatInput/ChatInput';
import cls from './ChatPage.module.scss';

interface ChatPageProps {
  className?: string;
}

/** Докстринг */
export const ChatPage: FC<ChatPageProps> = (props: ChatPageProps) => {
  const { className } = props;
  const [knownUsers, setKnownUsers] = useState<Record<string, string>>({});

  const { groupType, groupId } = useParams({
    from: '/$groupType/{-$groupId}',
  });

  const ws = useWS();

  const queryClient = useQueryClient();

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

  const onSend = (value: string) => {
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
        <ChatGroupList groupType={groupType} />
      </div>

      <div className={cls.chat_line} />
      {groupId ? (
        <div className={cls.selected_chat}>
          {/* the order of html elements is reversed */}
          <ChatInput onSend={onSend} placeholder="Сообщение" />
          {messages &&
            messages.map((message, idx) => (
              <GroupMessage
                key={message.id}
                message={message}
                // if there are multiple messages in a row from the wrong user,
                // then only the first message will have a name.
                author={
                  !messages[idx + 1] ||
                  messages[idx + 1].user_id != message.user_id
                    ? knownUsers[message.user_id]
                    : undefined
                }
              />
            ))}
        </div>
      ) : (
        <div className={cls.unselected_chat}>Выберите группу</div>
      )}
    </div>
  );
};

const groupQueryProps = {
  simple: simpleGroupQueryProps.getMySimpleGroups,
  personal: personalGroupQueryProps.getMyPersonalGroups,
};

interface ChatGroupListProps {
  className?: string;
  groupType: 'simple' | 'personal';
}

export const ChatGroupList: FC<ChatGroupListProps> = (
  props: ChatGroupListProps,
) => {
  const { groupType } = props;
  const { data: groups } = useQuery({
    ...groupQueryProps[groupType](),
  });

  return (
    <>
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
    </>
  );
};
