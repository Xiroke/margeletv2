import {
  useChatServiceDeleteApiChatsByChatId,
  useChatServiceGetApiChatsGroupChatsByGroupId,
  useChatServicePatchApiChatsByChatId,
  useChatServicePostApiChatsByGroupId,
  useChatServiceGetApiChatsGroupChatsByGroupIdKey,
} from "@/shared/api/queries";

export const useApiChat = {
  getGroupChats: useChatServiceGetApiChatsGroupChatsByGroupId,
  create: useChatServicePostApiChatsByGroupId,
  update: useChatServicePatchApiChatsByChatId,
  delete: useChatServiceDeleteApiChatsByChatId,
  getGroupChatsKey: useChatServiceGetApiChatsGroupChatsByGroupIdKey,
};

export type {
  ReadChatSchema,
  UpdateChatSchema,
  CreateChatSchema,
} from "@/shared/api/requests";
