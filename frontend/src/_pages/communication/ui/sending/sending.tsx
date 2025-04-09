import { HTMLAttributes } from 'react';

import styles from './sending.module.scss';
import InputText from '@/shared/ui/inputs/input_text';

export interface SendingProps extends HTMLAttributes<HTMLDivElement> {}

export const Sending = ({}: SendingProps) => {
  return (
    <InputText
      name="send_message"
      placeholder="Введите сообщение..."
      classNameInput={styles.sending_input}
    />
  );
};

export default Sending;
