import { useEffect, useRef } from 'react'
import { toast } from 'sonner'

export const useWsLoading = (isConnected: boolean) => {
  const loadingToastRef = useRef<number | string | undefined>(undefined)

  useEffect(() => {
    if (!isConnected && !loadingToastRef.current) {
      loadingToastRef.current = toast.loading('Connecting to server...')
      return
    }

    if (isConnected) {
      toast.dismiss(loadingToastRef.current)
      loadingToastRef.current = undefined
    }
  }, [isConnected])
}
