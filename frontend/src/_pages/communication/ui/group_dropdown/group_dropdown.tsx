"use client";
import { HTMLAttributes } from "react";
import clsx from "clsx";
import { useState } from "react";

import styles from "./group_dropdown.module.scss";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import DialogInvitation from "../dialog_invitation";
import { apiGroup } from "@/entities/group/model";
import { useQueryClient } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
import { setGroupData } from "@/entities/group/model/slice";
import { useToastStatus } from "@/shared/lib/hooks/use_toast";

export interface GroupDropdownProps extends HTMLAttributes<HTMLDivElement> {}

export const GroupDropdown = ({ className, children }: GroupDropdownProps) => {
  // dropdown with logic for group
  const [openDialog, setOpenDialog] = useState(false);
  const queryClient = useQueryClient();
  const groupId = useAppSelector((state) => state.group.id);
  const showToast = useToastStatus();

  if (!groupId) return null;

  const dispatch = useAppDispatch();

  const { mutateAsync: mutateLeave } = apiGroup.leaveGroup();

  const leave = async () => {
    try {
      await mutateLeave({ groupId });

      queryClient.invalidateQueries({
        queryKey: [apiGroup.getMyGroupsKey],
      });

      dispatch(setGroupData({ id: null, title: null }));
    } catch (error) {
      showToast("error", "Ошибка", "Не удалось выйти из группы");
    }
  };

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

            <DropdownMenu.Item className={styles.menu_item} onSelect={leave}>
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
