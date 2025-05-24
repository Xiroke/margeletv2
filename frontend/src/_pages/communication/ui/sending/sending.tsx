import { HTMLAttributes, RefObject, forwardRef } from "react";

import styles from "./sending.module.scss";
import stylesInput from "@/shared/ui/inputs/input_text/input_text.module.scss";
import clsx from "clsx";

export interface SendingProps extends HTMLAttributes<HTMLInputElement> {}

export const Sending = forwardRef<HTMLInputElement, SendingProps>(
  ({ onKeyDown }, ref) => {
    return (
      <input
        ref={ref}
        name="send_message"
        placeholder="Введите сообщение..."
        className={clsx(stylesInput.input_text, styles.sending_input)}
        onKeyDown={onKeyDown}
      />
    );
  }
);

export default Sending;
