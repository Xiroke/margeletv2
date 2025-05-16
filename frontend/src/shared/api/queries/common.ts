// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { UseQueryResult } from "@tanstack/react-query";
import { AuthService, ChatService, DefaultService, GroupService, MessagesService, RoleGroupService, UsersService } from "../requests/services.gen";
export type UsersServiceGetApiUsersAvatarByGroupIdDefaultResponse = Awaited<ReturnType<typeof UsersService.getApiUsersAvatarByGroupId>>;
export type UsersServiceGetApiUsersAvatarByGroupIdQueryResult<TData = UsersServiceGetApiUsersAvatarByGroupIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useUsersServiceGetApiUsersAvatarByGroupIdKey = "UsersServiceGetApiUsersAvatarByGroupId";
export const UseUsersServiceGetApiUsersAvatarByGroupIdKeyFn = ({ groupId }: {
  groupId: string;
}, queryKey?: Array<unknown>) => [useUsersServiceGetApiUsersAvatarByGroupIdKey, ...(queryKey ?? [{ groupId }])];
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
export type AuthServiceGetApiAuthAccessTokenDefaultResponse = Awaited<ReturnType<typeof AuthService.getApiAuthAccessToken>>;
export type AuthServiceGetApiAuthAccessTokenQueryResult<TData = AuthServiceGetApiAuthAccessTokenDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useAuthServiceGetApiAuthAccessTokenKey = "AuthServiceGetApiAuthAccessToken";
export const UseAuthServiceGetApiAuthAccessTokenKeyFn = (queryKey?: Array<unknown>) => [useAuthServiceGetApiAuthAccessTokenKey, ...(queryKey ?? [])];
export type DefaultServiceGetApiAuthenticatedRouteDefaultResponse = Awaited<ReturnType<typeof DefaultService.getApiAuthenticatedRoute>>;
export type DefaultServiceGetApiAuthenticatedRouteQueryResult<TData = DefaultServiceGetApiAuthenticatedRouteDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useDefaultServiceGetApiAuthenticatedRouteKey = "DefaultServiceGetApiAuthenticatedRoute";
export const UseDefaultServiceGetApiAuthenticatedRouteKeyFn = (queryKey?: Array<unknown>) => [useDefaultServiceGetApiAuthenticatedRouteKey, ...(queryKey ?? [])];
export type DefaultServiceGetApiDefaultResponse = Awaited<ReturnType<typeof DefaultService.getApi>>;
export type DefaultServiceGetApiQueryResult<TData = DefaultServiceGetApiDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useDefaultServiceGetApiKey = "DefaultServiceGetApi";
export const UseDefaultServiceGetApiKeyFn = (queryKey?: Array<unknown>) => [useDefaultServiceGetApiKey, ...(queryKey ?? [])];
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
export type GroupServiceGetApiGroupsUserGroupsMeDefaultResponse = Awaited<ReturnType<typeof GroupService.getApiGroupsUserGroupsMe>>;
export type GroupServiceGetApiGroupsUserGroupsMeQueryResult<TData = GroupServiceGetApiGroupsUserGroupsMeDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useGroupServiceGetApiGroupsUserGroupsMeKey = "GroupServiceGetApiGroupsUserGroupsMe";
export const UseGroupServiceGetApiGroupsUserGroupsMeKeyFn = (queryKey?: Array<unknown>) => [useGroupServiceGetApiGroupsUserGroupsMeKey, ...(queryKey ?? [])];
export type GroupServiceGetApiGroupsUserGroupsByUserIdDefaultResponse = Awaited<ReturnType<typeof GroupService.getApiGroupsUserGroupsByUserId>>;
export type GroupServiceGetApiGroupsUserGroupsByUserIdQueryResult<TData = GroupServiceGetApiGroupsUserGroupsByUserIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useGroupServiceGetApiGroupsUserGroupsByUserIdKey = "GroupServiceGetApiGroupsUserGroupsByUserId";
export const UseGroupServiceGetApiGroupsUserGroupsByUserIdKeyFn = ({ userId }: {
  userId: string;
}, queryKey?: Array<unknown>) => [useGroupServiceGetApiGroupsUserGroupsByUserIdKey, ...(queryKey ?? [{ userId }])];
export type GroupServiceGetApiGroupsByGroupIdDefaultResponse = Awaited<ReturnType<typeof GroupService.getApiGroupsByGroupId>>;
export type GroupServiceGetApiGroupsByGroupIdQueryResult<TData = GroupServiceGetApiGroupsByGroupIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useGroupServiceGetApiGroupsByGroupIdKey = "GroupServiceGetApiGroupsByGroupId";
export const UseGroupServiceGetApiGroupsByGroupIdKeyFn = ({ groupId }: {
  groupId: string;
}, queryKey?: Array<unknown>) => [useGroupServiceGetApiGroupsByGroupIdKey, ...(queryKey ?? [{ groupId }])];
export type ChatServiceGetApiChatsChatsMeDefaultResponse = Awaited<ReturnType<typeof ChatService.getApiChatsChatsMe>>;
export type ChatServiceGetApiChatsChatsMeQueryResult<TData = ChatServiceGetApiChatsChatsMeDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useChatServiceGetApiChatsChatsMeKey = "ChatServiceGetApiChatsChatsMe";
export const UseChatServiceGetApiChatsChatsMeKeyFn = (queryKey?: Array<unknown>) => [useChatServiceGetApiChatsChatsMeKey, ...(queryKey ?? [])];
export type ChatServiceGetApiChatsGroupChatsByGroupIdDefaultResponse = Awaited<ReturnType<typeof ChatService.getApiChatsGroupChatsByGroupId>>;
export type ChatServiceGetApiChatsGroupChatsByGroupIdQueryResult<TData = ChatServiceGetApiChatsGroupChatsByGroupIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useChatServiceGetApiChatsGroupChatsByGroupIdKey = "ChatServiceGetApiChatsGroupChatsByGroupId";
export const UseChatServiceGetApiChatsGroupChatsByGroupIdKeyFn = ({ groupId }: {
  groupId: string;
}, queryKey?: Array<unknown>) => [useChatServiceGetApiChatsGroupChatsByGroupIdKey, ...(queryKey ?? [{ groupId }])];
export type ChatServiceGetApiChatsByChatUuidDefaultResponse = Awaited<ReturnType<typeof ChatService.getApiChatsByChatUuid>>;
export type ChatServiceGetApiChatsByChatUuidQueryResult<TData = ChatServiceGetApiChatsByChatUuidDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useChatServiceGetApiChatsByChatUuidKey = "ChatServiceGetApiChatsByChatUuid";
export const UseChatServiceGetApiChatsByChatUuidKeyFn = ({ chatUuid }: {
  chatUuid: string;
}, queryKey?: Array<unknown>) => [useChatServiceGetApiChatsByChatUuidKey, ...(queryKey ?? [{ chatUuid }])];
export type RoleGroupServiceGetApiRolesGroupByRoleGroupIdDefaultResponse = Awaited<ReturnType<typeof RoleGroupService.getApiRolesGroupByRoleGroupId>>;
export type RoleGroupServiceGetApiRolesGroupByRoleGroupIdQueryResult<TData = RoleGroupServiceGetApiRolesGroupByRoleGroupIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useRoleGroupServiceGetApiRolesGroupByRoleGroupIdKey = "RoleGroupServiceGetApiRolesGroupByRoleGroupId";
export const UseRoleGroupServiceGetApiRolesGroupByRoleGroupIdKeyFn = ({ roleGroupId }: {
  roleGroupId: number;
}, queryKey?: Array<unknown>) => [useRoleGroupServiceGetApiRolesGroupByRoleGroupIdKey, ...(queryKey ?? [{ roleGroupId }])];
export type MessagesServiceGetApiMessagesChatByChatIdDefaultResponse = Awaited<ReturnType<typeof MessagesService.getApiMessagesChatByChatId>>;
export type MessagesServiceGetApiMessagesChatByChatIdQueryResult<TData = MessagesServiceGetApiMessagesChatByChatIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useMessagesServiceGetApiMessagesChatByChatIdKey = "MessagesServiceGetApiMessagesChatByChatId";
export const UseMessagesServiceGetApiMessagesChatByChatIdKeyFn = ({ chatId }: {
  chatId: string;
}, queryKey?: Array<unknown>) => [useMessagesServiceGetApiMessagesChatByChatIdKey, ...(queryKey ?? [{ chatId }])];
export type MessagesServiceGetApiMessagesByMessageIdDefaultResponse = Awaited<ReturnType<typeof MessagesService.getApiMessagesByMessageId>>;
export type MessagesServiceGetApiMessagesByMessageIdQueryResult<TData = MessagesServiceGetApiMessagesByMessageIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useMessagesServiceGetApiMessagesByMessageIdKey = "MessagesServiceGetApiMessagesByMessageId";
export const UseMessagesServiceGetApiMessagesByMessageIdKeyFn = ({ messageId }: {
  messageId: string;
}, queryKey?: Array<unknown>) => [useMessagesServiceGetApiMessagesByMessageIdKey, ...(queryKey ?? [{ messageId }])];
export type UsersServicePostApiUsersAvatarByGroupIdMutationResult = Awaited<ReturnType<typeof UsersService.postApiUsersAvatarByGroupId>>;
export type AuthServicePostApiAuthJwtLoginMutationResult = Awaited<ReturnType<typeof AuthService.postApiAuthJwtLogin>>;
export type AuthServicePostApiAuthJwtLogoutMutationResult = Awaited<ReturnType<typeof AuthService.postApiAuthJwtLogout>>;
export type AuthServicePostApiAuthRegisterMutationResult = Awaited<ReturnType<typeof AuthService.postApiAuthRegister>>;
export type AuthServicePostApiAuthForgotPasswordMutationResult = Awaited<ReturnType<typeof AuthService.postApiAuthForgotPassword>>;
export type AuthServicePostApiAuthResetPasswordMutationResult = Awaited<ReturnType<typeof AuthService.postApiAuthResetPassword>>;
export type AuthServicePostApiAuthRequestVerifyTokenMutationResult = Awaited<ReturnType<typeof AuthService.postApiAuthRequestVerifyToken>>;
export type AuthServicePostApiAuthVerifyMutationResult = Awaited<ReturnType<typeof AuthService.postApiAuthVerify>>;
export type GroupServicePostApiGroupsAvatarByGroupIdMutationResult = Awaited<ReturnType<typeof GroupService.postApiGroupsAvatarByGroupId>>;
export type GroupServicePostApiGroupsPanoramaByGroupIdMutationResult = Awaited<ReturnType<typeof GroupService.postApiGroupsPanoramaByGroupId>>;
export type GroupServicePostApiGroupsInviteMutationResult = Awaited<ReturnType<typeof GroupService.postApiGroupsInvite>>;
export type GroupServicePostApiGroupsMutationResult = Awaited<ReturnType<typeof GroupService.postApiGroups>>;
export type ChatServicePostApiChatsByGroupIdMutationResult = Awaited<ReturnType<typeof ChatService.postApiChatsByGroupId>>;
export type RoleGroupServicePostApiRolesGroupMutationResult = Awaited<ReturnType<typeof RoleGroupService.postApiRolesGroup>>;
export type MessagesServicePostApiMessagesMutationResult = Awaited<ReturnType<typeof MessagesService.postApiMessages>>;
export type UsersServicePatchApiUsersMeMutationResult = Awaited<ReturnType<typeof UsersService.patchApiUsersMe>>;
export type UsersServicePatchApiUsersByIdMutationResult = Awaited<ReturnType<typeof UsersService.patchApiUsersById>>;
export type GroupServicePatchApiGroupsByGroupIdMutationResult = Awaited<ReturnType<typeof GroupService.patchApiGroupsByGroupId>>;
export type ChatServicePatchApiChatsByChatUuidMutationResult = Awaited<ReturnType<typeof ChatService.patchApiChatsByChatUuid>>;
export type RoleGroupServicePatchApiRolesGroupByRoleGroupIdMutationResult = Awaited<ReturnType<typeof RoleGroupService.patchApiRolesGroupByRoleGroupId>>;
export type MessagesServicePatchApiMessagesByMessageIdMutationResult = Awaited<ReturnType<typeof MessagesService.patchApiMessagesByMessageId>>;
export type UsersServiceDeleteApiUsersByIdMutationResult = Awaited<ReturnType<typeof UsersService.deleteApiUsersById>>;
export type GroupServiceDeleteApiGroupsByGroupIdMutationResult = Awaited<ReturnType<typeof GroupService.deleteApiGroupsByGroupId>>;
export type ChatServiceDeleteApiChatsByChatUuidMutationResult = Awaited<ReturnType<typeof ChatService.deleteApiChatsByChatUuid>>;
export type RoleGroupServiceDeleteApiRolesGroupByRoleGroupIdMutationResult = Awaited<ReturnType<typeof RoleGroupService.deleteApiRolesGroupByRoleGroupId>>;
export type MessagesServiceDeleteApiMessagesByMessageIdMutationResult = Awaited<ReturnType<typeof MessagesService.deleteApiMessagesByMessageId>>;
