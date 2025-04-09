'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

import { OpenAPI as OpenAPIConfig } from '@/shared/api/requests/core/OpenAPI';
import { Provider } from 'react-redux';
import store from './store';

OpenAPIConfig.BASE = process.env.NEXT_PUBLIC_API_URL!;
export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({}));

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
