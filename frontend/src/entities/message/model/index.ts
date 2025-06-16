import { useMessagesServiceGetApiMessagesChatByChatIdInfinite } from "@/shared/api/queries/infiniteQueries";
import { useMessagesServiceGetApiMessagesChatByChatIdKey } from "@/shared/api/queries";

export const useApiMessage = {
  getMessagesByChatPaginated:
    useMessagesServiceGetApiMessagesChatByChatIdInfinite,
  getAllMessageChatKey: useMessagesServiceGetApiMessagesChatByChatIdKey,
};

export type { ReadMessageSchema } from "@/shared/api/requests";
