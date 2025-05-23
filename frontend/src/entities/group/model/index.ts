import {
  useGroupServiceGetApiGroupsByGroupId,
  useGroupServiceGetApiGroupsAvatarByGroupId,
  useGroupServiceGetApiGroupsPanoramaByGroupId,
  useGroupServiceDeleteApiGroupsByGroupId,
  useGroupServicePatchApiGroupsByGroupId,
  useGroupServicePostApiGroups,
  useGroupServicePostApiGroupsAvatarByGroupId,
  useGroupServicePostApiGroupsPanoramaByGroupId,
  useGroupServiceGetApiGroupsInviteByGroupId,
  useGroupServiceGetApiGroupsUserGroupsMe,
  useGroupServiceGetApiGroupsUserGroupsByUserId,
  useGroupServiceGetApiGroupsUserGroupsMeKey,
} from "@/shared/api/queries";
import settings from "@/shared/config";

export const useApiGroup = {
  get: useGroupServiceGetApiGroupsByGroupId,
  delete: useGroupServiceDeleteApiGroupsByGroupId,
  patch: useGroupServicePatchApiGroupsByGroupId,
  post: useGroupServicePostApiGroups,
  loadAvatar: useGroupServiceGetApiGroupsAvatarByGroupId,
  uploadAvatar: useGroupServicePostApiGroupsAvatarByGroupId,
  uploadPanorama: useGroupServicePostApiGroupsPanoramaByGroupId,
  getInviteToken: useGroupServiceGetApiGroupsInviteByGroupId,
  getMyGroups: useGroupServiceGetApiGroupsUserGroupsMe,
  getGroupsByUserId: useGroupServiceGetApiGroupsUserGroupsByUserId,
  getMyGroupsKey: useGroupServiceGetApiGroupsUserGroupsMeKey,
  loadPanorama: (groupId: string) =>
    fetch(`${settings.NEXT_PUBLIC_API_URL}/api/groups/panorama/${groupId}`, {
      credentials: "include",
    }).then((res) => {
      if (!res.ok) throw new Error(res.statusText);
      return res.blob();
    }),
  avatar: (groupId: string) => `/api/groups/avatar/${groupId}`,
};

export type {
  ReadGroupSchema,
  CreateGroupSchema,
  UpdateGroupSchema,
} from "@/shared/api/requests";
