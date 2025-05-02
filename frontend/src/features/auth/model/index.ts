import {
  useAuthServiceGetApiAuthAccessToken,
  useAuthServicePostApiAuthJwtLogout,
} from "@/shared/api/queries";

export const apiAuth = {
  getAccessToken: useAuthServiceGetApiAuthAccessToken,
  logout: useAuthServicePostApiAuthJwtLogout,
};
