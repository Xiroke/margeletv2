// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { AuthService, ChatService, DefaultService, GroupService, MessagesService, RoleGroupService, UsersService } from "../requests/services.gen";
import { Body_auth_db_cookie_login_api_auth_jwt_login_post, Body_reset_forgot_password_api_auth_forgot_password_post, Body_reset_reset_password_api_auth_reset_password_post, Body_upload_avatar_api_groups_avatar__group_id__post, Body_upload_avatar_api_users_avatar__group_id__post, Body_upload_panorama_api_groups_panorama__group_id__post, Body_verify_request_token_api_auth_request_verify_token_post, Body_verify_verify_api_auth_verify_post, CreateChatSchema, CreateGroupSchema, CreateMessageSchema, CreateRoleGroupSchema, UpdateChatSchema, UpdateGroupSchema, UpdateMessageSchema, UpdateRoleGroupSchema, UserCreate, UserUpdate } from "../requests/types.gen";
import * as Common from "./common";
export const useUsersServiceGetApiUsersAvatarByGroupId = <TData = Common.UsersServiceGetApiUsersAvatarByGroupIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ groupId }: {
  groupId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseUsersServiceGetApiUsersAvatarByGroupIdKeyFn({ groupId }, queryKey), queryFn: () => UsersService.getApiUsersAvatarByGroupId({ groupId }) as TData, ...options });
export const useUsersServiceGetApiUsersMe = <TData = Common.UsersServiceGetApiUsersMeDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseUsersServiceGetApiUsersMeKeyFn(queryKey), queryFn: () => UsersService.getApiUsersMe() as TData, ...options });
export const useUsersServiceGetApiUsersById = <TData = Common.UsersServiceGetApiUsersByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
  id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseUsersServiceGetApiUsersByIdKeyFn({ id }, queryKey), queryFn: () => UsersService.getApiUsersById({ id }) as TData, ...options });
export const useAuthServiceGetApiAuthAccessToken = <TData = Common.AuthServiceGetApiAuthAccessTokenDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseAuthServiceGetApiAuthAccessTokenKeyFn(queryKey), queryFn: () => AuthService.getApiAuthAccessToken() as TData, ...options });
export const useDefaultServiceGetApiAuthenticatedRoute = <TData = Common.DefaultServiceGetApiAuthenticatedRouteDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseDefaultServiceGetApiAuthenticatedRouteKeyFn(queryKey), queryFn: () => DefaultService.getApiAuthenticatedRoute() as TData, ...options });
export const useDefaultServiceGetApi = <TData = Common.DefaultServiceGetApiDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseDefaultServiceGetApiKeyFn(queryKey), queryFn: () => DefaultService.getApi() as TData, ...options });
export const useGroupServiceGetApiGroupsAvatarByGroupId = <TData = Common.GroupServiceGetApiGroupsAvatarByGroupIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ groupId }: {
  groupId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseGroupServiceGetApiGroupsAvatarByGroupIdKeyFn({ groupId }, queryKey), queryFn: () => GroupService.getApiGroupsAvatarByGroupId({ groupId }) as TData, ...options });
export const useGroupServiceGetApiGroupsPanoramaByGroupId = <TData = Common.GroupServiceGetApiGroupsPanoramaByGroupIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ groupId }: {
  groupId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseGroupServiceGetApiGroupsPanoramaByGroupIdKeyFn({ groupId }, queryKey), queryFn: () => GroupService.getApiGroupsPanoramaByGroupId({ groupId }) as TData, ...options });
export const useGroupServiceGetApiGroupsInviteByGroupId = <TData = Common.GroupServiceGetApiGroupsInviteByGroupIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ groupId }: {
  groupId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseGroupServiceGetApiGroupsInviteByGroupIdKeyFn({ groupId }, queryKey), queryFn: () => GroupService.getApiGroupsInviteByGroupId({ groupId }) as TData, ...options });
