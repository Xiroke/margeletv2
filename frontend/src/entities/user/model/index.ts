import {
  useUsersServiceGetApiUsersAvatarMe,
  useUsersServiceGetApiUsersById,
  useUsersServiceGetApiUsersMe,
} from "@/shared/api/queries";

export const useApiUser = {
  getAvatar: useUsersServiceGetApiUsersAvatarMe,
  getUserById: useUsersServiceGetApiUsersById,
  get: useUsersServiceGetApiUsersMe,
};

export type {} from "@/shared/api/requests";
