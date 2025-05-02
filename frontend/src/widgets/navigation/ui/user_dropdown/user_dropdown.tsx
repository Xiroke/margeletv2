import { HTMLAttributes } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";

import styles from "./user_dropdown.module.scss";
import { apiAuth } from "@/features/auth/model";
import { useRouter } from "next/navigation";

export interface UserDropdownProps extends HTMLAttributes<HTMLDivElement> {}

export const UserDropdown = ({ children, className }: UserDropdownProps) => {
  const { mutate } = apiAuth.logout();
  const router = useRouter();

  const onClick = () => {
    mutate();
    router.push("/");
  };

  return (
    <div className={clsx(styles.dropdown, className)}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className={styles.menu_content}>
            <DropdownMenu.Item className={styles.menu_item} onClick={onClick}>
              Выйти из аккаунта
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};

export default UserDropdown;
