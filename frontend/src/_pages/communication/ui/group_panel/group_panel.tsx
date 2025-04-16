import { HTMLAttributes } from 'react';
import clsx from 'clsx';

import styles from './group_panel.module.scss';
import { useAppSelector } from '@/shared/lib/hooks';
import ChatList from '@/widgets/chat_list/ui';

export interface GroupPanelProps extends HTMLAttributes<HTMLDivElement> {}

export const GroupPanel = ({ className }: GroupPanelProps) => {
  const groupId = useAppSelector((state) => state.group.id);

  if (!groupId) {
    return null;
  }

  return (
    <div className={clsx(styles.group_panel, className)}>
      <div className={styles.panorama}></div>
      <div className={styles.buttons}>
        <div className={styles.button_item} />
        <div className={styles.button_item} />
      </div>
      <ChatList />
    </div>
  );
};

export default GroupPanel;
