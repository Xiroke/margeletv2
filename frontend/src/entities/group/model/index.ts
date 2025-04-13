import {
  useGroupServiceGetApiGroupsByGroupUuid,
  useGroupServiceGetApiGroupsAvatarByGroupUuid,
  useGroupServiceGetApiGroupsPanoramaByGroupUuid,
  useGroupServiceDeleteApiGroupsByGroupUuid,
  useGroupServicePatchApiGroupsByGroupUuid,
  useGroupServicePostApiGroups,
  useGroupServicePostApiGroupsAvatarByGroupUuid,
  useGroupServicePostApiGroupsPanoramaByGroupUuid,
  useGroupServiceGetApiGroupsInviteByGroupUuid,
  useGroupServicePostApiGroupsInviteByGroupId,
  useGroupServiceGetApiGroupsUserGroupsMe,
  useGroupServiceGetApiGroupsUserGroupsByUserId,
} from '@/shared/api/queries';

export const apiGroup = {
  get: useGroupServiceGetApiGroupsByGroupUuid, // GET /groups/{group_uuid}
  delete: useGroupServiceDeleteApiGroupsByGroupUuid, // DELETE /groups/{group_uuid}
  patch: useGroupServicePatchApiGroupsByGroupUuid, // PATCH /groups/{group_uuid}
  post: useGroupServicePostApiGroups, // POST /groups/{group_uuid}
  loadAvatar: useGroupServiceGetApiGroupsAvatarByGroupUuid, // GET /groups/avatar/{group_uuid}
  loadPanorama: useGroupServiceGetApiGroupsPanoramaByGroupUuid, // GET /groups/panorama/{group_uuid}
  uploadAvatar: useGroupServicePostApiGroupsAvatarByGroupUuid, // POST /groups/avatar/{group_uuid}
  uploadPanorama: useGroupServicePostApiGroupsPanoramaByGroupUuid, // POST /groups/panorama/{group_uuid}
  getInviteToken: useGroupServiceGetApiGroupsInviteByGroupUuid, // GET /groups/invite/{group_uuid}
  postInviteToken: useGroupServicePostApiGroupsInviteByGroupId, // POST /groups/invite/{group_uuid}
  getMyGroups: useGroupServiceGetApiGroupsUserGroupsMe, // GET /groups/user_groups/me
  getGroupsByUserId: useGroupServiceGetApiGroupsUserGroupsByUserId, // GET /groups/user_groups/{user_id}
};

export type { ReadGroupSchema, CreateGroupSchema, UpdateGroupSchema } from '@/shared/api/requests';
