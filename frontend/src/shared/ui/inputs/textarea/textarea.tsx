import { forwardRef, RefObject, TextareaHTMLAttributes } from 'react';
import clsx from 'clsx';

import styles from './textarea.module.scss';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  labelText?: string;
  placeholder: string;
  name: string;
  classNameInput?: string;
  ref?: RefObject<HTMLTextAreaElement>;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ labelText, placeholder, classNameInput, className, name, onKeyDown }, ref) => {
    return (
      <div className={clsx(styles.textarea, className)}>
        {labelText && <label>{labelText}</label>}
        <textarea
          ref={ref}
          name={name}
          className={clsx(styles.textarea_input, classNameInput)}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
        />
      </div>
    );
  },
);
export default Textarea;
