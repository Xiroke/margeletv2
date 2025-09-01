import {
  createApiSimpleGroupsPostMutation,
  getMySimpleGroupsApiSimpleGroupsMeGetOptions,
  getApiSimpleGroupsIdGetOptions,
  updateApiSimpleGroupsIdPatchMutation,
  deleteApiSimpleGroupsIdDeleteMutation,
} from '@/shared/api/generated/@tanstack/react-query.gen';

export const simpleGroupQueryProps = {
  create: createApiSimpleGroupsPostMutation,
  getMySimpleGroups: getMySimpleGroupsApiSimpleGroupsMeGetOptions,
  get: getApiSimpleGroupsIdGetOptions,
  update: updateApiSimpleGroupsIdPatchMutation,
  delete: deleteApiSimpleGroupsIdDeleteMutation,
};
