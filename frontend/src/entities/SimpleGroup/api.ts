import {
  createApiSimpleGroupsPostMutation,
  deleteApiSimpleGroupsIdDeleteMutation,
  getApiSimpleGroupsIdGetOptions,
  getMySimpleGroupsApiSimpleGroupsMeGetOptions,
  updateApiSimpleGroupsIdPatchMutation,
} from '@/shared/api/generated/@tanstack/react-query.gen'

export const simpleGroupQueryProps = {
  create: createApiSimpleGroupsPostMutation,
  delete: deleteApiSimpleGroupsIdDeleteMutation,
  get: getApiSimpleGroupsIdGetOptions,
  getMySimpleGroups: getMySimpleGroupsApiSimpleGroupsMeGetOptions,
  update: updateApiSimpleGroupsIdPatchMutation,
}
