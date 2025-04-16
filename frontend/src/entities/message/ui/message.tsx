import { HTMLAttributes } from 'react';

import styles from './message.module.scss';

export interface MessageProps extends HTMLAttributes<HTMLDivElement> {}

export const Message = ({}: MessageProps) => {
  return (
    <div className={styles.message}>
      <div className={styles.avatar}></div>
      <div className={styles.content}>
        <div className={styles.author}>Автор сообщения</div>
        <div className={styles.text}>Текст сообщения</div>
      </div>
      <div className={styles.time}>12:34</div>
    </div>
  );
};

export default Message;
