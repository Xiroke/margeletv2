// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { UseQueryResult } from "@tanstack/react-query";
import { AuthService, ChatService, DefaultService, GroupService, PersonalChatService, RoleGroupService, UsersService } from "../requests/services.gen";
export type UsersServiceGetApiUsersAvatarByGroupUuidDefaultResponse = Awaited<ReturnType<typeof UsersService.getApiUsersAvatarByGroupUuid>>;
export type UsersServiceGetApiUsersAvatarByGroupUuidQueryResult<TData = UsersServiceGetApiUsersAvatarByGroupUuidDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useUsersServiceGetApiUsersAvatarByGroupUuidKey = "UsersServiceGetApiUsersAvatarByGroupUuid";
export const UseUsersServiceGetApiUsersAvatarByGroupUuidKeyFn = ({ groupUuid }: {
  groupUuid: string;
}, queryKey?: Array<unknown>) => [useUsersServiceGetApiUsersAvatarByGroupUuidKey, ...(queryKey ?? [{ groupUuid }])];
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
export type DefaultServiceGetApiAuthenticatedRouteDefaultResponse = Awaited<ReturnType<typeof DefaultService.getApiAuthenticatedRoute>>;
export type DefaultServiceGetApiAuthenticatedRouteQueryResult<TData = DefaultServiceGetApiAuthenticatedRouteDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useDefaultServiceGetApiAuthenticatedRouteKey = "DefaultServiceGetApiAuthenticatedRoute";
export const UseDefaultServiceGetApiAuthenticatedRouteKeyFn = (queryKey?: Array<unknown>) => [useDefaultServiceGetApiAuthenticatedRouteKey, ...(queryKey ?? [])];
export type DefaultServiceGetApiDefaultResponse = Awaited<ReturnType<typeof DefaultService.getApi>>;
export type DefaultServiceGetApiQueryResult<TData = DefaultServiceGetApiDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useDefaultServiceGetApiKey = "DefaultServiceGetApi";
export const UseDefaultServiceGetApiKeyFn = (queryKey?: Array<unknown>) => [useDefaultServiceGetApiKey, ...(queryKey ?? [])];
export type GroupServiceGetApiGroupsAvatarByGroupUuidDefaultResponse = Awaited<ReturnType<typeof GroupService.getApiGroupsAvatarByGroupUuid>>;
export type GroupServiceGetApiGroupsAvatarByGroupUuidQueryResult<TData = GroupServiceGetApiGroupsAvatarByGroupUuidDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useGroupServiceGetApiGroupsAvatarByGroupUuidKey = "GroupServiceGetApiGroupsAvatarByGroupUuid";
export const UseGroupServiceGetApiGroupsAvatarByGroupUuidKeyFn = ({ groupUuid }: {
  groupUuid: string;
}, queryKey?: Array<unknown>) => [useGroupServiceGetApiGroupsAvatarByGroupUuidKey, ...(queryKey ?? [{ groupUuid }])];
export type GroupServiceGetApiGroupsPanoramaByGroupUuidDefaultResponse = Awaited<ReturnType<typeof GroupService.getApiGroupsPanoramaByGroupUuid>>;
export type GroupServiceGetApiGroupsPanoramaByGroupUuidQueryResult<TData = GroupServiceGetApiGroupsPanoramaByGroupUuidDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useGroupServiceGetApiGroupsPanoramaByGroupUuidKey = "GroupServiceGetApiGroupsPanoramaByGroupUuid";
export const UseGroupServiceGetApiGroupsPanoramaByGroupUuidKeyFn = ({ groupUuid }: {
  groupUuid: string;
}, queryKey?: Array<unknown>) => [useGroupServiceGetApiGroupsPanoramaByGroupUuidKey, ...(queryKey ?? [{ groupUuid }])];
export type GroupServiceGetApiGroupsByGroupUuidDefaultResponse = Awaited<ReturnType<typeof GroupService.getApiGroupsByGroupUuid>>;
export type GroupServiceGetApiGroupsByGroupUuidQueryResult<TData = GroupServiceGetApiGroupsByGroupUuidDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useGroupServiceGetApiGroupsByGroupUuidKey = "GroupServiceGetApiGroupsByGroupUuid";
export const UseGroupServiceGetApiGroupsByGroupUuidKeyFn = ({ groupUuid }: {
  groupUuid: string;
}, queryKey?: Array<unknown>) => [useGroupServiceGetApiGroupsByGroupUuidKey, ...(queryKey ?? [{ groupUuid }])];
export type PersonalChatServiceGetApiPersonalChatsByPersonalChatUuidDefaultResponse = Awaited<ReturnType<typeof PersonalChatService.getApiPersonalChatsByPersonalChatUuid>>;
export type PersonalChatServiceGetApiPersonalChatsByPersonalChatUuidQueryResult<TData = PersonalChatServiceGetApiPersonalChatsByPersonalChatUuidDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const usePersonalChatServiceGetApiPersonalChatsByPersonalChatUuidKey = "PersonalChatServiceGetApiPersonalChatsByPersonalChatUuid";
export const UsePersonalChatServiceGetApiPersonalChatsByPersonalChatUuidKeyFn = ({ personalChatUuid }: {
  personalChatUuid: string;
}, queryKey?: Array<unknown>) => [usePersonalChatServiceGetApiPersonalChatsByPersonalChatUuidKey, ...(queryKey ?? [{ personalChatUuid }])];
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
export type UsersServicePostApiUsersAvatarByGroupUuidMutationResult = Awaited<ReturnType<typeof UsersService.postApiUsersAvatarByGroupUuid>>;
export type AuthServicePostApiAuthJwtLoginMutationResult = Awaited<ReturnType<typeof AuthService.postApiAuthJwtLogin>>;
export type AuthServicePostApiAuthJwtLogoutMutationResult = Awaited<ReturnType<typeof AuthService.postApiAuthJwtLogout>>;
export type AuthServicePostApiAuthRegisterMutationResult = Awaited<ReturnType<typeof AuthService.postApiAuthRegister>>;
export type AuthServicePostApiAuthForgotPasswordMutationResult = Awaited<ReturnType<typeof AuthService.postApiAuthForgotPassword>>;
export type AuthServicePostApiAuthResetPasswordMutationResult = Awaited<ReturnType<typeof AuthService.postApiAuthResetPassword>>;
export type AuthServicePostApiAuthRequestVerifyTokenMutationResult = Awaited<ReturnType<typeof AuthService.postApiAuthRequestVerifyToken>>;
export type AuthServicePostApiAuthVerifyMutationResult = Awaited<ReturnType<typeof AuthService.postApiAuthVerify>>;
export type GroupServicePostApiGroupsAvatarByGroupUuidMutationResult = Awaited<ReturnType<typeof GroupService.postApiGroupsAvatarByGroupUuid>>;
export type GroupServicePostApiGroupsPanoramaByGroupUuidMutationResult = Awaited<ReturnType<typeof GroupService.postApiGroupsPanoramaByGroupUuid>>;
export type GroupServicePostApiGroupsMutationResult = Awaited<ReturnType<typeof GroupService.postApiGroups>>;
export type PersonalChatServicePostApiPersonalChatsMutationResult = Awaited<ReturnType<typeof PersonalChatService.postApiPersonalChats>>;
export type ChatServicePostApiChatsMutationResult = Awaited<ReturnType<typeof ChatService.postApiChats>>;
export type RoleGroupServicePostApiRolesGroupMutationResult = Awaited<ReturnType<typeof RoleGroupService.postApiRolesGroup>>;
export type UsersServicePatchApiUsersMeMutationResult = Awaited<ReturnType<typeof UsersService.patchApiUsersMe>>;
export type UsersServicePatchApiUsersByIdMutationResult = Awaited<ReturnType<typeof UsersService.patchApiUsersById>>;
export type GroupServicePatchApiGroupsByGroupUuidMutationResult = Awaited<ReturnType<typeof GroupService.patchApiGroupsByGroupUuid>>;
export type PersonalChatServicePatchApiPersonalChatsByPersonalChatUuidMutationResult = Awaited<ReturnType<typeof PersonalChatService.patchApiPersonalChatsByPersonalChatUuid>>;
export type ChatServicePatchApiChatsByChatUuidMutationResult = Awaited<ReturnType<typeof ChatService.patchApiChatsByChatUuid>>;
export type RoleGroupServicePatchApiRolesGroupByRoleGroupIdMutationResult = Awaited<ReturnType<typeof RoleGroupService.patchApiRolesGroupByRoleGroupId>>;
export type UsersServiceDeleteApiUsersByIdMutationResult = Awaited<ReturnType<typeof UsersService.deleteApiUsersById>>;
export type GroupServiceDeleteApiGroupsByGroupUuidMutationResult = Awaited<ReturnType<typeof GroupService.deleteApiGroupsByGroupUuid>>;
export type PersonalChatServiceDeleteApiPersonalChatsByPersonalChatUuidMutationResult = Awaited<ReturnType<typeof PersonalChatService.deleteApiPersonalChatsByPersonalChatUuid>>;
export type ChatServiceDeleteApiChatsByChatUuidMutationResult = Awaited<ReturnType<typeof ChatService.deleteApiChatsByChatUuid>>;
export type RoleGroupServiceDeleteApiRolesGroupByRoleGroupIdMutationResult = Awaited<ReturnType<typeof RoleGroupService.deleteApiRolesGroupByRoleGroupId>>;
