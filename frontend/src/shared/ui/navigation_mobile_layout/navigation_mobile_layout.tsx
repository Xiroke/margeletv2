import { HTMLAttributes } from "react";

import styles from "./navigation_mobile_layout.module.scss";
import clsx from "clsx";

export interface NavigationMobileLayoutProps
  extends HTMLAttributes<HTMLDivElement> {}

export const NavigationMobileLayout = ({
  className,
  children,
}: NavigationMobileLayoutProps) => {
  return (
    <div className={clsx(styles.navigation_mobile_layout, className)}>
      {children}
    </div>
  );
};

export default NavigationMobileLayout;
