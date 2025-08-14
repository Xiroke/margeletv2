import { useAuthServicePostApiAuthJwtLogin } from "@/shared/api/queries";

export const apiLogin = {
  login: useAuthServicePostApiAuthJwtLogin,
};

export type { Body_auth_db_cookie_login_api_auth_jwt_login_post } from "@/shared/api/requests";
