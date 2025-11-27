import type { ReactNode } from 'react'

import { useLocation } from '@tanstack/react-router'
import { HotkeysProvider } from 'react-hotkeys-hook'

import { BoundedWs } from './WebsocketProvider'

const disabledPathnameWs = ['/', '/registration']

export const AllProviders = (props: { children: ReactNode | undefined }) => {
  const { children = null } = props
  const location = useLocation()

  const isDisabledWs = disabledPathnameWs.some(i => location.pathname === i)

  return (
    <HotkeysProvider initiallyActiveScopes={['settings']}>
      {isDisabledWs
        ? (
            <>{children}</>
          )
        : (
            <BoundedWs>{children}</BoundedWs>
          )}
    </HotkeysProvider>
  )
}
