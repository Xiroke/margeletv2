import { HTMLAttributes } from 'react';
import clsx from 'clsx';

import styles from './group_panel.module.scss';
import { useAppSelector } from '@/shared/lib/hooks';
import ChatList from '@/widgets/chat_list/ui';
import Image from 'next/image';
import Link from 'next/link';
import GroupDropdown from '../group_dropdown';

export interface GroupPanelProps extends HTMLAttributes<HTMLDivElement> {
  panorama_path: string;
}

export const GroupPanel = ({ panorama_path, className }: GroupPanelProps) => {
  const groupId = useAppSelector((state) => state.group.id);
  const groupName = useAppSelector((state) => state.group.title);

  if (!groupId) {
    return null;
  }

  return (
    <div className={clsx(styles.group_panel, className)}>
      {panorama_path ? (
        <div className={styles.panorama}>
          <div className={styles.panorama_title}>{groupName}</div>
          <GroupDropdown className={styles.panorama_dropdown}>
            <Image
              className={styles.panorama_options}
              src="/icons/chevron-down.svg"
              width={25}
              height={25}
              alt="options"
            />
          </GroupDropdown>
          <div className={styles.panorama_gradient}></div>
        </div>
      ) : (
        <div className={styles.no_panorama}>
          <div className={styles.panorama_title}>{groupName}</div>
          <GroupDropdown className={styles.panorama_dropdown}>
            <Image
              className={styles.panorama_options}
              src="/icons/chevron-down.svg"
              width={25}
              height={25}
              alt="options"
            />
          </GroupDropdown>
        </div>
      )}
      <div className={styles.chat_title}><span>Чаты</span><div className={styles.chat_create}>+</div></div>
      <ChatList className={styles.chat_list} />
    </div>
  );
};

export default GroupPanel;
