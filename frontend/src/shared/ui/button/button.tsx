import { ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

import styles from "./button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  styleType?: "default" | "invert";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, styleType = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={clsx(
          styleType == "invert" ? styles.invert_button : styles.button,
          className
        )}
      >
        {children}
      </button>
    );
  }
);

export default Button;
