import {
  useAuthServicePostApiAuthAccessToken,
  useAuthServicePostApiAuthJwtLogout,
  useAuthServicePostApiAuthVerify,
} from "@/shared/api/queries";

export const apiAuth = {
  postAccessToken: useAuthServicePostApiAuthAccessToken,
  verify: useAuthServicePostApiAuthVerify,
  logout: useAuthServicePostApiAuthJwtLogout,
};
