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
import { useApiMessage, ReadMessageSchema } from "@/entities/message/model";
import { useWS } from "@/shared/lib/providers";
import { useQueryClient } from "@tanstack/react-query";
import useMediaQuery from "@/shared/lib/hooks/use_media_query";
import { useToastStatus } from "@/shared/lib/hooks/use_toast";

export interface TalkProps extends HTMLAttributes<HTMLDivElement> {}

export const Talk = ({ className }: TalkProps) => {
  const queryClient = useQueryClient();
  const chatId = useAppSelector((state) => state.chat.id);
  const { send, onMessage } = useWS();
  const isLaptop = useMediaQuery("(min-width: 1024px)");
  const [isBottom, setIsBottom] = useState(false);
  const sendMessageRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const showToast = useToastStatus();

  const { data: messages }: { data: ReadMessageSchema[] | undefined } =
    useApiMessage.getAllMessageChat(
      {
        chatId: chatId!,
      },
      [{ chatId }],
      {
        enabled: !!chatId,
      }
    );

  const handleNewMessageScroll = () => {
    // event when get new message we scroll to the end messages
    const messages = messagesRef.current;
    if (!messages) return;

    const { scrollTop, scrollHeight, clientHeight } = messages;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    console.log(scrollTop, scrollHeight, clientHeight, distanceFromBottom);

    // dont scroll if user read old message
    if (distanceFromBottom >= 500) {
      return;
    }

    messages.scrollTo({
      top: messages.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const HTMLmessages = messagesRef.current;
    if (HTMLmessages == null) {
      return;
    }

    if (isBottom == true) {
      handleNewMessageScroll();
    } else {
      //scroll to bottom whem open page
      setIsBottom(true);
      HTMLmessages.scrollTo({
        top: HTMLmessages.scrollHeight,
      });
    }
  }, [messages]);

  const updateMessage = (newMessage: ReadMessageSchema) => {
    // add new message to messages
    queryClient.setQueryData(
      [useApiMessage.getAllMessageChatKey, { chatId }],
      (oldData: ReadMessageSchema[] | undefined) => {
        return oldData ? [...oldData, newMessage] : [newMessage];
      }
    );
  };

  const messageHandler = (message: any) => {
    if (typeof message.id == "undefined" || message.to_chat_id != chatId) {
      return;
    }

    console.log("update");
    updateMessage(message);
  };

  useEffect(() => {
    // logic when change chat
    setIsBottom(false);

    onMessage(messageHandler);

    return () => {
      onMessage(() => {});
    };
  }, [chatId]);

  const sentMessage = () => {
    if (!sendMessageRef.current) {
      return;
    }

    //check lenght message
    const message = sendMessageRef.current.value;
    if (message.length > 2000) {
      showToast(
        "error",
        "Ошибка",
        "Сообщение не должно быть больше 2000 символов"
      );
      return;
    } else if (message.length == 0) {
      return;
    }

    send({
      message,
      to_chat_id: chatId,
      is_group: true,
    });

    sendMessageRef.current.value = "";
  };

  const onEnterSendMessage: KeyboardEventHandler = (e) => {
    if (e.key !== "Enter" || !sendMessageRef.current) {
      return;
    }

    sentMessage();
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
          <Sending
            className={styles.sending}
            ref={sendMessageRef}
            onKeyDown={onEnterSendMessage}
            onClick={sentMessage}
          />
        </div>
      </div>
    );
  } else if (isLaptop) {
    return <div className={styles.talk_unselect}>Выберите чат</div>;
  }
};

export default Talk;
