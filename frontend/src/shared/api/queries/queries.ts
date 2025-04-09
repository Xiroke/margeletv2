// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { AuthService, ChatService, DefaultService, GroupService, PersonalChatService, RoleGroupService, UsersService } from "../requests/services.gen";
import { Body_auth_jwt_login_api_auth_jwt_login_post, Body_reset_forgot_password_api_auth_forgot_password_post, Body_reset_reset_password_api_auth_reset_password_post, Body_upload_avatar_api_groups_avatar__group_uuid__post, Body_upload_avatar_api_users_avatar__group_uuid__post, Body_upload_panorama_api_groups_panorama__group_uuid__post, Body_verify_request_token_api_auth_request_verify_token_post, Body_verify_verify_api_auth_verify_post, CreateChatSchema, CreateGroupSchema, CreatePersonalChatSchema, CreateRoleGroupSchema, UpdateChatSchema, UpdateGroupSchema, UpdatePersonalChatSchema, UpdateRoleGroupSchema, UserCreate, UserUpdate } from "../requests/types.gen";
import * as Common from "./common";
export const useUsersServiceGetApiUsersAvatarByGroupUuid = <TData = Common.UsersServiceGetApiUsersAvatarByGroupUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ groupUuid }: {
  groupUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseUsersServiceGetApiUsersAvatarByGroupUuidKeyFn({ groupUuid }, queryKey), queryFn: () => UsersService.getApiUsersAvatarByGroupUuid({ groupUuid }) as TData, ...options });
export const useUsersServiceGetApiUsersMe = <TData = Common.UsersServiceGetApiUsersMeDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseUsersServiceGetApiUsersMeKeyFn(queryKey), queryFn: () => UsersService.getApiUsersMe() as TData, ...options });
export const useUsersServiceGetApiUsersById = <TData = Common.UsersServiceGetApiUsersByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
  id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseUsersServiceGetApiUsersByIdKeyFn({ id }, queryKey), queryFn: () => UsersService.getApiUsersById({ id }) as TData, ...options });
export const useDefaultServiceGetApiAuthenticatedRoute = <TData = Common.DefaultServiceGetApiAuthenticatedRouteDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseDefaultServiceGetApiAuthenticatedRouteKeyFn(queryKey), queryFn: () => DefaultService.getApiAuthenticatedRoute() as TData, ...options });
export const useDefaultServiceGetApi = <TData = Common.DefaultServiceGetApiDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseDefaultServiceGetApiKeyFn(queryKey), queryFn: () => DefaultService.getApi() as TData, ...options });
export const useGroupServiceGetApiGroupsAvatarByGroupUuid = <TData = Common.GroupServiceGetApiGroupsAvatarByGroupUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ groupUuid }: {
  groupUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseGroupServiceGetApiGroupsAvatarByGroupUuidKeyFn({ groupUuid }, queryKey), queryFn: () => GroupService.getApiGroupsAvatarByGroupUuid({ groupUuid }) as TData, ...options });
export const useGroupServiceGetApiGroupsPanoramaByGroupUuid = <TData = Common.GroupServiceGetApiGroupsPanoramaByGroupUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ groupUuid }: {
  groupUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseGroupServiceGetApiGroupsPanoramaByGroupUuidKeyFn({ groupUuid }, queryKey), queryFn: () => GroupService.getApiGroupsPanoramaByGroupUuid({ groupUuid }) as TData, ...options });
export const useGroupServiceGetApiGroupsByGroupUuid = <TData = Common.GroupServiceGetApiGroupsByGroupUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ groupUuid }: {
  groupUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseGroupServiceGetApiGroupsByGroupUuidKeyFn({ groupUuid }, queryKey), queryFn: () => GroupService.getApiGroupsByGroupUuid({ groupUuid }) as TData, ...options });
export const usePersonalChatServiceGetApiPersonalChatsByPersonalChatUuid = <TData = Common.PersonalChatServiceGetApiPersonalChatsByPersonalChatUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ personalChatUuid }: {
  personalChatUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePersonalChatServiceGetApiPersonalChatsByPersonalChatUuidKeyFn({ personalChatUuid }, queryKey), queryFn: () => PersonalChatService.getApiPersonalChatsByPersonalChatUuid({ personalChatUuid }) as TData, ...options });
export const useChatServiceGetApiChatsByChatUuid = <TData = Common.ChatServiceGetApiChatsByChatUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ chatUuid }: {
  chatUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseChatServiceGetApiChatsByChatUuidKeyFn({ chatUuid }, queryKey), queryFn: () => ChatService.getApiChatsByChatUuid({ chatUuid }) as TData, ...options });
export const useRoleGroupServiceGetApiRolesGroupByRoleGroupId = <TData = Common.RoleGroupServiceGetApiRolesGroupByRoleGroupIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ roleGroupId }: {
  roleGroupId: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseRoleGroupServiceGetApiRolesGroupByRoleGroupIdKeyFn({ roleGroupId }, queryKey), queryFn: () => RoleGroupService.getApiRolesGroupByRoleGroupId({ roleGroupId }) as TData, ...options });
