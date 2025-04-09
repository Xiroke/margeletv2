import {
  useGroupServiceGetApiGroupsByGroupUuid,
  useGroupServiceGetApiGroupsAvatarByGroupUuid,
  useGroupServiceGetApiGroupsPanoramaByGroupUuid,
  useGroupServiceDeleteApiGroupsByGroupUuid,
  useGroupServicePatchApiGroupsByGroupUuid,
  useGroupServicePostApiGroups,
  useGroupServicePostApiGroupsAvatarByGroupUuid,
  useGroupServicePostApiGroupsPanoramaByGroupUuid,
} from '@/shared/api/queries';

export const apiGroup = {
  get: useGroupServiceGetApiGroupsByGroupUuid,
  delete: useGroupServiceDeleteApiGroupsByGroupUuid,
  patch: useGroupServicePatchApiGroupsByGroupUuid,
  post: useGroupServicePostApiGroups,
  getAvatar: useGroupServiceGetApiGroupsAvatarByGroupUuid,
  getPanorama: useGroupServiceGetApiGroupsPanoramaByGroupUuid,
  postAvatar: useGroupServicePostApiGroupsAvatarByGroupUuid,
  postPanorama: useGroupServicePostApiGroupsPanoramaByGroupUuid,
};

export type { ReadGroupSchema, CreateGroupSchema, UpdateGroupSchema } from '@/shared/api/requests';
