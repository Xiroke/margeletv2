import { HTMLAttributes } from "react";
import Image from "next/image";
import Link from "next/link";

import UserCard from "@/entities/user/ui";
import styles from "./navigation.module.scss";
import UserDropdown from "./user_dropdown";
import clsx from "clsx";

export interface NavigationProps extends HTMLAttributes<HTMLDivElement> {}

export const Navigation = ({ className }: NavigationProps) => {
  // a panel on the left of window
  return (
    <div className={clsx(styles.navigation, className)}>
      <UserDropdown>
        <UserCard />
      </UserDropdown>
      <Link
        className={styles.navigation_item}
        href="/communication/create_group"
      >
        <Image
          src="/icons/category-plus.svg"
          width={35}
          height={35}
          alt="add group"
          className={styles.add_group}
        />
      </Link>
    </div>
  );
};

export default Navigation;
