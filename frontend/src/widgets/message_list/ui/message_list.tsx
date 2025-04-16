import { HTMLAttributes } from 'react';
import clsx from 'clsx';

import styles from './message_list.module.scss';
import Message from '@/entities/message/ui';

export interface MessageListProps extends HTMLAttributes<HTMLDivElement> {}

export const MessageList = ({ className }: MessageListProps) => {
  return (
    <div className={clsx(styles.message_list, className)}>
      <Message />
      <Message />
      <Message />
    </div>
  );
};

export default MessageList;
