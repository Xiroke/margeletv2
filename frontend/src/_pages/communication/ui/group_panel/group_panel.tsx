import { HTMLAttributes, useEffect, useState } from "react";
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
import useMediaQuery from "@/shared/lib/hooks/use_media_query";
import { apiGroup } from "@/entities/group/model";

export interface GroupPanelProps extends HTMLAttributes<HTMLDivElement> {}

export const GroupPanel = ({ className }: GroupPanelProps) => {
  /*
  Group panel it is block with all connected with current group
  */
  const queryClient = useQueryClient();
  const groupId = useAppSelector((state) => state.group.id);
  const chatId = useAppSelector((state) => state.chat.id);
  const groupName = useAppSelector((state) => state.group.title);
  const panorama_path = useAppSelector((state) => state.group.panorama_path);
  const [panoramaUrl, setPanoramaUrl] = useState<string | null>(null);
  const { mutateAsync } = apiChat.create();
  const isLaptop = useMediaQuery("(min-width: 1024px)");

  if (!groupId) {
    return;
  }

  useEffect(() => {
    if (!groupId || !panorama_path) {
      return;
    }

    const load = async () => {
      const result = await apiGroup.loadPanorama(groupId);

      const url = URL.createObjectURL(result);
      setPanoramaUrl(url);
    };

    load();

    return () => {
      setPanoramaUrl(null);
    };
  }, [groupId]);

  const createChat = async (value: string) => {
    await mutateAsync({ groupId, requestBody: { title: value } });

    queryClient.invalidateQueries({
      queryKey: [apiChat.getGroupChatsKey, { groupId: groupId }],
    });
  };

  if (isLaptop || (!chatId && !isLaptop)) {
    return (
      <div className={clsx(styles.group_panel, className)}>
        <div className={styles.panorama}>
          {panoramaUrl && (
            <Image
              src={panoramaUrl}
              width={300}
              height={200}
              alt="Panorama"
              className={styles.panorama_image}
            />
          )}
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

        <div className={styles.chat_title}>
          <span>Чаты</span>
          <DialogCreateChat
            onClickHandler={(value: string) => createChat(value)}
          >
            <div className="icon_box">
              <IconPlus size="25" className={styles.chat_create} />
            </div>
          </DialogCreateChat>
        </div>
        <ChatList className={styles.chat_list} />
      </div>
    );
  }
};

export default GroupPanel;
