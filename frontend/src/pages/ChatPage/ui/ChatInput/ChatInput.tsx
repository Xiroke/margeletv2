import type { FC, TextareaHTMLAttributes } from 'react';

import { SendIcon } from 'lucide-react';
import { memo, useState } from 'react';

import { cn } from '@/shared/lib/utils';
import { InputGroup, InputGroupAddon, InputGroupTextarea } from '@/shared/ui/input-group';

interface ChatInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  onSend?: (value: string) => void;
}

export const ChatInput: FC<ChatInputProps> = memo((props: ChatInputProps) => {
  const {
    className,
    onSend,
  } = props;

  const [inputValue, setInputValue] = useState<string>('');

  // shift + enter - moving text to a new line
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && inputValue.trim()) {
      e.preventDefault(); // prevent new line
      onSend?.(inputValue);
      setInputValue('');
    }
  };

  // When the send button is pressed
  const handleSendClick = () => {
    onSend?.(inputValue);
    setInputValue('');
  };

  return (
    <InputGroup className={cn('px-2', className)}>
      <InputGroupTextarea className='min-h-12 py-3 text-base!' onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} placeholder='Enter the message' value={inputValue}/>
      <InputGroupAddon align='inline-end' className='cursor-pointer' onClick={handleSendClick}>
        <SendIcon className='size-5'/>
      </InputGroupAddon>
    </InputGroup>
  );
});
