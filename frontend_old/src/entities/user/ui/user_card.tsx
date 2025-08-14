import { HTMLAttributes } from "react";

import styles from "./user_card.module.scss";
import { useApiUser } from "../model";
import clsx from "clsx";

export interface UserCardProps extends HTMLAttributes<HTMLDivElement> {
  styleType?: "small" | "default";
}

export const UserCard = ({
  styleType = "default",
  ...props
}: UserCardProps) => {
  const { data } = useApiUser.get();

  if (!data) {
    return null;
  }

  return (
    <div
      {...props}
      className={clsx(
        styleType == "default" ? styles.default : styles.small,
        styles.user_card
      )}
    >
      {data.name.slice(0, 2)}
    </div>
  );
};

export default UserCard;
