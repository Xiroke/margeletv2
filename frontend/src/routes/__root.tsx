import type { QueryClient } from '@tanstack/react-query';

import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Toaster } from 'sonner';

import { AllProviders } from '@/app/providers/AllProviders.tsx';

import TanStackQueryLayout from '../integrations/tanstack-query/layout.tsx';

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Toaster position='top-center'/>
      <AllProviders>
        <Outlet />
      </AllProviders>
      <TanStackRouterDevtools />
      <TanStackQueryLayout />
    </>
  ),
});
