import {
  useChatServiceDeleteApiChatsByChatUuid,
  useChatServiceGetApiChatsByChatUuid,
  useChatServiceGetApiChatsGroupChatsByGroupId,
  useChatServicePatchApiChatsByChatUuid,
  useChatServiceGetApiChatsChatsMe,
  useChatServicePostApiChatsByGroupId,
} from '@/shared/api/queries';

export const apiChat = {
  get: useChatServiceGetApiChatsByChatUuid,
  getGroupChats: useChatServiceGetApiChatsGroupChatsByGroupId,
  create: useChatServicePostApiChatsByGroupId,
  update: useChatServicePatchApiChatsByChatUuid,
  delete: useChatServiceDeleteApiChatsByChatUuid,
  getChatsMe: useChatServiceGetApiChatsChatsMe,
};

export type { ReadChatSchema, UpdateChatSchema, CreateChatSchema } from '@/shared/api/requests';
