import {
  createApiPersonalGroupsOtherUserIdPostMutation,
  getMyGroupsApiPersonalGroupsMeGetOptions,
  updateApiPersonalGroupsIdPatchMutation,
  deleteApiPersonalGroupsIdDeleteMutation,
} from '@/shared/api/generated/@tanstack/react-query.gen';

export const personalGroupQueryProps = {
  create: createApiPersonalGroupsOtherUserIdPostMutation,
  getMyPersonalGroups: getMyGroupsApiPersonalGroupsMeGetOptions,
  update: updateApiPersonalGroupsIdPatchMutation,
  delete: deleteApiPersonalGroupsIdDeleteMutation,
};
