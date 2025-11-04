import type {
  ForwardedRef,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';

import { clsx } from 'clsx';
import { forwardRef, memo } from 'react';

import cls from './Input.module.scss';

interface BaseProps {
  as?: 'input' | 'textarea';
  className?: string;
  error?: string;
  full?: boolean;
  label?: string;
}

type InputProps = BaseProps &
  (
    | InputHTMLAttributes<HTMLInputElement>
    | TextareaHTMLAttributes<HTMLTextAreaElement>
  );

const InputComponent = (
  props: InputProps,
  ref: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>
) => {
  const {
    as = 'input',
    className,
    error,
    full = false,
    label,
    ...rest
  } = props;

  const Component = as === 'textarea' ? 'textarea' : 'input';

  return (
    <div className={clsx(cls.wrapper, full && cls.full, className)}>
      {label && <label className={cls.label}>{label}</label>}
      <Component
        {...(rest as any)}
        className={clsx(cls.component, cls[as], error && cls.error, className)}
        ref={ref as any}
      />
      {error && <span className={cls.errorMessage}>{error}</span>}
    </div>
  );
};

export const Input = memo(forwardRef(InputComponent));
