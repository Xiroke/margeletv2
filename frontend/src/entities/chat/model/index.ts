import {
  useChatServiceDeleteApiChatsByChatUuid,
  useChatServiceGetApiChatsByChatUuid,
  useChatServiceGetApiChatsGroupChatsByGroupId,
  useChatServicePatchApiChatsByChatUuid,
  useChatServiceGetApiChatsChatsMe,
  useChatServicePostApiChatsByGroupId,
  useChatServiceGetApiChatsGroupChatsByGroupIdKey,
} from "@/shared/api/queries";

export const useApiChat = {
  get: useChatServiceGetApiChatsByChatUuid,
  getGroupChats: useChatServiceGetApiChatsGroupChatsByGroupId,
  create: useChatServicePostApiChatsByGroupId,
  update: useChatServicePatchApiChatsByChatUuid,
  delete: useChatServiceDeleteApiChatsByChatUuid,
  getChatsMe: useChatServiceGetApiChatsChatsMe,
  getGroupChatsKey: useChatServiceGetApiChatsGroupChatsByGroupIdKey,
};

export type {
  ReadChatSchema,
  UpdateChatSchema,
  CreateChatSchema,
} from "@/shared/api/requests";
