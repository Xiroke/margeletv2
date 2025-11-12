import { getMeApiUsersMeGetOptions, getUsernamesByIdApiUsersUsernamesPostMutation, searchUsersApiUsersSearchGetOptions } from '@/shared/api/generated/@tanstack/react-query.gen'

export const userQueryProps = {
  getMeOpt: getMeApiUsersMeGetOptions,
  getUserByAccountNameOpt: searchUsersApiUsersSearchGetOptions,
  getUsernamesByIdMut: getUsernamesByIdApiUsersUsernamesPostMutation,
}
