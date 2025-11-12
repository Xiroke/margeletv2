import {
  createApiSimpleGroupsPostMutation,
  searchGroupsApiSimpleGroupsSearchGetOptions,
  updateApiSimpleGroupsIdPatchMutation,
} from '@/shared/api/generated/@tanstack/react-query.gen'

export const simpleGroupQueryProps = {
  create: createApiSimpleGroupsPostMutation,
  search: searchGroupsApiSimpleGroupsSearchGetOptions,
  update: updateApiSimpleGroupsIdPatchMutation,
}
