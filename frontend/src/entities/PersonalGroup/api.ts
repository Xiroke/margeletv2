import {
  createApiPersonalGroupsOtherUserIdPostMutation,
  deleteApiPersonalGroupsIdDeleteMutation,
  getMyGroupsApiPersonalGroupsMeGetOptions,
  updateApiPersonalGroupsIdPatchMutation,
} from '@/shared/api/generated/@tanstack/react-query.gen';

export const personalGroupQueryProps = {
  create: createApiPersonalGroupsOtherUserIdPostMutation,
  delete: deleteApiPersonalGroupsIdDeleteMutation,
  getMyPersonalGroups: getMyGroupsApiPersonalGroupsMeGetOptions,
  update: updateApiPersonalGroupsIdPatchMutation,
};
