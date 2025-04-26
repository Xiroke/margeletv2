// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { type QueryClient } from "@tanstack/react-query";
import { AuthService, ChatService, DefaultService, GroupService, MessagesService, PersonalChatService, RoleGroupService, UsersService } from "../requests/services.gen";
import * as Common from "./common";
export const ensureUseUsersServiceGetApiUsersAvatarByGroupUuidData = (queryClient: QueryClient, { groupUuid }: {
  groupUuid: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseUsersServiceGetApiUsersAvatarByGroupUuidKeyFn({ groupUuid }), queryFn: () => UsersService.getApiUsersAvatarByGroupUuid({ groupUuid }) });
export const ensureUseUsersServiceGetApiUsersMeData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseUsersServiceGetApiUsersMeKeyFn(), queryFn: () => UsersService.getApiUsersMe() });
export const ensureUseUsersServiceGetApiUsersByIdData = (queryClient: QueryClient, { id }: {
  id: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseUsersServiceGetApiUsersByIdKeyFn({ id }), queryFn: () => UsersService.getApiUsersById({ id }) });
export const ensureUseAuthServiceGetApiAuthAccessTokenData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseAuthServiceGetApiAuthAccessTokenKeyFn(), queryFn: () => AuthService.getApiAuthAccessToken() });
export const ensureUseDefaultServiceGetApiAuthenticatedRouteData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseDefaultServiceGetApiAuthenticatedRouteKeyFn(), queryFn: () => DefaultService.getApiAuthenticatedRoute() });
export const ensureUseDefaultServiceGetApiData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseDefaultServiceGetApiKeyFn(), queryFn: () => DefaultService.getApi() });
export const ensureUseGroupServiceGetApiGroupsAvatarByGroupUuidData = (queryClient: QueryClient, { groupUuid }: {
  groupUuid: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseGroupServiceGetApiGroupsAvatarByGroupUuidKeyFn({ groupUuid }), queryFn: () => GroupService.getApiGroupsAvatarByGroupUuid({ groupUuid }) });
export const ensureUseGroupServiceGetApiGroupsPanoramaByGroupUuidData = (queryClient: QueryClient, { groupUuid }: {
  groupUuid: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseGroupServiceGetApiGroupsPanoramaByGroupUuidKeyFn({ groupUuid }), queryFn: () => GroupService.getApiGroupsPanoramaByGroupUuid({ groupUuid }) });
export const ensureUseGroupServiceGetApiGroupsInviteByGroupUuidData = (queryClient: QueryClient, { groupUuid }: {
  groupUuid: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseGroupServiceGetApiGroupsInviteByGroupUuidKeyFn({ groupUuid }), queryFn: () => GroupService.getApiGroupsInviteByGroupUuid({ groupUuid }) });
export const ensureUseGroupServiceGetApiGroupsUserGroupsMeData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseGroupServiceGetApiGroupsUserGroupsMeKeyFn(), queryFn: () => GroupService.getApiGroupsUserGroupsMe() });
export const ensureUseGroupServiceGetApiGroupsUserGroupsByUserIdData = (queryClient: QueryClient, { userId }: {
  userId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseGroupServiceGetApiGroupsUserGroupsByUserIdKeyFn({ userId }), queryFn: () => GroupService.getApiGroupsUserGroupsByUserId({ userId }) });
export const ensureUseGroupServiceGetApiGroupsByGroupUuidData = (queryClient: QueryClient, { groupUuid }: {
  groupUuid: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseGroupServiceGetApiGroupsByGroupUuidKeyFn({ groupUuid }), queryFn: () => GroupService.getApiGroupsByGroupUuid({ groupUuid }) });
export const ensureUsePersonalChatServiceGetApiPersonalChatsByPersonalChatUuidData = (queryClient: QueryClient, { personalChatUuid }: {
  personalChatUuid: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UsePersonalChatServiceGetApiPersonalChatsByPersonalChatUuidKeyFn({ personalChatUuid }), queryFn: () => PersonalChatService.getApiPersonalChatsByPersonalChatUuid({ personalChatUuid }) });
export const ensureUseChatServiceGetApiChatsChatsMeData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseChatServiceGetApiChatsChatsMeKeyFn(), queryFn: () => ChatService.getApiChatsChatsMe() });
export const ensureUseChatServiceGetApiChatsGroupChatsByGroupIdData = (queryClient: QueryClient, { groupId }: {
  groupId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseChatServiceGetApiChatsGroupChatsByGroupIdKeyFn({ groupId }), queryFn: () => ChatService.getApiChatsGroupChatsByGroupId({ groupId }) });
export const ensureUseChatServiceGetApiChatsByChatUuidData = (queryClient: QueryClient, { chatUuid }: {
  chatUuid: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseChatServiceGetApiChatsByChatUuidKeyFn({ chatUuid }), queryFn: () => ChatService.getApiChatsByChatUuid({ chatUuid }) });
export const ensureUseRoleGroupServiceGetApiRolesGroupByRoleGroupIdData = (queryClient: QueryClient, { roleGroupId }: {
  roleGroupId: number;
}) => queryClient.ensureQueryData({ queryKey: Common.UseRoleGroupServiceGetApiRolesGroupByRoleGroupIdKeyFn({ roleGroupId }), queryFn: () => RoleGroupService.getApiRolesGroupByRoleGroupId({ roleGroupId }) });
export const ensureUseMessagesServiceGetApiMessagesChatByChatIdData = (queryClient: QueryClient, { chatId }: {
  chatId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseMessagesServiceGetApiMessagesChatByChatIdKeyFn({ chatId }), queryFn: () => MessagesService.getApiMessagesChatByChatId({ chatId }) });
export const ensureUseMessagesServiceGetApiMessagesByMessageIdData = (queryClient: QueryClient, { messageId }: {
  messageId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseMessagesServiceGetApiMessagesByMessageIdKeyFn({ messageId }), queryFn: () => MessagesService.getApiMessagesByMessageId({ messageId }) });
