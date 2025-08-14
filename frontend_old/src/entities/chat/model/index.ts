import {
  useChatServiceDeleteApiChatsByChatId,
  useChatServiceGetApiChatsGroupChatsByGroupId,
  useChatServicePatchApiChatsByChatId,
  useChatServicePostApiChatsByGroupId,
  useChatServiceGetApiChatsGroupChatsByGroupIdKey,
} from "@/shared/api/queries";

export const apiChat = {
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
