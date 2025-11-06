import type { FC } from 'react'

import { useRouter } from '@tanstack/react-router'
import { clsx } from 'clsx'
import { ArrowLeftIcon } from 'lucide-react'
import { memo } from 'react'

import { Button } from '../button'

interface BackButtonProps {
  className?: string
}

export const BackButton: FC<BackButtonProps> = memo(
  (props: BackButtonProps) => {
    const { className } = props
    const router = useRouter()

    return (
      <Button className={clsx(className, 'top-10 left-15 absolute')} onClick={() => router.history.back()} type="button" variant="outline">
        <ArrowLeftIcon />
        {' '}
        Back
      </Button>
    )
  },
)
