import { clsx } from "clsx";

import { useWS } from "@/app/providers/WebsocketProvider";
import { MessageList } from "@/entities/Message/ui/MessageList/MessageList";
import type { WsInMessageSchema } from "@/shared/api/generated";
import { Link, useParams } from "@tanstack/react-router";
import { Settings, UserIcon, UsersIcon } from "lucide-react";
import { useEffect, type FC } from "react";
import { ChatGroupList } from "../ChatGroupList/ChatGroupList";
import { ChatInput } from "../ChatInput/ChatInput";
import cls from "./ChatPage.module.scss";

interface ChatPageProps {
  className?: string;
}

/** Докстринг */
export const ChatPage: FC<ChatPageProps> = (props: ChatPageProps) => {
  const { className } = props;

  const { groupType, groupId } = useParams({
    from: "/$groupType/{-$groupId}",
  });

  const ws = useWS();

  useEffect(() => {
    ws.onMessage(onMessageCallback);
  }, []);

  const onMessageCallback = () => {
    console.log("onMessageCallback");
  };

  const handleSend = (value: string) => {
    const ws_data: WsInMessageSchema = {
      event: "message",
      data: { message: value, to_group_id: groupId! },
    };

    ws.send(ws_data);
  };

  return (
    <div className={clsx(cls.chat, className)}>
      <div className={cls.control_panel}>
        <Link
          className="no_link"
          to="/$groupType/{-$groupId}"
          params={(prev) => ({ ...prev, groupType: "personal" })}
        >
          <UserIcon size={28} strokeWidth={2} />
        </Link>
        <Link
          className="no_link"
          to="/$groupType/{-$groupId}"
          params={(prev) => ({ ...prev, groupType: "simple" })}
        >
          <UsersIcon size={28} strokeWidth={1.6} />
        </Link>

        <Settings size={28} strokeWidth={1.6} />
      </div>

      <ChatGroupList groupType={groupType} className={cls.group_list} />

      <div className={cls.chat_line} />
      {groupId ? (
        <div className={cls.selected_chat}>
          <MessageList groupId={groupId} />
          <ChatInput onSend={handleSend} placeholder="Сообщение" />
        </div>
      ) : (
        <div className={cls.unselected_chat}>Выберите группу</div>
      )}
    </div>
  );
};
