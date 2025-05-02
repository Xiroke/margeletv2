"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState, StrictMode } from "react";
import { Provider } from "react-redux";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { OpenAPI as OpenAPIConfig } from "@/shared/api/requests/core/OpenAPI";
import store from "./store";
import settings from "@/shared/config";
import WebsocketProvider from "../shared/lib/context/websocket_provider";
import { usePathname } from "next/navigation";

OpenAPIConfig.BASE = settings.NEXT_PUBLIC_API_URL!;
OpenAPIConfig.CREDENTIALS = settings.CREDENTIALS as
  | "include"
  | "omit"
  | "same-origin";
OpenAPIConfig.WITH_CREDENTIALS = true;

export function Providers({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [queryClient] = useState(() => new QueryClient({}));

  return (
    <StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {/* websoket not needed in other pages */}
          {pathname == "/communication" ? (
            <WebsocketProvider>{children}</WebsocketProvider>
          ) : (
            children
          )}

          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </StrictMode>
  );
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
