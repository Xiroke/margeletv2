import { HTMLAttributes } from "react";

import styles from "./user_card.module.scss";
import { useApiUser } from "../model";

export interface UserCardProps extends HTMLAttributes<HTMLDivElement> {}

export const UserCard = ({ ...props }: UserCardProps) => {
  const { data } = useApiUser.get();

  if (!data) {
    return null;
  }

  return (
    <div {...props} className={styles["user_card"]}>
      {data.name.slice(0, 2)}
    </div>
  );
};

export default UserCard;
