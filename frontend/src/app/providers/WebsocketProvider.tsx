import { useMutation } from '@tanstack/react-query'
import { createContext, type PropsWithChildren, use, useEffect, useRef, useState } from 'react'

import type { WsEventCreate, WsEventRead } from '@/shared/api/generated'
import type { IWSContext } from '@/shared/types/wsProvider'

import { excludedAuthCheckRoutes, settings } from '@/config'
import { authQueryProps } from '@/features/auth/api'
import { useShouldIgnorePath } from '@/shared/hooks/useShouldIgnoredPath'
import { useWsLoading } from '@/shared/hooks/useWsLoading'

const WSContext = createContext<IWSContext | null>(null)

/**
 *
 * ws disabled on the specified paths
 */
export const BoundedWs = ({ children }: PropsWithChildren) => {
  const isShouldIgnore = useShouldIgnorePath(excludedAuthCheckRoutes)

  return (isShouldIgnore ? <>{children}</> : <WebsocketProvider>{children}</WebsocketProvider>)
}

export const WebsocketProvider = ({ children }: PropsWithChildren) => {
  const wsRef = useRef<null | WebSocket>(null)
  const [isConnected, setIsConnected] = useState(false)
  useWsLoading(isConnected)

  // request acceess token
  const tokenMut = useMutation(authQueryProps.tokenMut())
  const onMessageFuncRef = useRef<(data: any) => void>((data: any) => {})

  useEffect(() => {
    let ws: null | WebSocket = null

    const runWebsocket = async () => {
      const { access_token } = await tokenMut.mutateAsync({ credentials: 'include' })

      ws = new WebSocket(
        `${settings.VITE_BACKEND_WS_URL}/api/ws?access_token=${access_token}`,
      )

      ws.onopen = () => {
        console.log('connect')
        setIsConnected(true)
      }

      ws.onmessage = (event) => {
        const wsEvent: WsEventRead = JSON.parse(event.data)

        if (wsEvent.category != 'message') {
          return
        }

        onMessageFuncRef.current(wsEvent)
      }

      ws.onclose = () => {
        console.log('disconnect')
        setIsConnected(false)
      }

      wsRef.current?.close()

      wsRef.current = ws
    }

    runWebsocket()

    return () => {
      if (ws) {
        ws.close()
      }
      wsRef.current = null
    }
  }, [])

  const send = async (data: WsEventCreate) => {
    // if the wasync ebsocket is not connected, then launch it
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data))
    }
    else {
      console.warn('WebSocket is not connected')
    }
  }

  const onMessage = (callback: (data: WsEventRead) => void) => {
    // add listener on message,
    // use in your component in useEffect
    onMessageFuncRef.current = callback
  }

  return (
    <WSContext
      value={{
        isConnected,
        onMessage,
        send,
      }}
    >
      {children}
    </WSContext>
  )
}

export const useWS = () => {
  const context = use(WSContext)

  if (!context) {
    console.warn(
      'WebsocketProvider not found - returning dummy implementation',
    )
    return {
      isConnected: false,
      onMessage: () => {},
      send: () => console.warn('WebSocket not available'),
    }
  }

  return context
}
