import { useEffect, useState } from 'react'

const STORAGE_KEY = 'backendDomain'
const DEFAULT_DOMAIN = 'localhost'

export function useBackendConfig() {
  const [backendDomain, setBackendDomain] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    setBackendDomain(saved || DEFAULT_DOMAIN)
  }, [])

  const updateBackendDomain = (newDomain: string) => {
    const domain = newDomain.trim()
    setBackendDomain(domain)
    localStorage.setItem(STORAGE_KEY, domain)

    // Отправляем сообщение в Service Worker
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        domain: domain,
        type: 'UPDATE_BACKEND_DOMAIN',
      })
    }
  }

  return { backendDomain, setBackendDomain: updateBackendDomain }
}
