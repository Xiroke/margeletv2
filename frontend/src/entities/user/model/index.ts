import {
  useUsersServiceGetApiUsersAvatarByGroupUuid,
  useUsersServiceGetApiUsersById,
  useUsersServiceGetApiUsersMe,
} from '@/shared/api/queries';

export const apiUser = {
  getAvatar: useUsersServiceGetApiUsersAvatarByGroupUuid,
  getUserById: useUsersServiceGetApiUsersById,
  get: useUsersServiceGetApiUsersMe,
};

export type {} from '@/shared/api/requests';
