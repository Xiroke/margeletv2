// ServiceWorkerProvider.tsx
import { useEffect, useState } from 'react'

import { settings } from '@/config'

export const ServiceWorkerProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSWReady, setIsSWReady] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      setIsSWReady(true)
      return
    }

    const initSW = async () => {
      try {
        await navigator.serviceWorker.register('/service-worker.js')
        console.log('Service Worker registered')

        const registration = await navigator.serviceWorker.ready
        console.log('Service Worker ready')

        if (registration.active) {
          console.log('Backend_url' + settings.VITE_BACKEND_URL)
          registration.active.postMessage({
            payload: {
              ALLOWED_CACHED_PATHS: [],
              BACKEND_URL: settings.VITE_BACKEND_URL,
            },
            type: 'SET_PARAMS',
          })
        }

        setIsSWReady(true)
      } catch (err) {
        console.error('Service Worker init failed:', err)
        setIsSWReady(true)
      }
    }

    initSW()
  }, [])

  if (!isSWReady) {
    return null
  }

  return <>{children}</>
}
