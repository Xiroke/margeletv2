import { userQueryProps } from '@/entities/User/api'
import { queryClient } from '@/integrations/tanstack-query/root-provider'

export const getIsAuth = async () => {
  try {
    return await queryClient.fetchQuery({ ...userQueryProps.getMeOpt(), retry: false, staleTime: 0 })
  } catch {
    return null
  }
}
