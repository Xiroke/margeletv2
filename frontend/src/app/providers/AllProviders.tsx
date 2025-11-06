import type { ReactNode } from 'react'

import { ServiceWorkerProvider } from './ServiceWorkerProvider'
import { BoundedWs } from './WebsocketProvider'

const disabledPathnameWs = ['/', '/registration']

export const AllProviders = (props: { children: ReactNode | undefined }) => {
  const { children = null } = props
  const pathname = window.location.pathname

  const isDisabledWs = disabledPathnameWs.some(i => pathname === i)

  return (
    <ServiceWorkerProvider>
      {isDisabledWs
        ? (
            <>{children}</>
          )
        : (
            <BoundedWs>{children}</BoundedWs>
          )}
    </ServiceWorkerProvider>
  )
}
