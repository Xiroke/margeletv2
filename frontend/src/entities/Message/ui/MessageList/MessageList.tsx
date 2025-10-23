import type { FC } from "react";
import { memo, useEffect, useMemo, useRef, useState } from "react";

import { clsx } from "clsx";

import { userQueryProps } from "@/entities/User/api";
import { ChatMessagesLoader } from "@/pages/ChatPage/ui/ChatMessagesLoader/ChatMessagesLoader";
import type { WsOutDataSchema } from "@/shared/api/generated";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { messageQueryProps } from "../../api";
import { GroupMessage } from "../GroupMessage/GroupMessage";
import cls from "./MessageList.module.scss";

interface MessageListProps {
  className?: string;
  groupId: string;
}

export const MessageList: FC<MessageListProps> = memo(
  (props: MessageListProps) => {
    const { className, groupId } = props;
    const [knownUsers, setKnownUsers] = useState<Record<string, string>>({});
    const [scrollBottom, setScrollBottom] = useState(0);

    const messagesContainerRef = useRef<HTMLDivElement>(null);

    const whenNewMessageScrollDown = () => {
      const messages = messagesContainerRef.current;
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

    const gettCursorMessagesQuery = messageQueryProps.getCursorMessagesInf({
      path: { group_id: groupId! },
    });

    const { data: infinityDataMessages, fetchNextPage } = useInfiniteQuery({
      ...gettCursorMessagesQuery,
      getNextPageParam: (lastPage) => lastPage.cursor,
      enabled: !!groupId,
    });

    const handleLoadMore = () => {
      const messages = messagesContainerRef.current;
      if (!messages) return;

      const { scrollTop, scrollHeight } = messages;
      console.log(scrollHeight, scrollTop);
      setScrollBottom(scrollTop - scrollHeight);

      fetchNextPage();
    };

    useEffect(() => {
      const messages = messagesContainerRef.current;
      if (!messages) return;

      console.log(messages.scrollHeight, messages.scrollTop);
      messages.scrollTo({
        top: messages.scrollHeight + scrollBottom,
      });
    }, [messagesContainerRef]);

    const unknowbUsers = useMemo(() => {
      if (
        !infinityDataMessages ||
        infinityDataMessages.pages[0].messages.length == 0
      )
        return new Set<string>();

      return new Set(
        infinityDataMessages.pages.flatMap((page) =>
          page.messages
            .filter(
              (message) => message.user_id && !knownUsers[message.user_id]
            )
            .map((message) => message.user_id)
        )
      );
    }, [infinityDataMessages, knownUsers]);

    const { mutateAsync: usernamesMut } = useMutation({
      ...userQueryProps.getUsernamesByIdMut(),
    });

    const onMessageCallback = (data: WsOutDataSchema) => {
      // if (data.event == "message") {
      //   const ws_inner_data = data.data as ReadMessageSchema;
      //   queryClient.setQueryData(gettCursorMessagesQuery.queryKey, (prev) => {
      //     if (prev) {
      //       return [ws_inner_data, ...prev];
      //     } else {
      //       return [ws_inner_data];
      //     }
      //   });
      // }
      whenNewMessageScrollDown();
      // ________;
    };

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
      <div
        className={clsx(cls.message_list, className)}
        ref={messagesContainerRef}
      >
        {infinityDataMessages &&
          infinityDataMessages.pages &&
          infinityDataMessages.pages.map((page, idx) =>
            page.messages.map((message) => (
              <GroupMessage
                key={message.id}
                message={message}
                // if there are multiple messages in a row from the wrong user,
                // then only the first message will have a name.
                author={knownUsers[message.user_id]}
              />
            ))
          )}
        {infinityDataMessages?.pages[infinityDataMessages?.pages.length - 1]
          ?.has_more && (
          <ChatMessagesLoader
            onIntersect={() => handleLoadMore()}
            className={cls.message_list_loader}
          />
        )}
      </div>
    );
  }
);
