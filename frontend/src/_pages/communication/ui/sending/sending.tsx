import { HTMLAttributes, RefObject, forwardRef } from 'react';

import styles from './sending.module.scss';
import InputText from '@/shared/ui/inputs/input_text';

export interface SendingProps extends HTMLAttributes<HTMLInputElement> {}

export const Sending = forwardRef<HTMLInputElement, SendingProps>(({ onKeyDown }, ref) => {
  return (
    <InputText
      ref={ref}
      name="send_message"
      placeholder="Введите сообщение..."
      classNameInput={styles.sending_input}
      onKeyDown={onKeyDown}
    />
  );
});

export default Sending;
