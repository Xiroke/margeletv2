"use client";
import { HTMLAttributes, MouseEventHandler, useEffect, useState } from "react";
import Image from "next/image";

import styles from "./group_card.module.scss";
import { apiGroup, ReadGroupSchema } from "../model";
import { useAppDispatch } from "@/shared/lib/hooks";
import { setPanoramaPath } from "../model/slice";

export interface GroupCardProps extends HTMLAttributes<HTMLDivElement> {
  data: ReadGroupSchema;
  onClick: MouseEventHandler<HTMLDivElement>;
}

export const GroupCard = ({ onClick, data }: GroupCardProps) => {
  const dispatch = useAppDispatch();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (data.avatar_path) {
      apiGroup
        .loadAvatar(data.id)
        .then((blob) => URL.createObjectURL(blob))
        .then((url) => setAvatarUrl(url));
    }
  }, [data.avatar_path]);

  const onClickHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    //clear panorama when select other group
    dispatch(setPanoramaPath(null));

    // if panorama path not set, app will not request image from backend
    if (data?.panorama_path) {
      dispatch(setPanoramaPath(data.panorama_path));
    }

    onClick(e);
  };

  return (
    data && (
      <div onClick={onClickHandler} className={styles.group_card}>
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            width={65}
            height={65}
            className={styles.avatar}
            alt="avatar"
          ></Image>
        ) : (
          <div className={styles.avatar}>{data.title.slice(0, 2)}</div>
        )}
        <div className={styles.information}>
          <div className={styles.title}>{data.title}</div>
          {/* <div className={styles.last_message}>что то написано</div> */}
        </div>
        {/* <div className={styles.addition}>
          <div className={styles.last_message_time}>52:38</div>
          <div className={styles.amount_unread_messages}>208</div>
        </div> */}
      </div>
    )
  );
};

export default GroupCard;
