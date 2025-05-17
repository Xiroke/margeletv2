"use client";
import { HTMLAttributes } from "react";
import clsx from "clsx";

import GroupCard from "@/entities/group/ui";
import styles from "./group_list.module.scss";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
import { setGroupData } from "@/entities/group/model/slice";
import { useApiGroup, ReadGroupSchema } from "@/entities/group/model";
import { setChatId } from "@/entities/chat/model/slice";

export interface GroupListProps extends HTMLAttributes<HTMLDivElement> {}

export const GroupList = ({ className }: GroupListProps) => {
  const dispatch = useAppDispatch();
  const { data }: { data: ReadGroupSchema[] | undefined } =
    useApiGroup.getMyGroups();

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
            id={item.id}
            onClick={() => onClick(item.id, item.title)}
            data={item}
          />
        ))}
    </div>
  );
};

export default GroupList;
