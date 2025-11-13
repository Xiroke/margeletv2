import type { QueryClient } from '@tanstack/react-query'

import { createRootRouteWithContext, Outlet, redirect } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Toaster } from 'sonner'

import { AllProviders } from '@/app/providers/AllProviders.tsx'
import { excludedAuthCheckRoutes } from '@/config.ts'
import { getIsAuth } from '@/shared/lib/getIsAuth.ts'

import TanStackQueryLayout from '../integrations/tanstack-query/layout.tsx'

interface MyRouterContext {
  isAuth: boolean
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async ({ location }) => {
    const isExcluded = excludedAuthCheckRoutes.some(route =>
      route.endsWith('*') ? location.pathname.startsWith(route.replace('*', '')) : location.pathname === route,
    )

    const isAuth = await getIsAuth()

    if (isExcluded && !isAuth) {
      return
    }
    else if (isExcluded && isAuth) {
      throw redirect({ to: '/groups' })
    }
    if (!isAuth) throw redirect({ to: '/' })
  },
  component: () => (
    <>
      <Toaster position="top-center" />
      <AllProviders>
        <Outlet />
      </AllProviders>
      <TanStackRouterDevtools />
      <TanStackQueryLayout />
    </>
  ),
})
