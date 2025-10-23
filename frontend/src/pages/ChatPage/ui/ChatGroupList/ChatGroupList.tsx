import { GroupChatCard } from "@/entities/Group";
import { groupChatTest } from "@/entities/Group/model/test";
import { personalGroupQueryProps } from "@/entities/PersonalGroup/api";
import { simpleGroupQueryProps } from "@/entities/SimpleGroup/api";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import type { FC } from "react";

const groupQueryProps = {
  simple: simpleGroupQueryProps.getMySimpleGroups,
  personal: personalGroupQueryProps.getMyPersonalGroups,
};

interface ChatGroupListProps {
  className?: string;
  groupType: "simple" | "personal";
}

export const ChatGroupList: FC<ChatGroupListProps> = (
  props: ChatGroupListProps
) => {
  const { className, groupType } = props;
  const { data: groups } = useQuery(groupQueryProps[groupType]());

  return (
    <div className={className}>
      {groups
        ? groups.map((group, idx) => (
            <Link
              to="."
              params={{ groupId: group.id }}
              className="aSimple"
              key={group.id}
            >
              <GroupChatCard
                key={idx}
                groupChat={{ ...groupChatTest, title: group.title }}
              />
            </Link>
          ))
        : "Нет групп"}
    </div>
  );
};
