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
  meOpt: getMeApiAuthMeGetOptions,
  registerMut: registerApiAuthRegisterPostMutation,
  resendVerificationMut:
    resendVerificationApiAuthResendVerificationPostMutation,
  tokenMut: getAccessTokenApiAuthTokenPostMutation,
  verifyMut: verifyApiAuthVerifyPostMutation,
};
