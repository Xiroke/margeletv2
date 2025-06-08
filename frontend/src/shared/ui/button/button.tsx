import { ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

import styles from "./button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  styleType?: "default" | "invert";
  size?: "small" | "medium" | "large";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className, styleType = "default", size = "medium", ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        {...props}
        className={clsx(
          styles.button,
          styles[size],
          styles[styleType],
          className
        )}
      >
        {children}
      </button>
    );
  }
);

export default Button;
