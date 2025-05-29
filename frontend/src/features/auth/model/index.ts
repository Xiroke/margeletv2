import {
  useAuthServicePostApiAuthAccessToken,
  useAuthServicePostApiAuthJwtLogout,
} from "@/shared/api/queries";

export const apiAuth = {
  postAccessToken: useAuthServicePostApiAuthAccessToken,
  logout: useAuthServicePostApiAuthJwtLogout,
};
