'use client';
import { HTMLAttributes } from 'react';
import clsx from 'clsx';

import GroupCard from '@/entities/group/ui';
import styles from './group_list.module.scss';
import { useAppDispatch } from '@/shared/lib/hooks';
import { setGroupId } from '@/entities/group/model/slice';
import { apiGroup, ReadGroupSchema } from '@/entities/group/model';

export interface GroupListProps extends HTMLAttributes<HTMLDivElement> {}

export const GroupList = ({ className }: GroupListProps) => {
  const dispatch = useAppDispatch();
  const { data }: { data: ReadGroupSchema[] | undefined } = apiGroup.getMyGroups();

  return (
    <div className={clsx(styles.groups, className)}>
      {data &&
        data.map((item) => (
          <GroupCard key={item.id} id={item.id} onClick={() => dispatch(setGroupId(item.id))} />
        ))}
    </div>
  );
};

export default GroupList;
