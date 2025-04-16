import {
  useChatServiceDeleteApiChatsByChatUuid,
  useChatServiceGetApiChatsByChatUuid,
  useChatServiceGetApiChatsGroupChatsByGroupId,
  useChatServicePatchApiChatsByChatUuid,
  useChatServicePostApiChats,
} from '@/shared/api/queries';

export const apiChat = {
  get: useChatServiceGetApiChatsByChatUuid,
  getGroupChats: useChatServiceGetApiChatsGroupChatsByGroupId,
  create: useChatServicePostApiChats,
  update: useChatServicePatchApiChatsByChatUuid,
  delete: useChatServiceDeleteApiChatsByChatUuid,
};

export type { ReadChatSchema, UpdateChatSchema, CreateChatSchema } from '@/shared/api/requests';
