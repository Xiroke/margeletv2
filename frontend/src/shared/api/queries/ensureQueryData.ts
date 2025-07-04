// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { type QueryClient } from "@tanstack/react-query";
import { AuthService, ChatService, DefaultService, GroupService, MessagesService, RoleService, UsersService } from "../requests/services.gen";
import * as Common from "./common";
export const ensureUseAuthServiceGetApiAuthMeData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseAuthServiceGetApiAuthMeKeyFn(), queryFn: () => AuthService.getApiAuthMe() });
export const ensureUseAuthServiceGetApiAuthMeAlterntiveData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseAuthServiceGetApiAuthMeAlterntiveKeyFn(), queryFn: () => AuthService.getApiAuthMeAlterntive() });
export const ensureUseUsersServiceGetApiUsersMeData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseUsersServiceGetApiUsersMeKeyFn(), queryFn: () => UsersService.getApiUsersMe() });
export const ensureUseUsersServiceGetApiUsersByIdData = (queryClient: QueryClient, { id }: {
  id: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseUsersServiceGetApiUsersByIdKeyFn({ id }), queryFn: () => UsersService.getApiUsersById({ id }) });
export const ensureUseUsersServiceGetApiUsersAvatarMeData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseUsersServiceGetApiUsersAvatarMeKeyFn(), queryFn: () => UsersService.getApiUsersAvatarMe() });
export const ensureUseGroupServiceGetApiGroupsUserGroupsMeData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseGroupServiceGetApiGroupsUserGroupsMeKeyFn(), queryFn: () => GroupService.getApiGroupsUserGroupsMe() });
export const ensureUseGroupServiceGetApiGroupsAvatarByGroupIdData = (queryClient: QueryClient, { groupId }: {
  groupId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseGroupServiceGetApiGroupsAvatarByGroupIdKeyFn({ groupId }), queryFn: () => GroupService.getApiGroupsAvatarByGroupId({ groupId }) });
export const ensureUseGroupServiceGetApiGroupsPanoramaByGroupIdData = (queryClient: QueryClient, { groupId }: {
  groupId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseGroupServiceGetApiGroupsPanoramaByGroupIdKeyFn({ groupId }), queryFn: () => GroupService.getApiGroupsPanoramaByGroupId({ groupId }) });
export const ensureUseGroupServiceGetApiGroupsInviteByGroupIdData = (queryClient: QueryClient, { groupId }: {
  groupId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseGroupServiceGetApiGroupsInviteByGroupIdKeyFn({ groupId }), queryFn: () => GroupService.getApiGroupsInviteByGroupId({ groupId }) });
export const ensureUseGroupServiceGetApiGroupsByGroupIdData = (queryClient: QueryClient, { groupId }: {
  groupId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseGroupServiceGetApiGroupsByGroupIdKeyFn({ groupId }), queryFn: () => GroupService.getApiGroupsByGroupId({ groupId }) });
export const ensureUseChatServiceGetApiChatsGroupChatsByGroupIdData = (queryClient: QueryClient, { groupId }: {
  groupId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseChatServiceGetApiChatsGroupChatsByGroupIdKeyFn({ groupId }), queryFn: () => ChatService.getApiChatsGroupChatsByGroupId({ groupId }) });
export const ensureUseRoleServiceGetApiRolesGroupByRoleIdData = (queryClient: QueryClient, { roleId }: {
  roleId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseRoleServiceGetApiRolesGroupByRoleIdKeyFn({ roleId }), queryFn: () => RoleService.getApiRolesGroupByRoleId({ roleId }) });
export const ensureUseRoleServiceGetApiRolesGroupPermissionsMeByGroupIdData = (queryClient: QueryClient, { groupId }: {
  groupId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseRoleServiceGetApiRolesGroupPermissionsMeByGroupIdKeyFn({ groupId }), queryFn: () => RoleService.getApiRolesGroupPermissionsMeByGroupId({ groupId }) });
export const ensureUseMessagesServiceGetApiMessagesChatByChatIdData = (queryClient: QueryClient, { amount, chatId, page }: {
  amount?: number;
  chatId: string;
  page?: number;
}) => queryClient.ensureQueryData({ queryKey: Common.UseMessagesServiceGetApiMessagesChatByChatIdKeyFn({ amount, chatId, page }), queryFn: () => MessagesService.getApiMessagesChatByChatId({ amount, chatId, page }) });
export const ensureUseDefaultServiceGetApiData = (queryClient: QueryClient) => queryClient.ensureQueryData({ queryKey: Common.UseDefaultServiceGetApiKeyFn(), queryFn: () => DefaultService.getApi() });
