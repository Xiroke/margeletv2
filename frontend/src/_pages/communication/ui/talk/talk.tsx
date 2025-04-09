import { HTMLAttributes } from 'react';
import clsx from 'clsx';

import styles from './talk.module.scss';
import Sending from '../sending';

export interface TalkProps extends HTMLAttributes<HTMLDivElement> {}

export const Talk = ({ className }: TalkProps) => {
  return (
    <div className={clsx(styles.talk, className)}>
      <Sending />
    </div>
  );
};

export default Talk;
