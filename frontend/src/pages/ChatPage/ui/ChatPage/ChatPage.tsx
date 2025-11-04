import type { FC } from 'react';

import { useParams } from '@tanstack/react-router';
import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import type { WsInMessageSchema, WsOutDataSchema } from '@/shared/api/generated';

import { useWS } from '@/app/providers/WebsocketProvider';
import { MessageList } from '@/entities/Message/ui/MessageList/MessageList';
import { Separator } from '@/shared/ui/separator';

import { ChatGroupList } from '../ChatGroupList/ChatGroupList';
import { ChatInput } from '../ChatInput/ChatInput';
import { ChatNavigation } from '../ChatNavigation';
import cls from './ChatPage.module.scss';


interface ChatPageProps {
  className?: string;
}

export const ChatPage: FC<ChatPageProps> = (props: ChatPageProps) => {
  const { className } = props;
  const { groupId, groupType: _groupType } = useParams({ from: '/group/$groupType/{-$groupId}' });
  const ws = useWS();
  const groupType = _groupType as 'personal' | 'simple';
  const loadingToastId = useRef<null | string>(null);
  const [onMessage, setOnMessage] = useState<(data: WsOutDataSchema) => void>(() => {});

  useEffect(() => {
    if (!ws.isConnected) {
      if (!loadingToastId.current) {
        loadingToastId.current = toast.loading('Connecting...');
      }
    } else {
      if (loadingToastId.current) {
        toast.dismiss(loadingToastId.current);
        loadingToastId.current = null;
      }
    }
  }, [ws.isConnected]);

  useEffect(() => {
    if (ws.isConnected) {
      ws.onMessage(onMessage);
    }
  }, [ws, onMessage]);

  const handleSend = (value: string) => {
    const ws_data: WsInMessageSchema = {
      data: { message: value, to_group_id: groupId! },
      event: 'message',
    };
    ws.send(ws_data);
  };

  return (
    <div className={clsx(cls.chat, className)}>
      <Toaster />

      <ChatNavigation />
      <ChatGroupList className={cls.group_list} groupType={groupType} />
      <Separator orientation='vertical'/>

      {groupId ? (
        <div className={cls.selected_chat}>
          <MessageList groupId={groupId} initOnMessage={setOnMessage}/>
          <ChatInput onSend={handleSend} placeholder="Enter message" />
        </div>
      ) : (
        <div className={cls.unselected_chat}>Choose group</div>
      )}
    </div>
  );
};
