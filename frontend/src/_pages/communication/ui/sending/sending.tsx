import { HTMLAttributes, RefObject, forwardRef, useState } from "react";

import styles from "./sending.module.scss";
import stylesInput from "@/shared/ui/inputs/input_text/input_text.module.scss";
import clsx from "clsx";
import { IconSend2 } from "@tabler/icons-react";

export interface SendingProps extends HTMLAttributes<HTMLInputElement> {
  onClick?: () => void;
}

export const Sending = forwardRef<HTMLInputElement, SendingProps>(
  ({ onKeyDown, onClick }, ref) => {
    const [hasText, setHasText] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasText(e.target.value.trim().length > 0);
    };

    return (
      <div className={styles.sending_wrapper}>
        <input
          ref={ref}
          name="send_message"
          placeholder="Введите сообщение..."
          className={clsx(stylesInput.input_text, styles.sending_input)}
          onKeyDown={onKeyDown}
          onChange={handleChange}
          autoComplete="off"
        />
        {hasText && (
          <button
            type="submit"
            className={styles.send_button}
            onClick={onClick}
          >
            <IconSend2 size={32} stroke={1.6} color="#adadad" />
          </button>
        )}
      </div>
    );
  }
);

export default Sending;
