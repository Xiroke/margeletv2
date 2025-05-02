import {
  useGroupServiceGetApiGroupsByGroupUuid,
  useGroupServiceGetApiGroupsAvatarByGroupUuid,
  useGroupServiceGetApiGroupsPanoramaByGroupUuid,
  useGroupServiceDeleteApiGroupsByGroupUuid,
  useGroupServicePatchApiGroupsByGroupUuid,
  useGroupServicePostApiGroups,
  useGroupServicePostApiGroupsAvatarByGroupUuid,
  useGroupServicePostApiGroupsPanoramaByGroupUuid,
  useGroupServiceGetApiGroupsInviteByGroupId,
  useGroupServicePostApiGroupsInvite,
  useGroupServiceGetApiGroupsUserGroupsMe,
  useGroupServiceGetApiGroupsUserGroupsByUserId,
  useGroupServiceGetApiGroupsUserGroupsMeKey,
} from "@/shared/api/queries";

export const apiGroup = {
  get: useGroupServiceGetApiGroupsByGroupUuid, // GET /groups/{group_uuid}
  delete: useGroupServiceDeleteApiGroupsByGroupUuid, // DELETE /groups/{group_uuid}
  patch: useGroupServicePatchApiGroupsByGroupUuid, // PATCH /groups/{group_uuid}
  post: useGroupServicePostApiGroups, // POST /groups/{group_uuid}
  loadAvatar: useGroupServiceGetApiGroupsAvatarByGroupUuid, // GET /groups/avatar/{group_uuid}
  loadPanorama: useGroupServiceGetApiGroupsPanoramaByGroupUuid, // GET /groups/panorama/{group_uuid}
  uploadAvatar: useGroupServicePostApiGroupsAvatarByGroupUuid, // POST /groups/avatar/{group_uuid}
  uploadPanorama: useGroupServicePostApiGroupsPanoramaByGroupUuid, // POST /groups/panorama/{group_uuid}
  getInviteToken: useGroupServiceGetApiGroupsInviteByGroupId, // GET /groups/invite/{group_uuid}
  postInviteToken: useGroupServicePostApiGroupsInvite, // POST /groups/invite/{group_uuid}
  getMyGroups: useGroupServiceGetApiGroupsUserGroupsMe, // GET /groups/user_groups/me
  getGroupsByUserId: useGroupServiceGetApiGroupsUserGroupsByUserId, // GET /groups/user_groups/{user_id}
  getMyGroupsKey: useGroupServiceGetApiGroupsUserGroupsMeKey,
};

export type {
  ReadGroupSchema,
  CreateGroupSchema,
  UpdateGroupSchema,
} from "@/shared/api/requests";
