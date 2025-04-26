import {
  HTMLAttributes,
  KeyboardEventHandler,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';

import styles from './talk.module.scss';
import config from '@/shared/config';
import { useAppSelector } from '@/shared/lib/hooks';
import Sending from '../sending';
import Message from '@/entities/message/ui';
import { apiMessage, ReadMessageSchema } from '@/entities/message/model';
import { useWS } from '@/shared/lib/context';

export interface TalkProps extends HTMLAttributes<HTMLDivElement> {}

export const Talk = ({ className }: TalkProps) => {
  const chatId = useAppSelector((state) => state.chat.id);
  const sendMessageRef = useRef<HTMLInputElement>(null);
  const { send, onMessage } = useWS();

  const [_, forceRerender] = useState(0);

  const { data, refetch }: { data: ReadMessageSchema[] | undefined; refetch: () => void } =
    apiMessage.getAllMessageChat(
      {
        chatId: chatId!,
      },
      undefined,
      { enabled: !!chatId, refetchOnMount: 'always', refetchOnWindowFocus: 'always' },
    );

  useEffect(() => {
    onMessage((data: any) => {
      //now i understand that this is not a good way
      //this rereder a page and do new fetch request to messages
      forceRerender((prev) => prev + 1);
      refetch();
    });
  }, []);

  const sentMessage: KeyboardEventHandler = (e) => {
    if (e.key !== 'Enter' || !sendMessageRef.current) {
      return;
    }

    send({
      message: sendMessageRef.current.value,
      to_chat_id: chatId,
      is_group: true,
    });

    sendMessageRef.current.value = '';
  };

  useEffect(() => {}, []);
  return data ? (
    <div className={clsx(styles.talk, className)}>
      <div className={styles.talk_content}>
        <div className={styles.top_gradient} />
        <div className={clsx(styles.message_list)}>
          {data.map((item) => (
            <Message
              className={styles.message_item}
              text={item.message}
              author={item.author!}
              time={item.created_at}
              key={item.id}
            />
          ))}
        </div>
        <div className={styles.sending_container}>
          <Sending ref={sendMessageRef} onKeyDown={sentMessage} />
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.talk_unselect}>Выберите чат</div>
  );
};

export default Talk;
