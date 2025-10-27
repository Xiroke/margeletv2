import { memo } from "react";

import { clsx } from "clsx";

import type { ButtonHTMLAttributes, FC, ReactNode } from "react";
import cls from "./Button.module.scss";
import { Loading } from "../Loading";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  styleType?: "none" | "default" | "text" | "outline" | "inverse";
  size: "nosize" | "sm" | "md";
  loading?: boolean;
  isFull?: boolean;
  children?: ReactNode;
}

/** Докстринг */
export const Button: FC<ButtonProps> = memo((props: ButtonProps) => {
  const {
    className,
    size,
    styleType = "text",
    loading = false,
    isFull = false,
    children = "",
    ...rest
  } = props;

  return (
    <button
      {...rest}
      className={clsx(
        cls.button,
        cls[styleType],
        cls[size],
        isFull && cls.full,
        className
      )}
    >
      {loading ? <Loading /> : children}
    </button>
  );
});
