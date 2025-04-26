import {
  useMessagesServiceDeleteApiMessagesByMessageId,
  useMessagesServiceGetApiMessagesByMessageId,
  useMessagesServiceGetApiMessagesChatByChatId,
  useMessagesServicePatchApiMessagesByMessageId,
  useMessagesServicePostApiMessages,
} from '@/shared/api/queries';

export const apiMessage = {
  get: useMessagesServiceGetApiMessagesByMessageId,
  getAllMessageChat: useMessagesServiceGetApiMessagesChatByChatId,
  create: useMessagesServicePostApiMessages,
  update: useMessagesServicePatchApiMessagesByMessageId,
  delete: useMessagesServiceDeleteApiMessagesByMessageId,
};

export type {
  CreateMessageSchema,
  ReadMessageSchema,
  UpdateMessageSchema,
} from '@/shared/api/requests';
