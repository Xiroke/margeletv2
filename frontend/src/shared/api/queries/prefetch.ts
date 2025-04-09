// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { type QueryClient } from "@tanstack/react-query";
import { ChatService, DefaultService, GroupService, PersonalChatService, RoleGroupService, UsersService } from "../requests/services.gen";
import * as Common from "./common";
export const prefetchUseUsersServiceGetApiUsersAvatarByGroupUuid = (queryClient: QueryClient, { groupUuid }: {
  groupUuid: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseUsersServiceGetApiUsersAvatarByGroupUuidKeyFn({ groupUuid }), queryFn: () => UsersService.getApiUsersAvatarByGroupUuid({ groupUuid }) });
export const prefetchUseUsersServiceGetApiUsersMe = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseUsersServiceGetApiUsersMeKeyFn(), queryFn: () => UsersService.getApiUsersMe() });
export const prefetchUseUsersServiceGetApiUsersById = (queryClient: QueryClient, { id }: {
  id: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseUsersServiceGetApiUsersByIdKeyFn({ id }), queryFn: () => UsersService.getApiUsersById({ id }) });
export const prefetchUseDefaultServiceGetApiAuthenticatedRoute = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseDefaultServiceGetApiAuthenticatedRouteKeyFn(), queryFn: () => DefaultService.getApiAuthenticatedRoute() });
export const prefetchUseDefaultServiceGetApi = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseDefaultServiceGetApiKeyFn(), queryFn: () => DefaultService.getApi() });
export const prefetchUseGroupServiceGetApiGroupsAvatarByGroupUuid = (queryClient: QueryClient, { groupUuid }: {
  groupUuid: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseGroupServiceGetApiGroupsAvatarByGroupUuidKeyFn({ groupUuid }), queryFn: () => GroupService.getApiGroupsAvatarByGroupUuid({ groupUuid }) });
export const prefetchUseGroupServiceGetApiGroupsPanoramaByGroupUuid = (queryClient: QueryClient, { groupUuid }: {
  groupUuid: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseGroupServiceGetApiGroupsPanoramaByGroupUuidKeyFn({ groupUuid }), queryFn: () => GroupService.getApiGroupsPanoramaByGroupUuid({ groupUuid }) });
export const prefetchUseGroupServiceGetApiGroupsByGroupUuid = (queryClient: QueryClient, { groupUuid }: {
  groupUuid: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseGroupServiceGetApiGroupsByGroupUuidKeyFn({ groupUuid }), queryFn: () => GroupService.getApiGroupsByGroupUuid({ groupUuid }) });
export const prefetchUsePersonalChatServiceGetApiPersonalChatsByPersonalChatUuid = (queryClient: QueryClient, { personalChatUuid }: {
  personalChatUuid: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UsePersonalChatServiceGetApiPersonalChatsByPersonalChatUuidKeyFn({ personalChatUuid }), queryFn: () => PersonalChatService.getApiPersonalChatsByPersonalChatUuid({ personalChatUuid }) });
export const prefetchUseChatServiceGetApiChatsByChatUuid = (queryClient: QueryClient, { chatUuid }: {
  chatUuid: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseChatServiceGetApiChatsByChatUuidKeyFn({ chatUuid }), queryFn: () => ChatService.getApiChatsByChatUuid({ chatUuid }) });
export const prefetchUseRoleGroupServiceGetApiRolesGroupByRoleGroupId = (queryClient: QueryClient, { roleGroupId }: {
  roleGroupId: number;
}) => queryClient.prefetchQuery({ queryKey: Common.UseRoleGroupServiceGetApiRolesGroupByRoleGroupIdKeyFn({ roleGroupId }), queryFn: () => RoleGroupService.getApiRolesGroupByRoleGroupId({ roleGroupId }) });
