import { HTMLAttributes } from 'react';

import styles from './chat_list.module.scss';

export interface ChatListProps extends HTMLAttributes<HTMLDivElement> {}

export const ChatList = ({}: ChatListProps) => {
  return (
    <div className={styles.chat_list}>
      <div className={styles.chat_item}># Основной чат</div>
      <div className={styles.chat_item}># Какой-то чат</div>
    </div>
  );
};

export default ChatList;
