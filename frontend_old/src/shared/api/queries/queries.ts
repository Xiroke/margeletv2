// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { AuthService, ChatService, DefaultService, GroupService, MessagesService, RoleService, UsersService } from "../requests/services.gen";
import { Body_auth_db_cookie_login_api_auth_jwt_login_post, Body_reset_forgot_password_api_auth_forgot_password_post, Body_reset_reset_password_api_auth_reset_password_post, Body_upload_avatar_api_groups_avatar__group_id__post, Body_upload_avatar_api_users_avatar_me_post, Body_upload_panorama_api_groups_panorama__group_id__post, Body_verify_request_token_api_auth_request_verify_token_post, Body_verify_verify_api_auth_verify_post, ChatCreate, ChatUpdate, GroupCreate, GroupUpdate, RoleCreate, RoleUpdate, UserCreate, UserUpdate } from "../requests/types.gen";
import * as Common from "./common";
export const useAuthServiceGetApiAuthMe = <TData = Common.AuthServiceGetApiAuthMeDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseAuthServiceGetApiAuthMeKeyFn(queryKey), queryFn: () => AuthService.getApiAuthMe() as TData, ...options });
export const useAuthServiceGetApiAuthMeAlterntive = <TData = Common.AuthServiceGetApiAuthMeAlterntiveDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseAuthServiceGetApiAuthMeAlterntiveKeyFn(queryKey), queryFn: () => AuthService.getApiAuthMeAlterntive() as TData, ...options });
export const useUsersServiceGetApiUsersMe = <TData = Common.UsersServiceGetApiUsersMeDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseUsersServiceGetApiUsersMeKeyFn(queryKey), queryFn: () => UsersService.getApiUsersMe() as TData, ...options });
export const useUsersServiceGetApiUsersById = <TData = Common.UsersServiceGetApiUsersByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
  id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseUsersServiceGetApiUsersByIdKeyFn({ id }, queryKey), queryFn: () => UsersService.getApiUsersById({ id }) as TData, ...options });
export const useUsersServiceGetApiUsersAvatarMe = <TData = Common.UsersServiceGetApiUsersAvatarMeDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseUsersServiceGetApiUsersAvatarMeKeyFn(queryKey), queryFn: () => UsersService.getApiUsersAvatarMe() as TData, ...options });
export const useGroupServiceGetApiGroupsUserGroupsMe = <TData = Common.GroupServiceGetApiGroupsUserGroupsMeDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseGroupServiceGetApiGroupsUserGroupsMeKeyFn(queryKey), queryFn: () => GroupService.getApiGroupsUserGroupsMe() as TData, ...options });
export const useGroupServiceGetApiGroupsAvatarByGroupId = <TData = Common.GroupServiceGetApiGroupsAvatarByGroupIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ groupId }: {
  groupId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseGroupServiceGetApiGroupsAvatarByGroupIdKeyFn({ groupId }, queryKey), queryFn: () => GroupService.getApiGroupsAvatarByGroupId({ groupId }) as TData, ...options });
export const useGroupServiceGetApiGroupsPanoramaByGroupId = <TData = Common.GroupServiceGetApiGroupsPanoramaByGroupIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ groupId }: {
  groupId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseGroupServiceGetApiGroupsPanoramaByGroupIdKeyFn({ groupId }, queryKey), queryFn: () => GroupService.getApiGroupsPanoramaByGroupId({ groupId }) as TData, ...options });
export const useGroupServiceGetApiGroupsInviteByGroupId = <TData = Common.GroupServiceGetApiGroupsInviteByGroupIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ groupId }: {
  groupId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseGroupServiceGetApiGroupsInviteByGroupIdKeyFn({ groupId }, queryKey), queryFn: () => GroupService.getApiGroupsInviteByGroupId({ groupId }) as TData, ...options });
export const useGroupServiceGetApiGroupsByGroupId = <TData = Common.GroupServiceGetApiGroupsByGroupIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ groupId }: {
  groupId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseGroupServiceGetApiGroupsByGroupIdKeyFn({ groupId }, queryKey), queryFn: () => GroupService.getApiGroupsByGroupId({ groupId }) as TData, ...options });
