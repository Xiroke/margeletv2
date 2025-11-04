import type { PropsWithChildren } from 'react';

import { useMutation } from '@tanstack/react-query';
import { createContext, use, useEffect, useRef, useState } from 'react';

import type { WsInDataSchema, WsOutDataSchema } from '@/shared/api/generated';

import { settings, wsIgnorePaths } from '@/config';
import { authQueryProps } from '@/features/auth/api';
import { useShouldIgnorePath } from '@/shared/hooks/useShouldIgnoredPath';

interface IWSContext {
  isConnected: boolean;
  onMessage: (callback: (data: WsOutDataSchema) => void) => void;
  send: (data: WsInDataSchema) => void;
}

interface SendDataI {
  data: any;
  event: WsEvent;
}
interface WebsocketProviderProps extends PropsWithChildren {}

type WsEvent = 'message';

const WSContext = createContext<IWSContext | null>(null);

export const WebsocketProvider = ({ children }: WebsocketProviderProps) => {
  const isShouldIgnore = useShouldIgnorePath(wsIgnorePaths);

  if (isShouldIgnore) return <>{children}</>;

  const wsRef = useRef<null | WebSocket>(null);
  const [isConnected, setIsConnected] = useState(false);

  // request acceess token
  const tokenMut = useMutation(authQueryProps.tokenMut());
  const onMessageFuncRef = useRef<(data: any) => void>((data: any) => {});

  useEffect(() => {
    let ws: null | WebSocket = null;

    const runWebsocket = async () => {
      const token_data = await tokenMut.mutateAsync({ credentials: 'include' });
      const { access_token } = token_data;
      ws = new WebSocket(
        `${settings.VITE_BACKEND_WS_URL}/api/ws?access_token=${access_token}`
      );

      ws.onopen = () => {
        console.log('connect');
        setIsConnected(true);
      };

      ws.onmessage = (event) => {
        const data: WsOutDataSchema = JSON.parse(event.data);

        if (data.event != 'message') {
          return;
        }

        onMessageFuncRef.current(data);
      };

      ws.onclose = () => {
        console.log('disconnect');
        setIsConnected(false);
      };

      if (wsRef.current) {
        wsRef.current.close();
      }

      wsRef.current = ws;
    };

    runWebsocket();

    return () => {
      if (ws) {
        ws.close();
      }
      wsRef.current = null;
    };
  }, []);

  const send = async (data: WsInDataSchema) => {
    // if the wasync ebsocket is not connected, then launch it
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    } else {
      console.warn('WebSocket is not connected');
    }
  };

  const onMessage = (callback: (data: WsOutDataSchema) => void) => {
    // add listener on message,
    // use in your component in useEffect
    onMessageFuncRef.current = callback;
  };

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
  );
};

export const useWS = () => {
  const context = use(WSContext);

  if (!context) {
    console.warn(
      'WebsocketProvider not found - returning dummy implementation'
    );
    return {
      isConnected: false,
      onMessage: () => {},
      send: () => console.warn('WebSocket not available'),
    };
  }

  return context;
};
