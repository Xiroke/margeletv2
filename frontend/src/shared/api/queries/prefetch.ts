// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { type QueryClient } from "@tanstack/react-query";
import { AuthService, ChatService, DefaultService, GroupService, MessagesService, PersonalChatService, RoleGroupService, UsersService } from "../requests/services.gen";
import * as Common from "./common";
export const prefetchUseUsersServiceGetApiUsersAvatarByGroupUuid = (queryClient: QueryClient, { groupUuid }: {
  groupUuid: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseUsersServiceGetApiUsersAvatarByGroupUuidKeyFn({ groupUuid }), queryFn: () => UsersService.getApiUsersAvatarByGroupUuid({ groupUuid }) });
export const prefetchUseUsersServiceGetApiUsersMe = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseUsersServiceGetApiUsersMeKeyFn(), queryFn: () => UsersService.getApiUsersMe() });
export const prefetchUseUsersServiceGetApiUsersById = (queryClient: QueryClient, { id }: {
  id: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseUsersServiceGetApiUsersByIdKeyFn({ id }), queryFn: () => UsersService.getApiUsersById({ id }) });
export const prefetchUseAuthServiceGetApiAuthAccessToken = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseAuthServiceGetApiAuthAccessTokenKeyFn(), queryFn: () => AuthService.getApiAuthAccessToken() });
export const prefetchUseDefaultServiceGetApiAuthenticatedRoute = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseDefaultServiceGetApiAuthenticatedRouteKeyFn(), queryFn: () => DefaultService.getApiAuthenticatedRoute() });
export const prefetchUseDefaultServiceGetApi = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseDefaultServiceGetApiKeyFn(), queryFn: () => DefaultService.getApi() });
export const prefetchUseGroupServiceGetApiGroupsAvatarByGroupUuid = (queryClient: QueryClient, { groupUuid }: {
  groupUuid: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseGroupServiceGetApiGroupsAvatarByGroupUuidKeyFn({ groupUuid }), queryFn: () => GroupService.getApiGroupsAvatarByGroupUuid({ groupUuid }) });
export const prefetchUseGroupServiceGetApiGroupsPanoramaByGroupUuid = (queryClient: QueryClient, { groupUuid }: {
  groupUuid: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseGroupServiceGetApiGroupsPanoramaByGroupUuidKeyFn({ groupUuid }), queryFn: () => GroupService.getApiGroupsPanoramaByGroupUuid({ groupUuid }) });
export const prefetchUseGroupServiceGetApiGroupsInviteByGroupId = (queryClient: QueryClient, { groupId }: {
  groupId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseGroupServiceGetApiGroupsInviteByGroupIdKeyFn({ groupId }), queryFn: () => GroupService.getApiGroupsInviteByGroupId({ groupId }) });
export const prefetchUseGroupServiceGetApiGroupsUserGroupsMe = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseGroupServiceGetApiGroupsUserGroupsMeKeyFn(), queryFn: () => GroupService.getApiGroupsUserGroupsMe() });
export const prefetchUseGroupServiceGetApiGroupsUserGroupsByUserId = (queryClient: QueryClient, { userId }: {
  userId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseGroupServiceGetApiGroupsUserGroupsByUserIdKeyFn({ userId }), queryFn: () => GroupService.getApiGroupsUserGroupsByUserId({ userId }) });
export const prefetchUseGroupServiceGetApiGroupsByGroupUuid = (queryClient: QueryClient, { groupUuid }: {
  groupUuid: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseGroupServiceGetApiGroupsByGroupUuidKeyFn({ groupUuid }), queryFn: () => GroupService.getApiGroupsByGroupUuid({ groupUuid }) });
export const prefetchUsePersonalChatServiceGetApiPersonalChatsByPersonalChatUuid = (queryClient: QueryClient, { personalChatUuid }: {
  personalChatUuid: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UsePersonalChatServiceGetApiPersonalChatsByPersonalChatUuidKeyFn({ personalChatUuid }), queryFn: () => PersonalChatService.getApiPersonalChatsByPersonalChatUuid({ personalChatUuid }) });
export const prefetchUseChatServiceGetApiChatsChatsMe = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseChatServiceGetApiChatsChatsMeKeyFn(), queryFn: () => ChatService.getApiChatsChatsMe() });
export const prefetchUseChatServiceGetApiChatsGroupChatsByGroupId = (queryClient: QueryClient, { groupId }: {
  groupId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseChatServiceGetApiChatsGroupChatsByGroupIdKeyFn({ groupId }), queryFn: () => ChatService.getApiChatsGroupChatsByGroupId({ groupId }) });
export const prefetchUseChatServiceGetApiChatsByChatUuid = (queryClient: QueryClient, { chatUuid }: {
  chatUuid: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseChatServiceGetApiChatsByChatUuidKeyFn({ chatUuid }), queryFn: () => ChatService.getApiChatsByChatUuid({ chatUuid }) });
export const prefetchUseRoleGroupServiceGetApiRolesGroupByRoleGroupId = (queryClient: QueryClient, { roleGroupId }: {
  roleGroupId: number;
}) => queryClient.prefetchQuery({ queryKey: Common.UseRoleGroupServiceGetApiRolesGroupByRoleGroupIdKeyFn({ roleGroupId }), queryFn: () => RoleGroupService.getApiRolesGroupByRoleGroupId({ roleGroupId }) });
export const prefetchUseMessagesServiceGetApiMessagesChatByChatId = (queryClient: QueryClient, { chatId }: {
  chatId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseMessagesServiceGetApiMessagesChatByChatIdKeyFn({ chatId }), queryFn: () => MessagesService.getApiMessagesChatByChatId({ chatId }) });
export const prefetchUseMessagesServiceGetApiMessagesByMessageId = (queryClient: QueryClient, { messageId }: {
  messageId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseMessagesServiceGetApiMessagesByMessageIdKeyFn({ messageId }), queryFn: () => MessagesService.getApiMessagesByMessageId({ messageId }) });
