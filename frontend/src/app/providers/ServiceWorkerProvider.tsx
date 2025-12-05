import { useCallback, useEffect, useRef, useState } from 'react'

export const ServiceWorkerProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSWReady, setIsSWReady] = useState(false)
  // Храним ссылку на registration, чтобы иметь доступ к active worker
  const swRegistrationRef = useRef<null | ServiceWorkerRegistration>(null)

  // Функция для отправки домена
  const updateBackendDomainInSW = useCallback(async (newDomain: string) => {
    try {
      if (swRegistrationRef.current?.active) {
        swRegistrationRef.current.active.postMessage({
          domain: newDomain,
          type: 'UPDATE_BACKEND_DOMAIN',
        })
        console.log('Domain updated in SW:', newDomain)
      }
    } catch (error) {
      console.error('Failed to update domain in SW:', error)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      setIsSWReady(true)
      return
    }

    const initSW = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/service-worker.js')
        swRegistrationRef.current = registration
        console.log('Service Worker registered')

        await navigator.serviceWorker.ready
        console.log('Service Worker ready')

        // 1. Сразу отправляем текущий домен при старте
        const initialDomain = localStorage.getItem('backendDomain') || 'localhost'
        await updateBackendDomainInSW(initialDomain)

        setIsSWReady(true)
      } catch (err) {
        console.error('Service Worker init failed:', err)
        setIsSWReady(true)
      }
    }

    initSW()

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'backendDomain') {
        updateBackendDomainInSW(e.newValue || 'localhost')
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [updateBackendDomainInSW])

  if (!isSWReady) {
    return null
  }

  return <>{children}</>
}
