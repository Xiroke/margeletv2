import { deleteGroupApiGroupsGroupIdDeleteMutation, getGroupApiGroupsGroupIdGetOptions, getMyGroupApiGroupsMeGroupsGetOptions, getMyGroupsWithLastMessageApiGroupsMeWithLastMessageGetOptions, leaveGroupApiGroupsLeaveGroupIdPostMutation } from '@/shared/api/generated/@tanstack/react-query.gen'

export const autoGroupQueryProps = {
  delete: deleteGroupApiGroupsGroupIdDeleteMutation,
  get: getGroupApiGroupsGroupIdGetOptions,
  getMyGroups: getMyGroupApiGroupsMeGroupsGetOptions,
  getMyGroupsWithLastMessage: getMyGroupsWithLastMessageApiGroupsMeWithLastMessageGetOptions,
  leave: leaveGroupApiGroupsLeaveGroupIdPostMutation,
}
