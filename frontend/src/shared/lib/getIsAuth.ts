import { QueryClient } from '@tanstack/react-query'

import { userQueryProps } from '@/entities/User/api'

export const getIsAuth = async () => {
  try {
    return await new QueryClient().fetchQuery(userQueryProps.getMeOpt())
  }
  catch {
    return null
  }
}
