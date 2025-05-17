import { HTMLAttributes } from "react";

import styles from "./navigation_mobile.module.scss";
import { IconBurger } from "@tabler/icons-react";
import UserDropdown from "@/widgets/navigation/ui/user_dropdown";
import UserCard from "@/entities/user/ui";

export interface NavigationMobileProps extends HTMLAttributes<HTMLDivElement> {}

export const NavigationMobile = ({}: NavigationMobileProps) => {
  // the panel on the top of window for mobile with additional logic
  return (
    <div className={styles["navigation_mobile"]}>
      <UserDropdown>
        <UserCard />
      </UserDropdown>
      <IconBurger />
    </div>
  );
};

export default NavigationMobile;
