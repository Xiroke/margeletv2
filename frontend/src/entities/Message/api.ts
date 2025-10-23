import { infiniteQueryOptions } from "@tanstack/react-query";
import { getCursorMessagesByGroupApiMessagesGroupIdGetInfiniteOptions } from "@/shared/api/generated/@tanstack/react-query.gen";
import { getCachedMessages, saveMessages } from "./db";
import { getCursorMessagesByGroupApiMessagesGroupIdGet } from "@/shared/api/generated";

const getCursorMessagesInfWithCache = (groupId: string) => {
  const baseOptions =
    getCursorMessagesByGroupApiMessagesGroupIdGetInfiniteOptions({
      path: { group_id: groupId },
    });

  return {
    ...baseOptions,
    queryFn: async ({ pageParam }: { pageParam: string | null }) => {
      const cachedData = await getCachedMessages(groupId);

      if (cachedData.messages.length > 0) {
        return cachedData;
      }

      try {
        const response = await getCursorMessagesByGroupApiMessagesGroupIdGet({
          path: { group_id: groupId },
          query: pageParam ? { cursor: pageParam } : undefined,
        });

        if (response.error) {
          throw response.error;
        }

        await saveMessages(
          groupId,
          response.data.messages,
          response.data.cursor
        );
        return response.data;
      } catch (error) {
        console.error("API request failed:", error);
        return { messages: [], cursor: null, has_more: false };
      }
    },
  };
};

export const messageQueryProps = {
  getCursorMessagesInf:
    getCursorMessagesByGroupApiMessagesGroupIdGetInfiniteOptions,
  getCursorMessagesInfWithCache,
};
