import {
  getLatestMessagesByGroupApiMessagesGroupIdGetOptions,
  getLatestMessagesByGroupApiMessagesGroupIdGetQueryKey,
} from '@/shared/api/generated/@tanstack/react-query.gen';

export const messageQueryProps = {
  getLatestMessageOpt: getLatestMessagesByGroupApiMessagesGroupIdGetOptions,
  getLatestMessageOptKey: getLatestMessagesByGroupApiMessagesGroupIdGetQueryKey,
};