export const useChatServiceGetApiChatsGroupChatsByGroupId = <TData = Common.ChatServiceGetApiChatsGroupChatsByGroupIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ groupId }: {
  groupId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseChatServiceGetApiChatsGroupChatsByGroupIdKeyFn({ groupId }, queryKey), queryFn: () => ChatService.getApiChatsGroupChatsByGroupId({ groupId }) as TData, ...options });
export const useRoleServiceGetApiRolesGroupByRoleId = <TData = Common.RoleServiceGetApiRolesGroupByRoleIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ roleId }: {
  roleId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseRoleServiceGetApiRolesGroupByRoleIdKeyFn({ roleId }, queryKey), queryFn: () => RoleService.getApiRolesGroupByRoleId({ roleId }) as TData, ...options });
export const useRoleServiceGetApiRolesGroupPermissionsMeByGroupId = <TData = Common.RoleServiceGetApiRolesGroupPermissionsMeByGroupIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ groupId }: {
  groupId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseRoleServiceGetApiRolesGroupPermissionsMeByGroupIdKeyFn({ groupId }, queryKey), queryFn: () => RoleService.getApiRolesGroupPermissionsMeByGroupId({ groupId }) as TData, ...options });
export const useMessagesServiceGetApiMessagesChatByChatId = <TData = Common.MessagesServiceGetApiMessagesChatByChatIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ amount, chatId, page }: {
  amount?: number;
  chatId: string;
  page?: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseMessagesServiceGetApiMessagesChatByChatIdKeyFn({ amount, chatId, page }, queryKey), queryFn: () => MessagesService.getApiMessagesChatByChatId({ amount, chatId, page }) as TData, ...options });
