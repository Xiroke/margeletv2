import type { QueryClient } from '@tanstack/react-query'

import { createRootRouteWithContext, Outlet, redirect } from '@tanstack/react-router'
import { Toaster } from 'sonner'

import { AllProviders } from '@/app/providers/AllProviders.tsx'
import { getIsExcluded } from '@/config.ts'
import { getIsAuth } from '@/shared/lib/getIsAuth.ts'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async ({ location }) => {
    const isExcluded = getIsExcluded(location.pathname)

    const isAuth = await getIsAuth()

    if (isExcluded && isAuth) {
      throw redirect({ to: '/groups' })
    } else if (!isExcluded && !isAuth) {
      throw redirect({ to: '/' })
    }
  },
  component: () => (
    <>
      <Toaster position="top-center" />
      <AllProviders>
        <Outlet />
      </AllProviders>
      {/* <TanStackRouterDevtools />
      <TanStackQueryLayout /> */}
    </>
  ),
})
