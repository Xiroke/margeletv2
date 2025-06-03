// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { UseQueryResult } from "@tanstack/react-query";
import { AuthService, ChatService, DefaultService, GroupService, MessagesService, RoleService, UsersService } from "../requests/services.gen";
export type AuthServiceGetApiAuthMeDefaultResponse = Awaited<ReturnType<typeof AuthService.getApiAuthMe>>;
export type AuthServiceGetApiAuthMeQueryResult<TData = AuthServiceGetApiAuthMeDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useAuthServiceGetApiAuthMeKey = "AuthServiceGetApiAuthMe";
export const UseAuthServiceGetApiAuthMeKeyFn = (queryKey?: Array<unknown>) => [useAuthServiceGetApiAuthMeKey, ...(queryKey ?? [])];
export type AuthServiceGetApiAuthMeAlterntiveDefaultResponse = Awaited<ReturnType<typeof AuthService.getApiAuthMeAlterntive>>;
export type AuthServiceGetApiAuthMeAlterntiveQueryResult<TData = AuthServiceGetApiAuthMeAlterntiveDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useAuthServiceGetApiAuthMeAlterntiveKey = "AuthServiceGetApiAuthMeAlterntive";
export const UseAuthServiceGetApiAuthMeAlterntiveKeyFn = (queryKey?: Array<unknown>) => [useAuthServiceGetApiAuthMeAlterntiveKey, ...(queryKey ?? [])];
export type UsersServiceGetApiUsersMeDefaultResponse = Awaited<ReturnType<typeof UsersService.getApiUsersMe>>;
export type UsersServiceGetApiUsersMeQueryResult<TData = UsersServiceGetApiUsersMeDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useUsersServiceGetApiUsersMeKey = "UsersServiceGetApiUsersMe";
export const UseUsersServiceGetApiUsersMeKeyFn = (queryKey?: Array<unknown>) => [useUsersServiceGetApiUsersMeKey, ...(queryKey ?? [])];
export type UsersServiceGetApiUsersByIdDefaultResponse = Awaited<ReturnType<typeof UsersService.getApiUsersById>>;
export type UsersServiceGetApiUsersByIdQueryResult<TData = UsersServiceGetApiUsersByIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useUsersServiceGetApiUsersByIdKey = "UsersServiceGetApiUsersById";
export const UseUsersServiceGetApiUsersByIdKeyFn = ({ id }: {
  id: string;
}, queryKey?: Array<unknown>) => [useUsersServiceGetApiUsersByIdKey, ...(queryKey ?? [{ id }])];
export type UsersServiceGetApiUsersAvatarMeDefaultResponse = Awaited<ReturnType<typeof UsersService.getApiUsersAvatarMe>>;
export type UsersServiceGetApiUsersAvatarMeQueryResult<TData = UsersServiceGetApiUsersAvatarMeDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useUsersServiceGetApiUsersAvatarMeKey = "UsersServiceGetApiUsersAvatarMe";
export const UseUsersServiceGetApiUsersAvatarMeKeyFn = (queryKey?: Array<unknown>) => [useUsersServiceGetApiUsersAvatarMeKey, ...(queryKey ?? [])];
export type GroupServiceGetApiGroupsUserGroupsMeDefaultResponse = Awaited<ReturnType<typeof GroupService.getApiGroupsUserGroupsMe>>;
export type GroupServiceGetApiGroupsUserGroupsMeQueryResult<TData = GroupServiceGetApiGroupsUserGroupsMeDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useGroupServiceGetApiGroupsUserGroupsMeKey = "GroupServiceGetApiGroupsUserGroupsMe";
export const UseGroupServiceGetApiGroupsUserGroupsMeKeyFn = (queryKey?: Array<unknown>) => [useGroupServiceGetApiGroupsUserGroupsMeKey, ...(queryKey ?? [])];
export type GroupServiceGetApiGroupsAvatarByGroupIdDefaultResponse = Awaited<ReturnType<typeof GroupService.getApiGroupsAvatarByGroupId>>;
export type GroupServiceGetApiGroupsAvatarByGroupIdQueryResult<TData = GroupServiceGetApiGroupsAvatarByGroupIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useGroupServiceGetApiGroupsAvatarByGroupIdKey = "GroupServiceGetApiGroupsAvatarByGroupId";
export const UseGroupServiceGetApiGroupsAvatarByGroupIdKeyFn = ({ groupId }: {
  groupId: string;
}, queryKey?: Array<unknown>) => [useGroupServiceGetApiGroupsAvatarByGroupIdKey, ...(queryKey ?? [{ groupId }])];
export type GroupServiceGetApiGroupsPanoramaByGroupIdDefaultResponse = Awaited<ReturnType<typeof GroupService.getApiGroupsPanoramaByGroupId>>;
export type GroupServiceGetApiGroupsPanoramaByGroupIdQueryResult<TData = GroupServiceGetApiGroupsPanoramaByGroupIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useGroupServiceGetApiGroupsPanoramaByGroupIdKey = "GroupServiceGetApiGroupsPanoramaByGroupId";
export const UseGroupServiceGetApiGroupsPanoramaByGroupIdKeyFn = ({ groupId }: {
  groupId: string;
}, queryKey?: Array<unknown>) => [useGroupServiceGetApiGroupsPanoramaByGroupIdKey, ...(queryKey ?? [{ groupId }])];
export type GroupServiceGetApiGroupsInviteByGroupIdDefaultResponse = Awaited<ReturnType<typeof GroupService.getApiGroupsInviteByGroupId>>;
export type GroupServiceGetApiGroupsInviteByGroupIdQueryResult<TData = GroupServiceGetApiGroupsInviteByGroupIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useGroupServiceGetApiGroupsInviteByGroupIdKey = "GroupServiceGetApiGroupsInviteByGroupId";
export const UseGroupServiceGetApiGroupsInviteByGroupIdKeyFn = ({ groupId }: {
  groupId: string;
}, queryKey?: Array<unknown>) => [useGroupServiceGetApiGroupsInviteByGroupIdKey, ...(queryKey ?? [{ groupId }])];
export type GroupServiceGetApiGroupsByGroupIdDefaultResponse = Awaited<ReturnType<typeof GroupService.getApiGroupsByGroupId>>;
export type GroupServiceGetApiGroupsByGroupIdQueryResult<TData = GroupServiceGetApiGroupsByGroupIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useGroupServiceGetApiGroupsByGroupIdKey = "GroupServiceGetApiGroupsByGroupId";
export const UseGroupServiceGetApiGroupsByGroupIdKeyFn = ({ groupId }: {
  groupId: string;
}, queryKey?: Array<unknown>) => [useGroupServiceGetApiGroupsByGroupIdKey, ...(queryKey ?? [{ groupId }])];
export type ChatServiceGetApiChatsGroupChatsByGroupIdDefaultResponse = Awaited<ReturnType<typeof ChatService.getApiChatsGroupChatsByGroupId>>;
export type ChatServiceGetApiChatsGroupChatsByGroupIdQueryResult<TData = ChatServiceGetApiChatsGroupChatsByGroupIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useChatServiceGetApiChatsGroupChatsByGroupIdKey = "ChatServiceGetApiChatsGroupChatsByGroupId";
export const UseChatServiceGetApiChatsGroupChatsByGroupIdKeyFn = ({ groupId }: {
  groupId: string;
}, queryKey?: Array<unknown>) => [useChatServiceGetApiChatsGroupChatsByGroupIdKey, ...(queryKey ?? [{ groupId }])];
export type RoleServiceGetApiRolesGroupByRoleIdDefaultResponse = Awaited<ReturnType<typeof RoleService.getApiRolesGroupByRoleId>>;
export type RoleServiceGetApiRolesGroupByRoleIdQueryResult<TData = RoleServiceGetApiRolesGroupByRoleIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useRoleServiceGetApiRolesGroupByRoleIdKey = "RoleServiceGetApiRolesGroupByRoleId";
export const UseRoleServiceGetApiRolesGroupByRoleIdKeyFn = ({ roleId }: {
  roleId: string;
}, queryKey?: Array<unknown>) => [useRoleServiceGetApiRolesGroupByRoleIdKey, ...(queryKey ?? [{ roleId }])];
export type RoleServiceGetApiRolesGroupPermissionsMeByGroupIdDefaultResponse = Awaited<ReturnType<typeof RoleService.getApiRolesGroupPermissionsMeByGroupId>>;
export type RoleServiceGetApiRolesGroupPermissionsMeByGroupIdQueryResult<TData = RoleServiceGetApiRolesGroupPermissionsMeByGroupIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useRoleServiceGetApiRolesGroupPermissionsMeByGroupIdKey = "RoleServiceGetApiRolesGroupPermissionsMeByGroupId";
export const UseRoleServiceGetApiRolesGroupPermissionsMeByGroupIdKeyFn = ({ groupId }: {
  groupId: string;
}, queryKey?: Array<unknown>) => [useRoleServiceGetApiRolesGroupPermissionsMeByGroupIdKey, ...(queryKey ?? [{ groupId }])];
export type MessagesServiceGetApiMessagesChatByChatIdDefaultResponse = Awaited<ReturnType<typeof MessagesService.getApiMessagesChatByChatId>>;
export type MessagesServiceGetApiMessagesChatByChatIdQueryResult<TData = MessagesServiceGetApiMessagesChatByChatIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useMessagesServiceGetApiMessagesChatByChatIdKey = "MessagesServiceGetApiMessagesChatByChatId";
export const UseMessagesServiceGetApiMessagesChatByChatIdKeyFn = ({ chatId }: {
  chatId: string;
}, queryKey?: Array<unknown>) => [useMessagesServiceGetApiMessagesChatByChatIdKey, ...(queryKey ?? [{ chatId }])];
export type DefaultServiceGetApiDefaultResponse = Awaited<ReturnType<typeof DefaultService.getApi>>;
export type DefaultServiceGetApiQueryResult<TData = DefaultServiceGetApiDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useDefaultServiceGetApiKey = "DefaultServiceGetApi";
export const UseDefaultServiceGetApiKeyFn = (queryKey?: Array<unknown>) => [useDefaultServiceGetApiKey, ...(queryKey ?? [])];
export type AuthServicePostApiAuthJwtLoginMutationResult = Awaited<ReturnType<typeof AuthService.postApiAuthJwtLogin>>;
export type AuthServicePostApiAuthJwtLogoutMutationResult = Awaited<ReturnType<typeof AuthService.postApiAuthJwtLogout>>;
export type AuthServicePostApiAuthRegisterMutationResult = Awaited<ReturnType<typeof AuthService.postApiAuthRegister>>;
export type AuthServicePostApiAuthForgotPasswordMutationResult = Awaited<ReturnType<typeof AuthService.postApiAuthForgotPassword>>;
export type AuthServicePostApiAuthResetPasswordMutationResult = Awaited<ReturnType<typeof AuthService.postApiAuthResetPassword>>;
export type AuthServicePostApiAuthRequestVerifyTokenMutationResult = Awaited<ReturnType<typeof AuthService.postApiAuthRequestVerifyToken>>;
export type AuthServicePostApiAuthVerifyMutationResult = Awaited<ReturnType<typeof AuthService.postApiAuthVerify>>;
export type AuthServicePostApiAuthAccessTokenMutationResult = Awaited<ReturnType<typeof AuthService.postApiAuthAccessToken>>;
export type UsersServicePostApiUsersAvatarMeMutationResult = Awaited<ReturnType<typeof UsersService.postApiUsersAvatarMe>>;
export type GroupServicePostApiGroupsAvatarByGroupIdMutationResult = Awaited<ReturnType<typeof GroupService.postApiGroupsAvatarByGroupId>>;
export type GroupServicePostApiGroupsPanoramaByGroupIdMutationResult = Awaited<ReturnType<typeof GroupService.postApiGroupsPanoramaByGroupId>>;
export type GroupServicePostApiGroupsInviteMutationResult = Awaited<ReturnType<typeof GroupService.postApiGroupsInvite>>;
export type GroupServicePostApiGroupsMutationResult = Awaited<ReturnType<typeof GroupService.postApiGroups>>;
export type ChatServicePostApiChatsByGroupIdMutationResult = Awaited<ReturnType<typeof ChatService.postApiChatsByGroupId>>;
export type RoleServicePostApiRolesGroupByGroupIdMutationResult = Awaited<ReturnType<typeof RoleService.postApiRolesGroupByGroupId>>;
export type UsersServicePatchApiUsersMeMutationResult = Awaited<ReturnType<typeof UsersService.patchApiUsersMe>>;
export type UsersServicePatchApiUsersByIdMutationResult = Awaited<ReturnType<typeof UsersService.patchApiUsersById>>;
export type GroupServicePatchApiGroupsByGroupIdMutationResult = Awaited<ReturnType<typeof GroupService.patchApiGroupsByGroupId>>;
export type ChatServicePatchApiChatsByChatIdMutationResult = Awaited<ReturnType<typeof ChatService.patchApiChatsByChatId>>;
export type RoleServicePatchApiRolesGroupByGroupIdByRoleIdMutationResult = Awaited<ReturnType<typeof RoleService.patchApiRolesGroupByGroupIdByRoleId>>;
export type UsersServiceDeleteApiUsersByIdMutationResult = Awaited<ReturnType<typeof UsersService.deleteApiUsersById>>;
export type GroupServiceDeleteApiGroupsByGroupIdMutationResult = Awaited<ReturnType<typeof GroupService.deleteApiGroupsByGroupId>>;
export type ChatServiceDeleteApiChatsByChatIdMutationResult = Awaited<ReturnType<typeof ChatService.deleteApiChatsByChatId>>;
export type RoleServiceDeleteApiRolesGroupByRoleIdMutationResult = Awaited<ReturnType<typeof RoleService.deleteApiRolesGroupByRoleId>>;
