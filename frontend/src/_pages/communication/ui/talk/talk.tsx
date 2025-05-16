"use client";
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
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
import Sending from "../sending";
import Message from "@/entities/message/ui";
import { apiMessage, ReadMessageSchema } from "@/entities/message/model";
import { useWS } from "@/shared/lib/context";
import { useQueryClient } from "@tanstack/react-query";
import useMediaQuery from "@/shared/lib/hooks/use_media_query";

export interface TalkProps extends HTMLAttributes<HTMLDivElement> {}

export const Talk = ({ className }: TalkProps) => {
  const queryClient = useQueryClient();
  const chatId = useAppSelector((state) => state.chat.id);
  const sendMessageRef = useRef<HTMLInputElement>(null);
  const { send, onMessage } = useWS();
  const isLaptop = useMediaQuery("(min-width: 1024px)");
  const [toBottom, setToBottom] = useState(true);
  const [messages, setMessages] = useState();

  const { data: messages }: { data: ReadMessageSchema[] | undefined } =
    apiMessage.getAllMessageChat(
      {
        chatId: chatId!,
      },
      undefined,
      {
        enabled: !!chatId,
      }
    );

  const messagesRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    // event when get new message we scroll to the end messages
    const messages = messagesRef.current;
    if (!messages) return;
    const { scrollTop, scrollHeight, clientHeight } = messages;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    console.log(
      scrollHeight,
      scrollTop,
      clientHeight,
      scrollHeight - scrollTop - clientHeight
    );
    if (distanceFromBottom >= 500) {
      return;
    }

    messages.scrollTo({
      top: messages.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const messages = messagesRef.current;
    if (messages == null) {
      return;
    }

    if (toBottom == false) {
      handleScroll();
    } else {
      //scroll to bottom whem open page
      setToBottom(false);
      messages.scrollTo({
        top: messages.scrollHeight,
      });
    }

    //scroll to bottom if its need
  }, [messages]);

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
    onMessage((message: any) => {
      if (typeof message.id == "undefined") {
        return;
      }

      updateMessage(message);
    });
    // maybe its need to fix
  }, [messages]);

  const sentMessage: KeyboardEventHandler = (e) => {
    if (e.key !== "Enter" || !sendMessageRef.current) {
      return;
    }

    //check lenght message
    const message = sendMessageRef.current.value;
    if (message.length > 2000) {
      alert("Сообщение не должно быть больше 2000 символов");
    }

    send({
      message,
      to_chat_id: chatId,
      is_group: true,
    });

    sendMessageRef.current.value = "";
  };

  if (messages) {
    return (
      <div className={clsx(styles.talk, className)}>
        <div className={styles.talk_content}>
          <div className={styles.top_gradient} />
          <div ref={messagesRef} className={clsx(styles.message_list)}>
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
          <div className={styles.sending_messagesList}>
            <Sending ref={sendMessageRef} onKeyDown={sentMessage} />
          </div>
        </div>
      </div>
    );
  } else if (isLaptop) {
    return <div className={styles.talk_unselect}>Выберите чат</div>;
  }
};

export default Talk;
