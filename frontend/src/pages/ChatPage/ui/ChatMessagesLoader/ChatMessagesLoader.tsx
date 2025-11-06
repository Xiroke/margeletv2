import type { FC } from 'react'

import { clsx } from 'clsx'
import { Loader2 } from 'lucide-react'
import { memo, useEffect } from 'react'
import { useIntersectionObserver } from 'usehooks-ts'

import cls from './ChatMessagesLoader.module.scss'

interface ChatMessagesLoaderProps {
  className?: string
  onIntersect: () => void
}

export const ChatMessagesLoader: FC<ChatMessagesLoaderProps> = memo(
  (props: ChatMessagesLoaderProps) => {
    const { className, onIntersect } = props
    const { isIntersecting, ref } = useIntersectionObserver({
      threshold: 1,
    })

    useEffect(() => {
      if (isIntersecting) {
        onIntersect()
      }
    }, [isIntersecting])
    return (
      <div className={clsx(cls.chat_messages_loader, className)} ref={ref}>
        <Loader2 className={cls.animate_spin} size={24} />
      </div>
    )
  },
)
