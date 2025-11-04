import { ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

import styles from "./button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "invert";
  size?: "small" | "medium" | "large" | "full";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className, variant = "default", size = "medium", ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        {...props}
        className={clsx(
          styles.button,
          styles[size],
          styles[variant],
          className
        )}
      >
        {children}
      </button>
    );
  }
);

export default Button;
