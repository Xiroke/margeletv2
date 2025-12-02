import { clsx } from 'clsx'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { useIntersectionObserver } from 'usehooks-ts'

import cls from './ChatMessagesLoader.module.scss'

interface ChatMessagesLoaderProps {
  className?: string
  isLoading: boolean
  onIntersect: () => void
}

export const ChatMessagesLoader = ({ className, isLoading, onIntersect }: ChatMessagesLoaderProps) => {
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 1,
  })

  useEffect(() => {
    if (isIntersecting && !isLoading) {
      onIntersect()
    }
  }, [isIntersecting])

  return (
    <div className={clsx(className)} ref={ref}>
      <Loader2 className={cls.animate_spin} size={24} />
    </div>
  )
}