export const useGroupServiceGetApiGroupsUserGroupsMe = <TData = Common.GroupServiceGetApiGroupsUserGroupsMeDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseGroupServiceGetApiGroupsUserGroupsMeKeyFn(queryKey), queryFn: () => GroupService.getApiGroupsUserGroupsMe() as TData, ...options });
export const useGroupServiceGetApiGroupsUserGroupsByUserId = <TData = Common.GroupServiceGetApiGroupsUserGroupsByUserIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ userId }: {
  userId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseGroupServiceGetApiGroupsUserGroupsByUserIdKeyFn({ userId }, queryKey), queryFn: () => GroupService.getApiGroupsUserGroupsByUserId({ userId }) as TData, ...options });
export const useGroupServiceGetApiGroupsByGroupId = <TData = Common.GroupServiceGetApiGroupsByGroupIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ groupId }: {
  groupId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseGroupServiceGetApiGroupsByGroupIdKeyFn({ groupId }, queryKey), queryFn: () => GroupService.getApiGroupsByGroupId({ groupId }) as TData, ...options });
export const useChatServiceGetApiChatsChatsMe = <TData = Common.ChatServiceGetApiChatsChatsMeDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseChatServiceGetApiChatsChatsMeKeyFn(queryKey), queryFn: () => ChatService.getApiChatsChatsMe() as TData, ...options });
export const useChatServiceGetApiChatsGroupChatsByGroupId = <TData = Common.ChatServiceGetApiChatsGroupChatsByGroupIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ groupId }: {
  groupId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseChatServiceGetApiChatsGroupChatsByGroupIdKeyFn({ groupId }, queryKey), queryFn: () => ChatService.getApiChatsGroupChatsByGroupId({ groupId }) as TData, ...options });
export const useChatServiceGetApiChatsByChatUuid = <TData = Common.ChatServiceGetApiChatsByChatUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ chatUuid }: {
  chatUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseChatServiceGetApiChatsByChatUuidKeyFn({ chatUuid }, queryKey), queryFn: () => ChatService.getApiChatsByChatUuid({ chatUuid }) as TData, ...options });
export const useRoleGroupServiceGetApiRolesGroupByRoleGroupId = <TData = Common.RoleGroupServiceGetApiRolesGroupByRoleGroupIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ roleGroupId }: {
  roleGroupId: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseRoleGroupServiceGetApiRolesGroupByRoleGroupIdKeyFn({ roleGroupId }, queryKey), queryFn: () => RoleGroupService.getApiRolesGroupByRoleGroupId({ roleGroupId }) as TData, ...options });
export const useMessagesServiceGetApiMessagesChatByChatId = <TData = Common.MessagesServiceGetApiMessagesChatByChatIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ chatId }: {
  chatId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseMessagesServiceGetApiMessagesChatByChatIdKeyFn({ chatId }, queryKey), queryFn: () => MessagesService.getApiMessagesChatByChatId({ chatId }) as TData, ...options });
export const useMessagesServiceGetApiMessagesByMessageId = <TData = Common.MessagesServiceGetApiMessagesByMessageIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ messageId }: {
  messageId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseMessagesServiceGetApiMessagesByMessageIdKeyFn({ messageId }, queryKey), queryFn: () => MessagesService.getApiMessagesByMessageId({ messageId }) as TData, ...options });
