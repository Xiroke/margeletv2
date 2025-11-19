import {
    useChatServiceDeleteApiChatsByChatId,
    useChatServiceGetApiChatsGroupChatsByGroupId,
    useChatServiceGetApiChatsGroupChatsByGroupIdKey,
    useChatServicePatchApiChatsByChatId,
    useChatServicePostApiChatsByGroupId,
} from "@/shared/api/queries";

export const apiChat = {
  getGroupChats: useChatServiceGetApiChatsGroupChatsByGroupId,
  create: useChatServicePostApiChatsByGroupId,
  update: useChatServicePatchApiChatsByChatId,
  delete: useChatServiceDeleteApiChatsByChatId,
  getGroupChatsKey: useChatServiceGetApiChatsGroupChatsByGroupIdKey,
};

export type { ChatCreate, ChatRead, ChatUpdate } from "@/shared/api/requests";