export const useDefaultServiceGetApi = <TData = Common.DefaultServiceGetApiDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseDefaultServiceGetApiKeyFn(queryKey), queryFn: () => DefaultService.getApi() as TData, ...options });
export const useAuthServicePostApiAuthJwtLogin = <TData = Common.AuthServicePostApiAuthJwtLoginMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  formData: Body_auth_db_cookie_login_api_auth_jwt_login_post;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  formData: Body_auth_db_cookie_login_api_auth_jwt_login_post;
}, TContext>({ mutationFn: ({ formData }) => AuthService.postApiAuthJwtLogin({ formData }) as unknown as Promise<TData>, ...options });
export const useAuthServicePostApiAuthJwtLogout = <TData = Common.AuthServicePostApiAuthJwtLogoutMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, void, TContext>, "mutationFn">) => useMutation<TData, TError, void, TContext>({ mutationFn: () => AuthService.postApiAuthJwtLogout() as unknown as Promise<TData>, ...options });
export const useAuthServicePostApiAuthRegister = <TData = Common.AuthServicePostApiAuthRegisterMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: UserCreate;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: UserCreate;
}, TContext>({ mutationFn: ({ requestBody }) => AuthService.postApiAuthRegister({ requestBody }) as unknown as Promise<TData>, ...options });
export const useAuthServicePostApiAuthForgotPassword = <TData = Common.AuthServicePostApiAuthForgotPasswordMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: Body_reset_forgot_password_api_auth_forgot_password_post;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: Body_reset_forgot_password_api_auth_forgot_password_post;
}, TContext>({ mutationFn: ({ requestBody }) => AuthService.postApiAuthForgotPassword({ requestBody }) as unknown as Promise<TData>, ...options });
export const useAuthServicePostApiAuthResetPassword = <TData = Common.AuthServicePostApiAuthResetPasswordMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: Body_reset_reset_password_api_auth_reset_password_post;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: Body_reset_reset_password_api_auth_reset_password_post;
}, TContext>({ mutationFn: ({ requestBody }) => AuthService.postApiAuthResetPassword({ requestBody }) as unknown as Promise<TData>, ...options });
export const useAuthServicePostApiAuthRequestVerifyToken = <TData = Common.AuthServicePostApiAuthRequestVerifyTokenMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: Body_verify_request_token_api_auth_request_verify_token_post;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: Body_verify_request_token_api_auth_request_verify_token_post;
}, TContext>({ mutationFn: ({ requestBody }) => AuthService.postApiAuthRequestVerifyToken({ requestBody }) as unknown as Promise<TData>, ...options });
export const useAuthServicePostApiAuthVerify = <TData = Common.AuthServicePostApiAuthVerifyMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: Body_verify_verify_api_auth_verify_post;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: Body_verify_verify_api_auth_verify_post;
}, TContext>({ mutationFn: ({ requestBody }) => AuthService.postApiAuthVerify({ requestBody }) as unknown as Promise<TData>, ...options });
export const useAuthServicePostApiAuthAccessToken = <TData = Common.AuthServicePostApiAuthAccessTokenMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, void, TContext>, "mutationFn">) => useMutation<TData, TError, void, TContext>({ mutationFn: () => AuthService.postApiAuthAccessToken() as unknown as Promise<TData>, ...options });
export const useUsersServicePostApiUsersAvatarMe = <TData = Common.UsersServicePostApiUsersAvatarMeMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  formData: Body_upload_avatar_api_users_avatar_me_post;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  formData: Body_upload_avatar_api_users_avatar_me_post;
}, TContext>({ mutationFn: ({ formData }) => UsersService.postApiUsersAvatarMe({ formData }) as unknown as Promise<TData>, ...options });
export const useGroupServicePostApiGroupsAvatarByGroupId = <TData = Common.GroupServicePostApiGroupsAvatarByGroupIdMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  formData: Body_upload_avatar_api_groups_avatar__group_id__post;
  groupId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  formData: Body_upload_avatar_api_groups_avatar__group_id__post;
  groupId: string;
}, TContext>({ mutationFn: ({ formData, groupId }) => GroupService.postApiGroupsAvatarByGroupId({ formData, groupId }) as unknown as Promise<TData>, ...options });
export const useGroupServicePostApiGroupsPanoramaByGroupId = <TData = Common.GroupServicePostApiGroupsPanoramaByGroupIdMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  formData: Body_upload_panorama_api_groups_panorama__group_id__post;
  groupId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  formData: Body_upload_panorama_api_groups_panorama__group_id__post;
  groupId: string;
}, TContext>({ mutationFn: ({ formData, groupId }) => GroupService.postApiGroupsPanoramaByGroupId({ formData, groupId }) as unknown as Promise<TData>, ...options });
export const useGroupServicePostApiGroupsInvite = <TData = Common.GroupServicePostApiGroupsInviteMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: string;
}, TContext>({ mutationFn: ({ requestBody }) => GroupService.postApiGroupsInvite({ requestBody }) as unknown as Promise<TData>, ...options });
export const useGroupServicePostApiGroupsLeaveByGroupId = <TData = Common.GroupServicePostApiGroupsLeaveByGroupIdMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  groupId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  groupId: string;
}, TContext>({ mutationFn: ({ groupId }) => GroupService.postApiGroupsLeaveByGroupId({ groupId }) as unknown as Promise<TData>, ...options });
export const useGroupServicePostApiGroups = <TData = Common.GroupServicePostApiGroupsMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: GroupCreate;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: GroupCreate;
}, TContext>({ mutationFn: ({ requestBody }) => GroupService.postApiGroups({ requestBody }) as unknown as Promise<TData>, ...options });
export const useChatServicePostApiChatsByGroupId = <TData = Common.ChatServicePostApiChatsByGroupIdMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  groupId: string;
  requestBody: ChatCreate;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  groupId: string;
  requestBody: ChatCreate;
}, TContext>({ mutationFn: ({ groupId, requestBody }) => ChatService.postApiChatsByGroupId({ groupId, requestBody }) as unknown as Promise<TData>, ...options });
export const useRoleServicePostApiRolesGroupByGroupId = <TData = Common.RoleServicePostApiRolesGroupByGroupIdMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  groupId: string;
  requestBody: RoleCreate;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  groupId: string;
  requestBody: RoleCreate;
}, TContext>({ mutationFn: ({ groupId, requestBody }) => RoleService.postApiRolesGroupByGroupId({ groupId, requestBody }) as unknown as Promise<TData>, ...options });
export const useUsersServicePatchApiUsersMe = <TData = Common.UsersServicePatchApiUsersMeMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: UserUpdate;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: UserUpdate;
}, TContext>({ mutationFn: ({ requestBody }) => UsersService.patchApiUsersMe({ requestBody }) as unknown as Promise<TData>, ...options });
export const useUsersServicePatchApiUsersById = <TData = Common.UsersServicePatchApiUsersByIdMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  id: string;
  requestBody: UserUpdate;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  id: string;
  requestBody: UserUpdate;
}, TContext>({ mutationFn: ({ id, requestBody }) => UsersService.patchApiUsersById({ id, requestBody }) as unknown as Promise<TData>, ...options });
export const useGroupServicePatchApiGroupsTitleByGroupId = <TData = Common.GroupServicePatchApiGroupsTitleByGroupIdMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  groupId: string;
  requestBody: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  groupId: string;
  requestBody: string;
}, TContext>({ mutationFn: ({ groupId, requestBody }) => GroupService.patchApiGroupsTitleByGroupId({ groupId, requestBody }) as unknown as Promise<TData>, ...options });
export const useGroupServicePatchApiGroupsByGroupId = <TData = Common.GroupServicePatchApiGroupsByGroupIdMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  groupId: string;
  requestBody: GroupUpdate;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  groupId: string;
  requestBody: GroupUpdate;
}, TContext>({ mutationFn: ({ groupId, requestBody }) => GroupService.patchApiGroupsByGroupId({ groupId, requestBody }) as unknown as Promise<TData>, ...options });
export const useChatServicePatchApiChatsByChatId = <TData = Common.ChatServicePatchApiChatsByChatIdMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  chatId: string;
  requestBody: ChatUpdate;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  chatId: string;
  requestBody: ChatUpdate;
}, TContext>({ mutationFn: ({ chatId, requestBody }) => ChatService.patchApiChatsByChatId({ chatId, requestBody }) as unknown as Promise<TData>, ...options });
export const useRoleServicePatchApiRolesGroupByGroupIdByRoleId = <TData = Common.RoleServicePatchApiRolesGroupByGroupIdByRoleIdMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  groupId: string;
  requestBody: RoleUpdate;
  roleId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  groupId: string;
  requestBody: RoleUpdate;
  roleId: string;
}, TContext>({ mutationFn: ({ groupId, requestBody, roleId }) => RoleService.patchApiRolesGroupByGroupIdByRoleId({ groupId, requestBody, roleId }) as unknown as Promise<TData>, ...options });
export const useUsersServiceDeleteApiUsersById = <TData = Common.UsersServiceDeleteApiUsersByIdMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  id: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  id: string;
}, TContext>({ mutationFn: ({ id }) => UsersService.deleteApiUsersById({ id }) as unknown as Promise<TData>, ...options });
export const useGroupServiceDeleteApiGroupsByGroupId = <TData = Common.GroupServiceDeleteApiGroupsByGroupIdMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  groupId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  groupId: string;
}, TContext>({ mutationFn: ({ groupId }) => GroupService.deleteApiGroupsByGroupId({ groupId }) as unknown as Promise<TData>, ...options });
export const useChatServiceDeleteApiChatsByChatId = <TData = Common.ChatServiceDeleteApiChatsByChatIdMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  chatId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  chatId: string;
}, TContext>({ mutationFn: ({ chatId }) => ChatService.deleteApiChatsByChatId({ chatId }) as unknown as Promise<TData>, ...options });
export const useRoleServiceDeleteApiRolesGroupByRoleId = <TData = Common.RoleServiceDeleteApiRolesGroupByRoleIdMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  roleId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  roleId: string;
}, TContext>({ mutationFn: ({ roleId }) => RoleService.deleteApiRolesGroupByRoleId({ roleId }) as unknown as Promise<TData>, ...options });
