import { useMutation } from '@tanstack/react-query'
import { createContext, type PropsWithChildren, useContext, useEffect, useRef, useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'

import type { WsBaseEvent } from '@/shared/api/generated'
import type { IWSContext } from '@/shared/types/wsProvider'

import { excludedAuthCheckRoutes } from '@/config'
import { userQueryProps } from '@/entities/User/api'
import { useShouldIgnorePath } from '@/shared/hooks/useShouldIgnoredPath'
import { useWsLoading } from '@/shared/hooks/useWsLoading'

const WSContext = createContext<IWSContext | null>(null)

export const BoundedWs = ({ children }: PropsWithChildren) => {
  const isShouldIgnore = useShouldIgnorePath(excludedAuthCheckRoutes)
  return isShouldIgnore ? <>{children}</> : <WebsocketProvider>{children}</WebsocketProvider>
}

export const WebsocketProvider = ({ children }: PropsWithChildren) => {
  const [isTokenFetched, setIsTokenFetched] = useState(false)
  const [wsToken, setWsToken] = useState<null | string>(null)
  const wsTokenMut = useMutation(userQueryProps.wsTokenMut())

  useEffect(() => {
    if (isTokenFetched || wsTokenMut.isPending) return

    const fetchToken = async () => {
      try {
        const ws_token = await wsTokenMut.mutateAsync({ credentials: 'include' })
        setWsToken(ws_token)
        setIsTokenFetched(true)
      } catch (error) {
        console.error('Failed to fetch WS token', error)
      }
    }

    fetchToken()
  }, [isTokenFetched, wsTokenMut])

  const socketUrl = wsToken
    ? `${import.meta.env.VITE_BACKEND_WS_URL}/api/ws?ws_token=${wsToken}`
    : null

  const { lastMessage, readyState, sendMessage } = useWebSocket(socketUrl, {
    retryOnError: false,
    share: false,
    shouldReconnect: () => true,
  })

  useWsLoading(readyState === ReadyState.OPEN)

  const onMessageRef = useRef<(data: WsBaseEvent) => void>(null)
  const onMessage = (callback: (data: WsBaseEvent) => void) => {
    onMessageRef.current = callback
  }

  useEffect(() => {
    if (!lastMessage?.data || !onMessageRef.current) return

    try {
      const parsedData: WsBaseEvent = JSON.parse(lastMessage.data)
      onMessageRef.current(parsedData)
    } catch (error) {
      console.error('Failed to parse WebSocket message:', error)
    }
  }, [lastMessage])

  return (
    <WSContext.Provider
      value={{
        isConnected: readyState === ReadyState.OPEN,
        onMessage,
        send: sendMessage,
      }}
    >
      {children}
    </WSContext.Provider>
  )
}

export const useWS = () => {
  const context = useContext(WSContext)
  if (!context) {
    console.warn('WebsocketProvider not found')
    return {
      isConnected: false,
      onMessage: () => {},
      send: () => console.warn('WebSocket not available'),
    }
  }
  return context
}