export const useUsersServicePostApiUsersAvatarByGroupId = <TData = Common.UsersServicePostApiUsersAvatarByGroupIdMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  formData: Body_upload_avatar_api_users_avatar__group_id__post;
  groupId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  formData: Body_upload_avatar_api_users_avatar__group_id__post;
  groupId: string;
}, TContext>({ mutationFn: ({ formData, groupId }) => UsersService.postApiUsersAvatarByGroupId({ formData, groupId }) as unknown as Promise<TData>, ...options });
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
export const useGroupServicePostApiGroups = <TData = Common.GroupServicePostApiGroupsMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: CreateGroupSchema;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: CreateGroupSchema;
}, TContext>({ mutationFn: ({ requestBody }) => GroupService.postApiGroups({ requestBody }) as unknown as Promise<TData>, ...options });
export const useChatServicePostApiChatsByGroupId = <TData = Common.ChatServicePostApiChatsByGroupIdMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  groupId: string;
  requestBody: CreateChatSchema;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  groupId: string;
  requestBody: CreateChatSchema;
}, TContext>({ mutationFn: ({ groupId, requestBody }) => ChatService.postApiChatsByGroupId({ groupId, requestBody }) as unknown as Promise<TData>, ...options });
export const useRoleGroupServicePostApiRolesGroup = <TData = Common.RoleGroupServicePostApiRolesGroupMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: CreateRoleGroupSchema;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: CreateRoleGroupSchema;
}, TContext>({ mutationFn: ({ requestBody }) => RoleGroupService.postApiRolesGroup({ requestBody }) as unknown as Promise<TData>, ...options });
export const useMessagesServicePostApiMessages = <TData = Common.MessagesServicePostApiMessagesMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: CreateMessageSchema;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: CreateMessageSchema;
}, TContext>({ mutationFn: ({ requestBody }) => MessagesService.postApiMessages({ requestBody }) as unknown as Promise<TData>, ...options });
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
export const useGroupServicePatchApiGroupsByGroupId = <TData = Common.GroupServicePatchApiGroupsByGroupIdMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  groupId: string;
  requestBody: UpdateGroupSchema;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  groupId: string;
  requestBody: UpdateGroupSchema;
}, TContext>({ mutationFn: ({ groupId, requestBody }) => GroupService.patchApiGroupsByGroupId({ groupId, requestBody }) as unknown as Promise<TData>, ...options });
export const useChatServicePatchApiChatsByChatUuid = <TData = Common.ChatServicePatchApiChatsByChatUuidMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  chatUuid: string;
  requestBody: UpdateChatSchema;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  chatUuid: string;
  requestBody: UpdateChatSchema;
}, TContext>({ mutationFn: ({ chatUuid, requestBody }) => ChatService.patchApiChatsByChatUuid({ chatUuid, requestBody }) as unknown as Promise<TData>, ...options });
export const useRoleGroupServicePatchApiRolesGroupByRoleGroupId = <TData = Common.RoleGroupServicePatchApiRolesGroupByRoleGroupIdMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: UpdateRoleGroupSchema;
  roleGroupId: number;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: UpdateRoleGroupSchema;
  roleGroupId: number;
}, TContext>({ mutationFn: ({ requestBody, roleGroupId }) => RoleGroupService.patchApiRolesGroupByRoleGroupId({ requestBody, roleGroupId }) as unknown as Promise<TData>, ...options });
export const useMessagesServicePatchApiMessagesByMessageId = <TData = Common.MessagesServicePatchApiMessagesByMessageIdMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  messageId: number;
  requestBody: UpdateMessageSchema;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  messageId: number;
  requestBody: UpdateMessageSchema;
}, TContext>({ mutationFn: ({ messageId, requestBody }) => MessagesService.patchApiMessagesByMessageId({ messageId, requestBody }) as unknown as Promise<TData>, ...options });
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
export const useChatServiceDeleteApiChatsByChatUuid = <TData = Common.ChatServiceDeleteApiChatsByChatUuidMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  chatUuid: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  chatUuid: string;
}, TContext>({ mutationFn: ({ chatUuid }) => ChatService.deleteApiChatsByChatUuid({ chatUuid }) as unknown as Promise<TData>, ...options });
export const useRoleGroupServiceDeleteApiRolesGroupByRoleGroupId = <TData = Common.RoleGroupServiceDeleteApiRolesGroupByRoleGroupIdMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  roleGroupId: number;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  roleGroupId: number;
}, TContext>({ mutationFn: ({ roleGroupId }) => RoleGroupService.deleteApiRolesGroupByRoleGroupId({ roleGroupId }) as unknown as Promise<TData>, ...options });
export const useMessagesServiceDeleteApiMessagesByMessageId = <TData = Common.MessagesServiceDeleteApiMessagesByMessageIdMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  messageId: number;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  messageId: number;
}, TContext>({ mutationFn: ({ messageId }) => MessagesService.deleteApiMessagesByMessageId({ messageId }) as unknown as Promise<TData>, ...options });
