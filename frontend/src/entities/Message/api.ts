import { getCursorMessagesByGroupApiMessagesCursorGroupIdGet } from '@/shared/api/generated';
import { getCursorMessagesByGroupApiMessagesCursorGroupIdGetInfiniteOptions } from '@/shared/api/generated/@tanstack/react-query.gen';

import { getCachedMessages, saveMessages } from './db';


const getCursorMessagesInfWithCache = (groupId: string) => {
  const baseOptions =
    getCursorMessagesByGroupApiMessagesCursorGroupIdGetInfiniteOptions({
      path: { group_id: groupId },
    });

  return {
    ...baseOptions,
    queryFn: async ({ pageParam }: { pageParam: null | string }) => {
      const cachedData = await getCachedMessages(groupId);

      if (cachedData.messages.length > 0) {
        return cachedData;
      }

      try {
        const response = await getCursorMessagesByGroupApiMessagesCursorGroupIdGet({
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
        console.error('API request failed:', error);
        return { cursor: null, has_more: false, messages: [] };
      }
    },
  };
};

export const messageQueryProps = {
  getCursorMessagesInf:
    getCursorMessagesByGroupApiMessagesCursorGroupIdGetInfiniteOptions,
  getCursorMessagesInfWithCache,
};
