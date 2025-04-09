'use client';
import { HTMLAttributes } from 'react';

import styles from './group_card.module.scss';
import { apiGroup } from '../model';

export interface GroupCardProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
}

export const GroupCard = ({ id, onClick }: GroupCardProps) => {
  const { data } = apiGroup.get({ groupUuid: id });

  return (
    <div onClick={onClick} className={styles.group_card}>
      <div className={styles.avatar}></div>
      <div className={styles.information}>
        <div className={styles.title}>{data?.title}</div>
        <div className={styles.last_message}>что то написано</div>
      </div>
      <div className={styles.addition}>
        <div className={styles.last_message_time}>52:38</div>
        <div className={styles.amount_unread_messages}>208</div>
      </div>
    </div>
  );
};

export default GroupCard;
