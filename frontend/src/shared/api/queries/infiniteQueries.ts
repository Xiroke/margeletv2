// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { InfiniteData, UseInfiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { MessagesService } from "../requests/services.gen";
import * as Common from "./common";
export const useMessagesServiceGetApiMessagesChatByChatIdInfinite = <TData = InfiniteData<Common.MessagesServiceGetApiMessagesChatByChatIdDefaultResponse>, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ amount, chatId }: {
  amount?: number;
  chatId: string;
}, queryKey?: TQueryKey, options?: Omit<UseInfiniteQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useInfiniteQuery({
  queryKey: Common.UseMessagesServiceGetApiMessagesChatByChatIdKeyFn({ amount, chatId }, queryKey), queryFn: ({ pageParam }) => MessagesService.getApiMessagesChatByChatId({ amount, chatId, page: pageParam as number }) as TData, initialPageParam: "1", getNextPageParam: response => (response as {
    next_page: number;
  }).next_page, ...options
});
