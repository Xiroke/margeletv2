import { clsx } from 'clsx';
import { SendIcon } from 'lucide-react';
import type { FC, TextareaHTMLAttributes } from 'react';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import cls from './ChatInput.module.scss';

interface ChatInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  wrapperClassName?: string;
  maxRows?: number;
  onSend?: (value: string) => void;
}

/** Компонент текстового поля с авто-расширением и кнопкой отправки */
export const ChatInput: FC<ChatInputProps> = memo((props: ChatInputProps) => {
  const {
    className,
    wrapperClassName,
    maxRows = 4,
    onSend,
    onChange,
    value,
    ...rest
  } = props;

  const [inputValue, setInputValue] = useState<string>(value as string);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Функция для автоматической регулировки высоты
  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Сбрасываем высоту для получения актуального scrollHeight
    textarea.style.height = 'auto';

    // Вычисляем новую высоту
    const scrollHeight = textarea.scrollHeight;
    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight) || 20;
    const maxHeight = lineHeight * maxRows;

    // Устанавливаем высоту с ограничением по maxRows
    textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
  }, [maxRows]);

  // Обновляем высоту при изменении значения
  useEffect(() => {
    adjustHeight();
  }, [value, adjustHeight]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    adjustHeight();
    setInputValue(e.currentTarget.value);
    onChange?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend?.(inputValue);
    }
  };

  const handleSendClick = () => {
    onSend?.(inputValue);
  };

  return (
    <div className={clsx(cls.input_wrapper, wrapperClassName)}>
      <textarea
        ref={textareaRef}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={clsx(cls.chat_input, className)}
        rows={1}
        {...rest}
      />
      {inputValue && (
        <SendIcon
          size={24}
          strokeWidth={1.6}
          className={cls.send_icon}
          onClick={handleSendClick}
        />
      )}
    </div>
  );
});
