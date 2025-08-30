import {
  getAccessTokenApiAuthTokenPostMutation,
  getMeApiAuthMeGetOptions,
  loginApiAuthLoginPostMutation,
  registerApiAuthRegisterPostMutation,
  resendVerificationApiAuthResendVerificationPostMutation,
  verifyApiAuthVerifyPostMutation,
} from '@/shared/api/generated/@tanstack/react-query.gen';

export const authQueryProps = {
  loginMut: loginApiAuthLoginPostMutation,
  registerMut: registerApiAuthRegisterPostMutation,
  resendVerificationMut:
    resendVerificationApiAuthResendVerificationPostMutation,
  verifyMut: verifyApiAuthVerifyPostMutation,
  tokenMut: getAccessTokenApiAuthTokenPostMutation,
  meOpt: getMeApiAuthMeGetOptions,
};
