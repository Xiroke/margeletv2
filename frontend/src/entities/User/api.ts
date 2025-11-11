import { getMeApiUsersMeGetOptions, getUsernamesByIdApiUsersUsernamesPostMutation, searchUsersApiUsersSearchAccountNameGetOptions } from '@/shared/api/generated/@tanstack/react-query.gen'

export const userQueryProps = {
  getMeOpt: getMeApiUsersMeGetOptions,
  getUserByAccountNameOpt: searchUsersApiUsersSearchAccountNameGetOptions,
  getUsernamesByIdMut: getUsernamesByIdApiUsersUsernamesPostMutation,
}
