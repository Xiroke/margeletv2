import { useMessagesServiceGetApiMessagesChatByChatIdKey } from "@/shared/api/queries";
import { useMessagesServiceGetApiMessagesChatByChatIdInfinite } from "@/shared/api/queries/infiniteQueries";

export const useApiMessage = {
  getMessagesByChatPaginated:
    useMessagesServiceGetApiMessagesChatByChatIdInfinite,
  getAllMessageChatKey: useMessagesServiceGetApiMessagesChatByChatIdKey,
};

export type { MessageRead } from "@/shared/api/requests";
