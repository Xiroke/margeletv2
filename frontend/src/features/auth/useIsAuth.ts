import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

import { userQueryProps } from '@/entities/User/api'

/**
 * Redirect to chat if user is auth
 * Redirect to login if user is not auth when inverse enable
 */
export const useIsAuth = (inverse: boolean = false) => {
  const { isError, isLoading } = useQuery({ ...userQueryProps.getMeOpt() })
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && !isError && !inverse) {
      navigate({ params: { groupType: 'simple_group' }, to: '/group/$groupType/{-$groupId}' })
    }
    else if (!isLoading && isError && inverse) {
      navigate({ to: '/' })
    }
  }, [isLoading, isError, navigate, inverse])
}
