import { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

import styles from './input_text.module.scss';

export interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  placeholder: string;
  name: string;
  type?: string;
  classNameInput?: string;
}

export const InputText = (
  { labelText, placeholder, classNameInput, className, name, type }: InputTextProps,
  ...props: any
) => {
  return (
    <div className={clsx(styles.input, className)}>
      {labelText && <label>{labelText}</label>}
      <input
        type={type}
        name={name}
        className={clsx(styles.input_text, classNameInput)}
        placeholder={placeholder}
        {...props}></input>
    </div>
  );
};

export default InputText;
