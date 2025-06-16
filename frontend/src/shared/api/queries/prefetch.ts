// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { type QueryClient } from "@tanstack/react-query";
import { AuthService, ChatService, DefaultService, GroupService, MessagesService, RoleService, UsersService } from "../requests/services.gen";
import * as Common from "./common";
export const prefetchUseAuthServiceGetApiAuthMe = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseAuthServiceGetApiAuthMeKeyFn(), queryFn: () => AuthService.getApiAuthMe() });
export const prefetchUseAuthServiceGetApiAuthMeAlterntive = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseAuthServiceGetApiAuthMeAlterntiveKeyFn(), queryFn: () => AuthService.getApiAuthMeAlterntive() });
export const prefetchUseUsersServiceGetApiUsersMe = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseUsersServiceGetApiUsersMeKeyFn(), queryFn: () => UsersService.getApiUsersMe() });
export const prefetchUseUsersServiceGetApiUsersById = (queryClient: QueryClient, { id }: {
  id: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseUsersServiceGetApiUsersByIdKeyFn({ id }), queryFn: () => UsersService.getApiUsersById({ id }) });
export const prefetchUseUsersServiceGetApiUsersAvatarMe = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseUsersServiceGetApiUsersAvatarMeKeyFn(), queryFn: () => UsersService.getApiUsersAvatarMe() });
export const prefetchUseGroupServiceGetApiGroupsUserGroupsMe = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseGroupServiceGetApiGroupsUserGroupsMeKeyFn(), queryFn: () => GroupService.getApiGroupsUserGroupsMe() });
export const prefetchUseGroupServiceGetApiGroupsAvatarByGroupId = (queryClient: QueryClient, { groupId }: {
  groupId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseGroupServiceGetApiGroupsAvatarByGroupIdKeyFn({ groupId }), queryFn: () => GroupService.getApiGroupsAvatarByGroupId({ groupId }) });
export const prefetchUseGroupServiceGetApiGroupsPanoramaByGroupId = (queryClient: QueryClient, { groupId }: {
  groupId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseGroupServiceGetApiGroupsPanoramaByGroupIdKeyFn({ groupId }), queryFn: () => GroupService.getApiGroupsPanoramaByGroupId({ groupId }) });
export const prefetchUseGroupServiceGetApiGroupsInviteByGroupId = (queryClient: QueryClient, { groupId }: {
  groupId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseGroupServiceGetApiGroupsInviteByGroupIdKeyFn({ groupId }), queryFn: () => GroupService.getApiGroupsInviteByGroupId({ groupId }) });
export const prefetchUseGroupServiceGetApiGroupsByGroupId = (queryClient: QueryClient, { groupId }: {
  groupId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseGroupServiceGetApiGroupsByGroupIdKeyFn({ groupId }), queryFn: () => GroupService.getApiGroupsByGroupId({ groupId }) });
export const prefetchUseChatServiceGetApiChatsGroupChatsByGroupId = (queryClient: QueryClient, { groupId }: {
  groupId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseChatServiceGetApiChatsGroupChatsByGroupIdKeyFn({ groupId }), queryFn: () => ChatService.getApiChatsGroupChatsByGroupId({ groupId }) });
export const prefetchUseRoleServiceGetApiRolesGroupByRoleId = (queryClient: QueryClient, { roleId }: {
  roleId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseRoleServiceGetApiRolesGroupByRoleIdKeyFn({ roleId }), queryFn: () => RoleService.getApiRolesGroupByRoleId({ roleId }) });
export const prefetchUseRoleServiceGetApiRolesGroupPermissionsMeByGroupId = (queryClient: QueryClient, { groupId }: {
  groupId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseRoleServiceGetApiRolesGroupPermissionsMeByGroupIdKeyFn({ groupId }), queryFn: () => RoleService.getApiRolesGroupPermissionsMeByGroupId({ groupId }) });
export const prefetchUseMessagesServiceGetApiMessagesChatByChatId = (queryClient: QueryClient, { amount, chatId, page }: {
  amount?: number;
  chatId: string;
  page?: number;
}) => queryClient.prefetchQuery({ queryKey: Common.UseMessagesServiceGetApiMessagesChatByChatIdKeyFn({ amount, chatId, page }), queryFn: () => MessagesService.getApiMessagesChatByChatId({ amount, chatId, page }) });
export const prefetchUseDefaultServiceGetApi = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseDefaultServiceGetApiKeyFn(), queryFn: () => DefaultService.getApi() });
