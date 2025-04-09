// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { UseQueryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ChatService, DefaultService, GroupService, PersonalChatService, RoleGroupService, UsersService } from "../requests/services.gen";
import * as Common from "./common";
export const useUsersServiceGetApiUsersAvatarByGroupUuidSuspense = <TData = Common.UsersServiceGetApiUsersAvatarByGroupUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ groupUuid }: {
  groupUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseUsersServiceGetApiUsersAvatarByGroupUuidKeyFn({ groupUuid }, queryKey), queryFn: () => UsersService.getApiUsersAvatarByGroupUuid({ groupUuid }) as TData, ...options });
export const useUsersServiceGetApiUsersMeSuspense = <TData = Common.UsersServiceGetApiUsersMeDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseUsersServiceGetApiUsersMeKeyFn(queryKey), queryFn: () => UsersService.getApiUsersMe() as TData, ...options });
export const useUsersServiceGetApiUsersByIdSuspense = <TData = Common.UsersServiceGetApiUsersByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
  id: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseUsersServiceGetApiUsersByIdKeyFn({ id }, queryKey), queryFn: () => UsersService.getApiUsersById({ id }) as TData, ...options });
export const useDefaultServiceGetApiAuthenticatedRouteSuspense = <TData = Common.DefaultServiceGetApiAuthenticatedRouteDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseDefaultServiceGetApiAuthenticatedRouteKeyFn(queryKey), queryFn: () => DefaultService.getApiAuthenticatedRoute() as TData, ...options });
export const useDefaultServiceGetApiSuspense = <TData = Common.DefaultServiceGetApiDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseDefaultServiceGetApiKeyFn(queryKey), queryFn: () => DefaultService.getApi() as TData, ...options });
export const useGroupServiceGetApiGroupsAvatarByGroupUuidSuspense = <TData = Common.GroupServiceGetApiGroupsAvatarByGroupUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ groupUuid }: {
  groupUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseGroupServiceGetApiGroupsAvatarByGroupUuidKeyFn({ groupUuid }, queryKey), queryFn: () => GroupService.getApiGroupsAvatarByGroupUuid({ groupUuid }) as TData, ...options });
export const useGroupServiceGetApiGroupsPanoramaByGroupUuidSuspense = <TData = Common.GroupServiceGetApiGroupsPanoramaByGroupUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ groupUuid }: {
  groupUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseGroupServiceGetApiGroupsPanoramaByGroupUuidKeyFn({ groupUuid }, queryKey), queryFn: () => GroupService.getApiGroupsPanoramaByGroupUuid({ groupUuid }) as TData, ...options });
export const useGroupServiceGetApiGroupsByGroupUuidSuspense = <TData = Common.GroupServiceGetApiGroupsByGroupUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ groupUuid }: {
  groupUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseGroupServiceGetApiGroupsByGroupUuidKeyFn({ groupUuid }, queryKey), queryFn: () => GroupService.getApiGroupsByGroupUuid({ groupUuid }) as TData, ...options });
export const usePersonalChatServiceGetApiPersonalChatsByPersonalChatUuidSuspense = <TData = Common.PersonalChatServiceGetApiPersonalChatsByPersonalChatUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ personalChatUuid }: {
  personalChatUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePersonalChatServiceGetApiPersonalChatsByPersonalChatUuidKeyFn({ personalChatUuid }, queryKey), queryFn: () => PersonalChatService.getApiPersonalChatsByPersonalChatUuid({ personalChatUuid }) as TData, ...options });
export const useChatServiceGetApiChatsByChatUuidSuspense = <TData = Common.ChatServiceGetApiChatsByChatUuidDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ chatUuid }: {
  chatUuid: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseChatServiceGetApiChatsByChatUuidKeyFn({ chatUuid }, queryKey), queryFn: () => ChatService.getApiChatsByChatUuid({ chatUuid }) as TData, ...options });
export const useRoleGroupServiceGetApiRolesGroupByRoleGroupIdSuspense = <TData = Common.RoleGroupServiceGetApiRolesGroupByRoleGroupIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ roleGroupId }: {
  roleGroupId: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseRoleGroupServiceGetApiRolesGroupByRoleGroupIdKeyFn({ roleGroupId }, queryKey), queryFn: () => RoleGroupService.getApiRolesGroupByRoleGroupId({ roleGroupId }) as TData, ...options });
