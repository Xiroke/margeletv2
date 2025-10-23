"use client";
import clsx from "clsx";
import {
  HTMLAttributes,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";

import { ReadMessageSchema, useApiMessage } from "@/entities/message/model";
import Message from "@/entities/message/ui";
import { ReadMessagePaginatedSchema } from "@/shared/api/requests";
import { useIntersectionObserver } from "@/shared/lib/hooks/use_intersection_observer";
import useMediaQuery from "@/shared/lib/hooks/use_media_query";
import { useToastStatus } from "@/shared/lib/hooks/use_toast";
import { useWS } from "@/shared/lib/providers";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import Sending from "../sending";
import styles from "./talk.module.scss";

export interface TalkProps extends HTMLAttributes<HTMLDivElement> {
  chatId: string;
}

export const Talk = ({ className, chatId }: TalkProps) => {
  const amount = 10;
  const queryClient = useQueryClient();
  const { send, onMessage } = useWS();
  const isLaptop = useMediaQuery("(min-width: 1024px)");
  const [isBottom, setIsBottom] = useState(false);
  const sendMessageRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const showToast = useToastStatus();
  const { isIntersecting: isIntersectingOldMessage, ref: refOldMessage } =
    useIntersectionObserver({
      threshold: 0.5,
    });

  const { data, fetchNextPage } = useApiMessage.getMessagesByChatPaginated({
    chatId: chatId,
    amount: amount,
  });

  const messages = data?.pages.flatMap((page) => page.messages) || [];

  // crutch for not duplicate messages
  const unique = Array.from(
    messages.reduce((m, msg) => m.set(msg.id, msg), new Map()).values()
  );

  const handleNewMessageScroll = () => {
    // event when get new message we scroll to the end messages
    const messages = messagesRef.current;
    if (!messages) return;

    const { scrollTop, scrollHeight, clientHeight } = messages;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

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
    if (isIntersectingOldMessage) {
      fetchNextPage();
    }
  }, [isIntersectingOldMessage]);

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
      [useApiMessage.getAllMessageChatKey, { amount, chatId }],
      (
        oldData: InfiniteData<ReadMessagePaginatedSchema, unknown> | undefined
      ) => {
        console.log(oldData);
        if (!oldData) return oldData;
        const [firstPage, ...rest] = oldData.pages;

        if (firstPage.page == 0) {
          const newPage = {
            messages: [newMessage],
            page: 0,
            next_page: 1,
          };
          return {
            ...oldData,
            pages: [newPage, firstPage, ...rest],
          };
        } else {
          const updatedFirst = {
            ...firstPage,
            messages: [newMessage, ...firstPage.messages],
          };
          return {
            ...oldData,
            pages: [updatedFirst, ...rest],
          };
        }
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

  if (unique) {
    return (
      <div className={clsx(styles.talk, className)}>
        <div className={styles.talk_content}>
          <div className={styles.top_gradient} />
          <div ref={messagesRef} className={clsx(styles.message_list)}>
            {unique.length != 0 &&
              unique.map((item) => (
                <Message
                  className={styles.message_item}
                  text={item.message}
                  author={item.author!}
                  time={item.created_at}
                  key={item.id}
                />
              ))}
            <div ref={refOldMessage} className={styles.message_item}>
              Загрузка
            </div>
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
