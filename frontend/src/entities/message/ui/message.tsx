import { HTMLAttributes } from 'react';

import styles from './message.module.scss';

export interface MessageProps extends HTMLAttributes<HTMLDivElement> {
  author: string;
  text: string;
  time: string;
}

export const Message = ({ author, text, time }: MessageProps) => {
  return (
    <div className={styles.message}>
      <div className={styles.avatar}>{author.slice(0, 2)}</div>
      <div className={styles.content}>
        <div className={styles.author}>{author}</div>
        <div className={styles.text}>{text}</div>
      </div>
      <div className={styles.time}>
        {new Date(time).toLocaleString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })}
      </div>
    </div>
  );
};

export default Message;
