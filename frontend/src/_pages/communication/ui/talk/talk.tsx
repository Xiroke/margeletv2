import { HTMLAttributes } from 'react';
import clsx from 'clsx';

import styles from './talk.module.scss';
import Sending from '../sending';
import MessageList from '@/widgets/message_list/ui';
import { useAppSelector } from '@/shared/lib/hooks';

export interface TalkProps extends HTMLAttributes<HTMLDivElement> {}

export const Talk = ({ className }: TalkProps) => {
  const chatId = useAppSelector((state) => state.chat.id);

  return chatId ? (
    <div className={clsx(styles.talk, className)}>
      <div className={styles.talk_content}>
        <MessageList className={styles.message_list} />
        <Sending />
      </div>
    </div>
  ) : (
    <div className={styles.current_chat_unselect}>Выберите чат</div>
  );
};

export default Talk;
