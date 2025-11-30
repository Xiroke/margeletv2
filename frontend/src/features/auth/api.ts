import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

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

export const useLogout = () => {
  const navigate = useNavigate()
  const logout = useMutation(authQueryProps.logoutMut())

  const onClickLogout = () => {
    logout.mutate({})
    navigate({ to: '/' })
  }

  return onClickLogout
}
