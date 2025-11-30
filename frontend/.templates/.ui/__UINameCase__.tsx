import { cn } from '@/shared/lib/utils'

interface __UINameCase__Props {
  className?: string
}

export const __UINameCase__ = ({ className }: __UINameCase__Props) => {
  return <div className={cn(className)}>test</div>
}
