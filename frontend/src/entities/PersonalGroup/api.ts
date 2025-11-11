import {
  createApiPersonalGroupsOtherUserIdPostMutation,
  deleteApiPersonalGroupsIdDeleteMutation,
  getMyPersonalGroupsApiPersonalGroupsMeGroupsGetOptions,
  updateApiPersonalGroupsIdPatchMutation,
} from '@/shared/api/generated/@tanstack/react-query.gen'

export const personalGroupQueryProps = {
  create: createApiPersonalGroupsOtherUserIdPostMutation,
  delete: deleteApiPersonalGroupsIdDeleteMutation,
  getMyPersonalGroups: getMyPersonalGroupsApiPersonalGroupsMeGroupsGetOptions,
  update: updateApiPersonalGroupsIdPatchMutation,
}
