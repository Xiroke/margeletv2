import {
  createApiPersonalGroupsOtherUserIdPostMutation,
  getMyGroupsApiPersonalGroupsMeGetOptions,
  getApiPersonalGroupsIdGetOptions,
  updateApiPersonalGroupsIdPatchMutation,
  deleteApiPersonalGroupsIdDeleteMutation,
} from '@/shared/api/generated/@tanstack/react-query.gen';

export const personalGroupQueryProps = {
  create: createApiPersonalGroupsOtherUserIdPostMutation,
  getMyPersonalGroups: getMyGroupsApiPersonalGroupsMeGetOptions,
  get: getApiPersonalGroupsIdGetOptions,
  update: updateApiPersonalGroupsIdPatchMutation,
  delete: deleteApiPersonalGroupsIdDeleteMutation,
};
