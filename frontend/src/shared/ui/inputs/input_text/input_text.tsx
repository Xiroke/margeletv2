import { InputHTMLAttributes, RefObject, forwardRef } from 'react';
import clsx from 'clsx';

import styles from './input_text.module.scss';

export interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  placeholder: string;
  name: string;
  type?: string;
  classNameInput?: string;
  ref?: RefObject<HTMLInputElement>;
}

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  ({ labelText, placeholder, classNameInput, className, name, type, onKeyDown }, ref) => {
    return (
      <div className={clsx(styles.input, className)}>
        {labelText && <label>{labelText}</label>}
        <input
          ref={ref}
          type={type}
          name={name}
          className={clsx(styles.input_text, classNameInput)}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
        />
      </div>
    );
  },
);

export default InputText;
