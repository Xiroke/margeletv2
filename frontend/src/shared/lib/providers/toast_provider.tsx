import React, { createContext, useState, ReactNode } from "react";
import * as Toast from "@radix-ui/react-toast";

import styles from "./toast_provider.module.scss";

type ToastContextType = {
  showToast: (toastRoot: ReactNode) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toastRoot, setToastRoot] = useState<ReactNode | null>(null);
  const [open, setOpen] = useState(false);

  const showToast = (toastRoot: ReactNode) => {
    // need for force update
    const withKey = React.cloneElement(toastRoot as React.ReactElement, {
      key: Date.now(),
    });
    setToastRoot(withKey);
    setOpen(true);
  };
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <Toast.Provider swipeDirection="right">
        {toastRoot}
        <Toast.Viewport className={styles.toast_viewport} />
      </Toast.Provider>
    </ToastContext.Provider>
  );
};
