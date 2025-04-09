'use client';
import { HTMLAttributes } from 'react';
import clsx from 'clsx';

import GroupCard from '@/entities/group/ui';
import styles from './group_list.module.scss';
import { useAppDispatch } from '@/shared/lib/hooks';
import { setGroupId } from '@/entities/group/model/slice';

export interface GroupListProps extends HTMLAttributes<HTMLDivElement> {
  ids: string[];
}

export const GroupList = ({ ids, className }: GroupListProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className={clsx(styles.groups, className)}>
      {ids.map((id) => (
        <GroupCard key={id} id={id} onClick={() => dispatch(setGroupId(id))} />
      ))}
    </div>
  );
};

export default GroupList;
