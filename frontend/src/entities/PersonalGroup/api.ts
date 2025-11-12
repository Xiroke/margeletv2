import {
  createApiPersonalGroupsOtherUserIdPostMutation,
  updateApiPersonalGroupsIdPatchMutation,
} from '@/shared/api/generated/@tanstack/react-query.gen'

export const personalGroupQueryProps = {
  create: createApiPersonalGroupsOtherUserIdPostMutation,
  update: updateApiPersonalGroupsIdPatchMutation,
}
