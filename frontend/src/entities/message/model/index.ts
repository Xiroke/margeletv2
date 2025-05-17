import {
  useMessagesServiceDeleteApiMessagesByMessageId,
  useMessagesServiceGetApiMessagesByMessageId,
  useMessagesServiceGetApiMessagesChatByChatId,
  useMessagesServiceGetApiMessagesChatByChatIdKey,
  useMessagesServicePatchApiMessagesByMessageId,
  useMessagesServicePostApiMessages,
} from "@/shared/api/queries";

export const useApiMessage = {
  get: useMessagesServiceGetApiMessagesByMessageId,
  getAllMessageChat: useMessagesServiceGetApiMessagesChatByChatId,
  create: useMessagesServicePostApiMessages,
  update: useMessagesServicePatchApiMessagesByMessageId,
  delete: useMessagesServiceDeleteApiMessagesByMessageId,
  getAllMessageChatKey: useMessagesServiceGetApiMessagesChatByChatIdKey,
};

export type {
  CreateMessageSchema,
  ReadMessageSchema,
  UpdateMessageSchema,
} from "@/shared/api/requests";
