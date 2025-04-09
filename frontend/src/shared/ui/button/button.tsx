import { ButtonHTMLAttributes } from 'react';

import styles from './button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({ children }: ButtonProps, ...props: any) => {
  return (
    <button {...props} className={styles['button']}>
      {children}
    </button>
  );
};

export default Button;
