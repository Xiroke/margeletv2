import { memo } from 'react';

import { clsx } from 'clsx';

import type { FC } from 'react';
import cls from './ChatInput.module.scss';

interface ChatInputProps {
  className?: string;
}

/** Докстринг */
export const ChatInput: FC<ChatInputProps> = memo((props: ChatInputProps) => {
  const { className } = props;

  return <input className={clsx(cls.chat_input, className)} />;
});