export const useUsersServicePostApiUsersAvatarByGroupUuid = <TData = Common.UsersServicePostApiUsersAvatarByGroupUuidMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  formData: Body_upload_avatar_api_users_avatar__group_uuid__post;
  groupUuid: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  formData: Body_upload_avatar_api_users_avatar__group_uuid__post;
  groupUuid: string;
}, TContext>({ mutationFn: ({ formData, groupUuid }) => UsersService.postApiUsersAvatarByGroupUuid({ formData, groupUuid }) as unknown as Promise<TData>, ...options });
export const useAuthServicePostApiAuthJwtLogin = <TData = Common.AuthServicePostApiAuthJwtLoginMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  formData: Body_auth_jwt_login_api_auth_jwt_login_post;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  formData: Body_auth_jwt_login_api_auth_jwt_login_post;
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
export const useGroupServicePostApiGroupsAvatarByGroupUuid = <TData = Common.GroupServicePostApiGroupsAvatarByGroupUuidMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  formData: Body_upload_avatar_api_groups_avatar__group_uuid__post;
  groupUuid: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  formData: Body_upload_avatar_api_groups_avatar__group_uuid__post;
  groupUuid: string;
}, TContext>({ mutationFn: ({ formData, groupUuid }) => GroupService.postApiGroupsAvatarByGroupUuid({ formData, groupUuid }) as unknown as Promise<TData>, ...options });
export const useGroupServicePostApiGroupsPanoramaByGroupUuid = <TData = Common.GroupServicePostApiGroupsPanoramaByGroupUuidMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  formData: Body_upload_panorama_api_groups_panorama__group_uuid__post;
  groupUuid: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  formData: Body_upload_panorama_api_groups_panorama__group_uuid__post;
  groupUuid: string;
}, TContext>({ mutationFn: ({ formData, groupUuid }) => GroupService.postApiGroupsPanoramaByGroupUuid({ formData, groupUuid }) as unknown as Promise<TData>, ...options });
export const useGroupServicePostApiGroups = <TData = Common.GroupServicePostApiGroupsMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: CreateGroupSchema;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: CreateGroupSchema;
}, TContext>({ mutationFn: ({ requestBody }) => GroupService.postApiGroups({ requestBody }) as unknown as Promise<TData>, ...options });
export const usePersonalChatServicePostApiPersonalChats = <TData = Common.PersonalChatServicePostApiPersonalChatsMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: CreatePersonalChatSchema;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: CreatePersonalChatSchema;
}, TContext>({ mutationFn: ({ requestBody }) => PersonalChatService.postApiPersonalChats({ requestBody }) as unknown as Promise<TData>, ...options });
export const useChatServicePostApiChats = <TData = Common.ChatServicePostApiChatsMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: CreateChatSchema;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: CreateChatSchema;
}, TContext>({ mutationFn: ({ requestBody }) => ChatService.postApiChats({ requestBody }) as unknown as Promise<TData>, ...options });
export const useRoleGroupServicePostApiRolesGroup = <TData = Common.RoleGroupServicePostApiRolesGroupMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: CreateRoleGroupSchema;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: CreateRoleGroupSchema;
}, TContext>({ mutationFn: ({ requestBody }) => RoleGroupService.postApiRolesGroup({ requestBody }) as unknown as Promise<TData>, ...options });
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
export const useGroupServicePatchApiGroupsByGroupUuid = <TData = Common.GroupServicePatchApiGroupsByGroupUuidMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  groupUuid: string;
  requestBody: UpdateGroupSchema;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  groupUuid: string;
  requestBody: UpdateGroupSchema;
}, TContext>({ mutationFn: ({ groupUuid, requestBody }) => GroupService.patchApiGroupsByGroupUuid({ groupUuid, requestBody }) as unknown as Promise<TData>, ...options });
export const usePersonalChatServicePatchApiPersonalChatsByPersonalChatUuid = <TData = Common.PersonalChatServicePatchApiPersonalChatsByPersonalChatUuidMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  personalChatUuid: string;
  requestBody: UpdatePersonalChatSchema;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  personalChatUuid: string;
  requestBody: UpdatePersonalChatSchema;
}, TContext>({ mutationFn: ({ personalChatUuid, requestBody }) => PersonalChatService.patchApiPersonalChatsByPersonalChatUuid({ personalChatUuid, requestBody }) as unknown as Promise<TData>, ...options });
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
export const useUsersServiceDeleteApiUsersById = <TData = Common.UsersServiceDeleteApiUsersByIdMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  id: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  id: string;
}, TContext>({ mutationFn: ({ id }) => UsersService.deleteApiUsersById({ id }) as unknown as Promise<TData>, ...options });
export const useGroupServiceDeleteApiGroupsByGroupUuid = <TData = Common.GroupServiceDeleteApiGroupsByGroupUuidMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  groupUuid: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  groupUuid: string;
}, TContext>({ mutationFn: ({ groupUuid }) => GroupService.deleteApiGroupsByGroupUuid({ groupUuid }) as unknown as Promise<TData>, ...options });
export const usePersonalChatServiceDeleteApiPersonalChatsByPersonalChatUuid = <TData = Common.PersonalChatServiceDeleteApiPersonalChatsByPersonalChatUuidMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  personalChatUuid: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  personalChatUuid: string;
}, TContext>({ mutationFn: ({ personalChatUuid }) => PersonalChatService.deleteApiPersonalChatsByPersonalChatUuid({ personalChatUuid }) as unknown as Promise<TData>, ...options });
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
