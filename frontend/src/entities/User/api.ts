import { generateWsTokenApiUsersWsTokenPostMutation, getMeApiUsersMeGetOptions, getMeApiUsersMeGetQueryKey, getUsernamesByIdApiUsersUsernamesPostMutation, searchUsersApiUsersSearchGetOptions, updateMeApiUsersMePatchMutation } from '@/shared/api/generated/@tanstack/react-query.gen'

export const userQueryProps = {
  getMeKey: getMeApiUsersMeGetQueryKey,
  getMeOpt: getMeApiUsersMeGetOptions,
  getUserByAccountNameOpt: searchUsersApiUsersSearchGetOptions,
  getUsernamesByIdMut: getUsernamesByIdApiUsersUsernamesPostMutation,
  update: updateMeApiUsersMePatchMutation,
  wsTokenMut: generateWsTokenApiUsersWsTokenPostMutation,
}
