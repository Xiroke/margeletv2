import { memo } from 'react';

import { clsx } from 'clsx';

import type { FC, InputHTMLAttributes } from 'react';
import cls from './ChatInput.module.scss';

interface ChatInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

/** Докстринг */
export const ChatInput: FC<ChatInputProps> = memo((props: ChatInputProps) => {
  const { className, ...rest } = props;

  return <input {...rest} className={clsx(cls.chat_input, className)} />;
});
