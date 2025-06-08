import { HTMLAttributes, use, useEffect } from "react";
import { IconPlus, IconCopy } from "@tabler/icons-react";
import * as Dialog from "@radix-ui/react-dialog";

import styles from "./dialog_invitation.module.scss";
import InputText from "@/shared/ui/inputs/input_text";
import Button from "@/shared/ui/button";
import { apiGroup } from "@/entities/group/model";
import { useAppSelector } from "@/shared/lib/hooks";
import settings from "@/shared/config";

export interface DialogInvitationProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DialogInvitation = ({ open, setOpen }: DialogInvitationProps) => {
  const groupId = useAppSelector((state) => state.group.id);
  const {
    data: invitationToken,
    isLoading,
  }: { data: string | undefined; isLoading: boolean } = apiGroup.getInviteToken(
    { groupId: groupId! },
    undefined,
    {
      enabled: !!groupId && open,
    }
  );

  if (!invitationToken && !isLoading) {
    return null;
  }

  const inviteLink = `${settings.NEXT_PUBLIC_FRONTEND_URL}/communication/join_group/${invitationToken}`;

  const handleCopy = async () => {
    if (!invitationToken && !isLoading) {
      return;
    }

    try {
      await navigator.clipboard.writeText(inviteLink);
    } catch (err) {
      console.error("Ошибка копирования:", err);
    }
  };

  return (
    <div className={styles.dialog_root}>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className={styles.dialog_overlay} />

          <div className={styles.dialog_content_layout}>
            <Dialog.Content
              className={styles.dialog_content}
              aria-describedby={undefined}
            >
              <div className={styles.title}>
                <Dialog.Title className={styles.title_text}>
                  Пригласить участника
                </Dialog.Title>
                <Dialog.Close asChild>
                  <div className="icon_box">
                    <IconPlus className={styles.title_icon} />
                  </div>
                </Dialog.Close>
              </div>

              <InputText
                placeholder=""
                classNameInput={styles.input}
                value={inviteLink}
                name="invite"
                readOnly
              />

              <div className={styles.buttons}>
                <Dialog.Close asChild>
                  <Button className={styles.button} styleType="invert">
                    Отмена
                  </Button>
                </Dialog.Close>
                <Dialog.Close asChild>
                  <Button onClick={handleCopy} className={styles.button}>
                    Копировать
                  </Button>
                </Dialog.Close>
              </div>
            </Dialog.Content>
          </div>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default DialogInvitation;
