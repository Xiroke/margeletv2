import { HTMLAttributes, MouseEventHandler, useRef, useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import * as Dialog from "@radix-ui/react-dialog";

import styles from "./dialog_create_chat.module.scss";
import InputText from "@/shared/ui/inputs/input_text";
import Button from "@/shared/ui/button";
import { on } from "events";

export interface DialogCreateChatProps extends HTMLAttributes<HTMLDivElement> {
  onClickHandler: (value: string) => void;
}

export const DialogCreateChat = ({
  children,
  onClickHandler,
}: DialogCreateChatProps) => {
  const inputValueRef = useRef<HTMLInputElement>(null);

  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!inputValueRef.current?.value) {
      return;
    }

    onClickHandler(inputValueRef.current.value);
  };

  return (
    <div className={styles.dialog_root}>
      <Dialog.Root>
        <Dialog.Trigger asChild={true}>{children}</Dialog.Trigger>
        <div className={styles.dialog_content_layout}>
          <Dialog.Content className={styles.dialog_content}>
            <div className={styles.title}>
              <Dialog.Title className={styles.title_text}>
                Создание чата
              </Dialog.Title>
              <Dialog.Description />
            </div>
            <InputText
              ref={inputValueRef}
              classNameInput={styles.input}
              placeholder="Введите название..."
              name="chat"
            />
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <div className={styles.buttons}>
                <Dialog.Close asChild={true}>
                  <Button className={styles.button} styleType="invert">
                    Отмена
                  </Button>
                </Dialog.Close>
                <Dialog.Close asChild={true}>
                  <Button onClick={onClick} className={styles.button}>
                    Создать
                  </Button>
                </Dialog.Close>
              </div>
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Root>
    </div>
  );
};

export default DialogCreateChat;
