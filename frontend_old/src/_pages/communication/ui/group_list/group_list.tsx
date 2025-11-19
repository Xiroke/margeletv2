"use client";
import clsx from "clsx";
import { HTMLAttributes } from "react";

import { setChatId } from "@/entities/chat/model/slice";
import { apiGroup, GroupRead } from "@/entities/group/model";
import { setGroupData } from "@/entities/group/model/slice";
import GroupCard from "@/entities/group/ui";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
import styles from "./group_list.module.scss";

export interface GroupListProps extends HTMLAttributes<HTMLDivElement> {}

export const GroupList = ({ className }: GroupListProps) => {
  const dispatch = useAppDispatch();
  const { data }: { data: GroupRead[] | undefined } =
    apiGroup.getMyGroups();

  // filter group by name
  const searchQuery = useAppSelector((state) => state.group.search_query);

  const onClick = (id: string, title: string) => {
    dispatch(setGroupData({ id, title }));
    dispatch(setChatId(null));
  };

  const filteredData = searchQuery
    ? data?.filter((value) => value.title.includes(searchQuery))
    : data;

  return (
    <div className={clsx(styles.groups, className)}>
      {filteredData &&
        filteredData.map((item) => (
          <GroupCard
            key={item.title}
            onClick={() => onClick(item.id, item.title)}
            data={item}
          />
        ))}
    </div>
  );
};

export default GroupList;
