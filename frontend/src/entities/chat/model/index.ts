import {
  useChatServiceDeleteApiChatsByChatId,
  useChatServiceGetApiChatsByChatId,
  useChatServiceGetApiChatsGroupChatsByGroupId,
  useChatServicePatchApiChatsByChatId,
  useChatServiceGetApiChatsChatsMe,
  useChatServicePostApiChatsByGroupId,
  useChatServiceGetApiChatsGroupChatsByGroupIdKey,
} from "@/shared/api/queries";

export const useApiChat = {
  get: useChatServiceGetApiChatsByChatId,
  getGroupChats: useChatServiceGetApiChatsGroupChatsByGroupId,
  create: useChatServicePostApiChatsByGroupId,
  update: useChatServicePatchApiChatsByChatId,
  delete: useChatServiceDeleteApiChatsByChatId,
  getChatsMe: useChatServiceGetApiChatsChatsMe,
  getGroupChatsKey: useChatServiceGetApiChatsGroupChatsByGroupIdKey,
};

export type {
  ReadChatSchema,
  UpdateChatSchema,
  CreateChatSchema,
} from "@/shared/api/requests";
