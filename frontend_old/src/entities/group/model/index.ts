import {
  useGroupServiceGetApiGroupsByGroupId,
  useGroupServicePostApiGroupsInvite,
  useGroupServiceDeleteApiGroupsByGroupId,
  useGroupServicePostApiGroups,
  useGroupServicePostApiGroupsAvatarByGroupId,
  useGroupServicePostApiGroupsPanoramaByGroupId,
  useGroupServiceGetApiGroupsInviteByGroupId,
  useGroupServiceGetApiGroupsUserGroupsMe,
  useGroupServiceGetApiGroupsUserGroupsMeKey,
  useGroupServicePostApiGroupsLeaveByGroupId,
  useGroupServicePatchApiGroupsTitleByGroupId,
} from "@/shared/api/queries";
import settings from "@/shared/config";

export const apiGroup = {
  get: useGroupServiceGetApiGroupsByGroupId,
  delete: useGroupServiceDeleteApiGroupsByGroupId,
  // patch: useGroupServicePatchApiGroupsByGroupId,
  post: useGroupServicePostApiGroups,
  updateTitle: useGroupServicePatchApiGroupsTitleByGroupId,
  uploadAvatar: useGroupServicePostApiGroupsAvatarByGroupId,
  uploadPanorama: useGroupServicePostApiGroupsPanoramaByGroupId,
  getInviteToken: useGroupServiceGetApiGroupsInviteByGroupId,
  joinGroup: useGroupServicePostApiGroupsInvite,
  leaveGroup: useGroupServicePostApiGroupsLeaveByGroupId,
  getMyGroups: useGroupServiceGetApiGroupsUserGroupsMe,
  getMyGroupsKey: useGroupServiceGetApiGroupsUserGroupsMeKey,
  loadPanorama: (groupId: string) =>
    fetch(`${settings.NEXT_PUBLIC_API_URL}/api/groups/panorama/${groupId}`, {
      credentials: "include",
    }).then((res) => {
      if (!res.ok) throw new Error(res.statusText);
      return res.blob();
    }),
  loadAvatar: (groupId: string) =>
    fetch(`${settings.NEXT_PUBLIC_API_URL}/api/groups/avatar/${groupId}`, {
      credentials: "include",
    }).then((res) => {
      if (!res.ok) throw new Error(res.statusText);
      return res.blob();
    }),
};

export type {
  ReadGroupSchema,
  CreateGroupSchema,
  UpdateGroupSchema,
} from "@/shared/api/requests";
