import { HTMLAttributes } from "react";
import clsx from "clsx";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { IconPlus } from "@tabler/icons-react";

import styles from "./group_panel.module.scss";
import { useAppSelector } from "@/shared/lib/hooks";
import ChatList from "@/widgets/chat_list/ui";
import GroupDropdown from "../group_dropdown";
import DialogCreateChat from "../dialog_create_chat";
import { apiChat } from "@/entities/chat/model";

export interface GroupPanelProps extends HTMLAttributes<HTMLDivElement> {
  panorama_path: string;
}

export const GroupPanel = ({ panorama_path, className }: GroupPanelProps) => {
  /*
  Group panel it is block with all connected with current group
  */
  const queryClient = useQueryClient();
  const groupId = useAppSelector((state) => state.group.id);
  const groupName = useAppSelector((state) => state.group.title);
  const { mutateAsync } = apiChat.create();

  if (!groupId) {
    return null;
  }

  const createChat = async (value: string) => {
    await mutateAsync({ groupId, requestBody: { title: value } });

    queryClient.invalidateQueries({
      queryKey: [apiChat.getGroupChatsKey, { groupId: groupId }],
    });
  };

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

      <div className={styles.chat_title}>
        <span>Чаты</span>
        <DialogCreateChat onClickHandler={(value: string) => createChat(value)}>
          <div className="icon_box">
            <IconPlus size="25" className={styles.chat_create} />
          </div>
        </DialogCreateChat>
      </div>
      <ChatList className={styles.chat_list} />
    </div>
  );
};

export default GroupPanel;
