'use client';
import { HTMLAttributes } from 'react';
import clsx from 'clsx';

import styles from './current_group.module.scss';
import VerticalLine from '@/shared/ui/vertical_line';
import Talk from '../talk';
import GroupPanel from '../group_panel';
import { useAppSelector } from '@/shared/lib/hooks';

export interface CurrentGroupProps extends HTMLAttributes<HTMLDivElement> {}

export const CurrentGroup = ({ className }: CurrentGroupProps) => {
  const groupId = useAppSelector((state) => state.group.id);
  return (
    <div className={clsx(styles.current_group, className)}>
      {groupId ? (
        <Talk className={styles.talk} />
      ) : (
        <div className={styles.current_group_unselect}>Выберите группу</div>
      )}
      <VerticalLine className="vertical_line" />
      <GroupPanel className={styles.group_panel} />
    </div>
  );
};

export default CurrentGroup;
