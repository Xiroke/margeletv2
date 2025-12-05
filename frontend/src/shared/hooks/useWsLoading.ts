import { useLocation } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'

import { getIsExcluded } from '@/config'

export const useWsLoading = (isConnected: boolean) => {
  const location = useLocation()
  const loadingToastRef = useRef<number | string | undefined>(undefined)

  useEffect(() => {
    const isExcluded = getIsExcluded(location.pathname)

    if (isConnected || isExcluded) {
      if (loadingToastRef.current !== undefined) {
        toast.dismiss(loadingToastRef.current)
        loadingToastRef.current = undefined
      }
      return
    }

    if (!isConnected && !isExcluded && loadingToastRef.current === undefined) {
      loadingToastRef.current = toast.loading('Connecting to server...')
    }
  }, [isConnected, location.pathname])
}
