import {
  useMessagesServiceGetApiMessagesChatByChatId,
  useMessagesServiceGetApiMessagesChatByChatIdKey,
} from "@/shared/api/queries";

export const useApiMessage = {
  getAllMessageChat: useMessagesServiceGetApiMessagesChatByChatId,
  getAllMessageChatKey: useMessagesServiceGetApiMessagesChatByChatIdKey,
};

export type { ReadMessageSchema } from "@/shared/api/requests";
