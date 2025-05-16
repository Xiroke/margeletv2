"use client";
import { HTMLAttributes } from "react";
import clsx from "clsx";
import { useState } from "react";

import styles from "./group_dropdown.module.scss";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import DialogInvitation from "../dialog_invitation";
import Button from "@/shared/ui/button";
import Link from "next/link";

export interface GroupDropdownProps extends HTMLAttributes<HTMLDivElement> {}

export const GroupDropdown = ({ className, children }: GroupDropdownProps) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className={clsx(styles.dropdown, className)}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className={styles.menu_content}>
            <DropdownMenu.Item
              className={styles.menu_item}
              onSelect={() => setOpenDialog(true)}
            >
              Добавить участника
            </DropdownMenu.Item>

            <DropdownMenu.Item className={styles.menu_item}>
              <Link href={"/communication/settings"}>Настройки группы</Link>
            </DropdownMenu.Item>

            <DropdownMenu.Item className={styles.menu_item}>
              Выйти из группы
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <DialogInvitation open={openDialog} setOpen={setOpenDialog} />
    </div>
  );
};

export default GroupDropdown;
