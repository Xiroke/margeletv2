import {
  getAccessTokenApiAuthTokenPostMutation,
  loginApiAuthLoginPostMutation,
  logoutApiAuthLogoutPostMutation,
  registerApiAuthRegisterPostMutation,
  resendVerificationApiAuthResendVerificationPostMutation,
  verifyApiAuthVerifyPostMutation,
} from '@/shared/api/generated/@tanstack/react-query.gen'

export const authQueryProps = {
  loginMut: loginApiAuthLoginPostMutation,
  logoutMut: logoutApiAuthLogoutPostMutation,
  registerMut: registerApiAuthRegisterPostMutation,
  resendVerificationMut:
    resendVerificationApiAuthResendVerificationPostMutation,
  tokenMut: getAccessTokenApiAuthTokenPostMutation,
  verifyMut: verifyApiAuthVerifyPostMutation,
}
