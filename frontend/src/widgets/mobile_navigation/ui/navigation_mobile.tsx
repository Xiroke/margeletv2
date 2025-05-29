import { HTMLAttributes } from "react";

import styles from "./navigation_mobile.module.scss";
import { IconBurger } from "@tabler/icons-react";
import UserDropdown from "@/widgets/navigation/ui/user_dropdown";
import UserCard from "@/entities/user/ui";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

export interface NavigationMobileProps extends HTMLAttributes<HTMLDivElement> {}

export const NavigationMobile = ({
  children,
  className,
  ...props
}: NavigationMobileProps) => {
  // the panel on the top of window for mobile with additional logic
  return (
    <div {...props} className={clsx(styles.navigation_mobile, className)}>
      {children}
      <UserDropdown>
        <UserCard styleType="small" />
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

export default NavigationMobile;
