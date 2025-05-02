import {
  HTMLAttributes,
  KeyboardEventHandler,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import clsx from "clsx";

import styles from "./talk.module.scss";
import config from "@/shared/config";
import { useAppSelector } from "@/shared/lib/hooks";
import Sending from "../sending";
import Message from "@/entities/message/ui";
import { apiMessage, ReadMessageSchema } from "@/entities/message/model";
import { useWS } from "@/shared/lib/context";
import { useQueryClient } from "@tanstack/react-query";

export interface TalkProps extends HTMLAttributes<HTMLDivElement> {}

export const Talk = ({ className }: TalkProps) => {
  const queryClient = useQueryClient();
  const chatId = useAppSelector((state) => state.chat.id);
  const sendMessageRef = useRef<HTMLInputElement>(null);
  const { send, onMessage } = useWS();

  const [_, forceRerender] = useState(0);

  const {
    data: messages,
    refetch,
  }: { data: ReadMessageSchema[] | undefined; refetch: () => void } =
    apiMessage.getAllMessageChat(
      {
        chatId: chatId!,
      },
      undefined,
      {
        enabled: !!chatId,
      }
    );

  // Пример изменения данных
  const updateMessage = (newMessage: ReadMessageSchema) => {
    // add new message to messages
    queryClient.setQueryData(
      [apiMessage.getAllMessageChatKey, { chatId }],
      (oldData: ReadMessageSchema[] | undefined) => {
        return oldData ? [...oldData, newMessage] : [newMessage];
      }
    );
  };

  useEffect(() => {
    // add call function when get a message
    if (!messages) {
      console.log(messages);
    }

    onMessage((message: any) => {
      if (!message && message.id != undefined) {
        return;
      }

      updateMessage(message);
    });
  }, [messages]);

  const sentMessage: KeyboardEventHandler = (e) => {
    if (e.key !== "Enter" || !sendMessageRef.current) {
      return;
    }

    send({
      message: sendMessageRef.current.value,
      to_chat_id: chatId,
      is_group: true,
    });

    sendMessageRef.current.value = "";
  };

  useEffect(() => {}, []);
  return messages ? (
    <div className={clsx(styles.talk, className)}>
      <div className={styles.talk_content}>
        <div className={styles.top_gradient} />
        <div className={clsx(styles.message_list)}>
          {messages.length != 0 &&
            messages.map((item) => (
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
