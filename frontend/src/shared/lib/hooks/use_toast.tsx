import { useContext } from "react";
import { ToastContext } from "../providers/toast_provider";
import ToastStatus from "@/shared/ui/toast/toast";
import { stat } from "fs";

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};

export const useToastStatus = () => {
  const { showToast } = useToast();
  return (
    status: "success" | "error",
    title: string = "Уведомление",
    description: string
  ) =>
    showToast(
      <ToastStatus title={title} description={description} status={status} />
    );
};
