import { HTMLAttributes, MouseEventHandler } from 'react';
import clsx from 'clsx';

import styles from './chat.module.scss';

export interface ChatProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
}

export const Chat = ({ title, className, onClick }: ChatProps) => {
  return (
    <div className={clsx(styles['chat'], className)} onClick={onClick}>
      # {title}
    </div>
  );
};

export default Chat;
