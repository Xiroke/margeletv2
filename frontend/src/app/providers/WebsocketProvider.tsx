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

  const fetchToken = async () => {
    if (isTokenFetched) return
    setIsTokenFetched(true)

    try {
      const ws_token = await wsTokenMut.mutateAsync({ credentials: 'include' })
      setWsToken(ws_token)
    } catch (error) {
      console.error('Failed to fetch WS token', error)
    } finally {
      setIsTokenFetched(false)
    }
  }

  const [interval, setInterval] = useState(1000)

  const getInterval = () => {
    const old = interval
    setInterval(old + old * 1.5)
    return old
  }

  useEffect(() => {
    if (!wsToken) {
      fetchToken()
    }
  }, [wsToken])

  const backendDomain = localStorage.getItem('backendDomain')

  const socketUrl = wsToken
    ? (backendDomain ? 'wss://' + backendDomain + `/api/ws?ws_token=${wsToken}` : `/api/ws?ws_token=${wsToken}`)
    : null

  const { lastMessage, readyState, sendMessage } = useWebSocket(socketUrl, {
    onClose: () => {
      setWsToken(null)
    },
    onError: () => {
      setWsToken(null)
    },
    reconnectInterval: getInterval,
    share: false,
    shouldReconnect: () => false,
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
