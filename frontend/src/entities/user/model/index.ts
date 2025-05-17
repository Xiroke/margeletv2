import {
  useUsersServiceGetApiUsersAvatarByGroupId,
  useUsersServiceGetApiUsersById,
  useUsersServiceGetApiUsersMe,
} from "@/shared/api/queries";

export const useApiUser = {
  getAvatar: useUsersServiceGetApiUsersAvatarByGroupId,
  getUserById: useUsersServiceGetApiUsersById,
  get: useUsersServiceGetApiUsersMe,
};

export type {} from "@/shared/api/requests";
