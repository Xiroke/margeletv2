import { clsx } from "clsx";
import { forwardRef, memo } from "react";

import type { ForwardedRef, InputHTMLAttributes } from "react";
import cls from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  error?: string;
  isFull?: boolean;
}

/** Универсальный Input */
const InputComponent = (
  props: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const { className, label, error, isFull = false, ...rest } = props;

  return (
    <div className={clsx(cls.wrapper, isFull && cls.full, className)} ref={ref}>
      {label && <label className={cls.label}>{label}</label>}
      <input
        {...rest}
        className={clsx(cls.input, error && cls.error, className)}
      />
      {error && <span className={cls.errorMessage}>{error}</span>}
    </div>
  );
};

export const Input = memo(forwardRef(InputComponent));
