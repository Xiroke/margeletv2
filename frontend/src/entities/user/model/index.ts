import {
  useUsersServiceGetApiUsersAvatarByGroupId,
  useUsersServiceGetApiUsersById,
  useUsersServiceGetApiUsersMe,
} from "@/shared/api/queries";

export const apiUser = {
  getAvatar: useUsersServiceGetApiUsersAvatarByGroupId,
  getUserById: useUsersServiceGetApiUsersById,
  get: useUsersServiceGetApiUsersMe,
};

export type {} from "@/shared/api/requests";
