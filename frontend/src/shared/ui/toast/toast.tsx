import { HTMLAttributes } from "react";

import * as Toast from "@radix-ui/react-toast";

import styles from "./toast.module.scss";
import clsx from "clsx";

export interface ToastStatusProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  status: "success" | "error";
}

const ToastStatus = ({ title, description, status }: ToastStatusProps) => {
  return (
    <Toast.Root
      className={clsx(
        styles.toast_root,
        status == "success" ? styles.toast_success : styles.toast_error
      )}
      duration={3500}
    >
      <Toast.Title className={styles.toast_title}>{title}</Toast.Title>
      <Toast.Description className={styles.toast_description}>
        {description}
      </Toast.Description>
      <Toast.Close className={styles.toast_close} aria-label="Close">
        ✕
      </Toast.Close>
    </Toast.Root>
  );
};

export default ToastStatus;
