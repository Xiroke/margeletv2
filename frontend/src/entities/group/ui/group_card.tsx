'use client';
import { HTMLAttributes } from 'react';
import Image from 'next/image';

import styles from './group_card.module.scss';
import { apiGroup } from '../model';

export interface GroupCardProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  image_url?: string;
}

export const GroupCard = ({ id, image_url, onClick }: GroupCardProps) => {
  const { data } = apiGroup.get({ groupUuid: id });

  return (
    data && (
      <div onClick={onClick} className={styles.group_card}>
        {image_url ? (
          <Image
            src={image_url}
            width={65}
            height={65}
            className={styles.avatar}
            alt="avatar"></Image>
        ) : (
          <div className={styles.avatar}>{data.title.slice(0, 2)}</div>
        )}
        <div className={styles.information}>
          <div className={styles.title}>{data.title}</div>
          <div className={styles.last_message}>что то написано</div>
        </div>
        <div className={styles.addition}>
          <div className={styles.last_message_time}>52:38</div>
          <div className={styles.amount_unread_messages}>208</div>
        </div>
      </div>
    )
  );
};

export default GroupCard;
