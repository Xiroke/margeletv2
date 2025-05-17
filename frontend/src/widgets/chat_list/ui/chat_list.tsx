import { HTMLAttributes } from "react";
import clsx from "clsx";

import styles from "./chat_list.module.scss";
import { useApiChat, ReadChatSchema } from "@/entities/chat/model";
import { useAppSelector } from "@/shared/lib/hooks";
import Chat from "@/entities/chat/ui";
import { useAppDispatch } from "@/shared/lib/hooks";
import { setChatId } from "@/entities/chat/model/slice";

export interface ChatListProps extends HTMLAttributes<HTMLDivElement> {}

export const ChatList = ({ className }: ChatListProps) => {
  const dispatch = useAppDispatch();
  const groupId = useAppSelector((state) => state.group.id);

  // if groupId is null, then dont render
  if (!groupId) {
    return null;
  }

  const { data }: { data: ReadChatSchema[] | undefined } =
    useApiChat.getGroupChats({
      groupId: groupId,
    });

  return (
    <div className={clsx(className, styles.chat_list)}>
      {data?.map((item) => (
        <Chat
          className={styles.chat_item}
          key={item.id}
          title={item.title}
          onClick={() => dispatch(setChatId(item.id))}
        />
      ))}
    </div>
  );
};

export default ChatList;
