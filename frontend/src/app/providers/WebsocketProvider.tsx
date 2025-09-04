import { createContext, useContext, useEffect, useRef, useState } from 'react';

import { settings } from '@/config';
import { authQueryProps } from '@/features/auth/api';
import type { WsInDataSchema, WsOutDataSchema } from '@/shared/api/generated';
import { useMutation } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';

type WsEvent = 'message';

interface SendDataI {
  event: WsEvent;
  data: any;
}
interface WebsocketProviderProps extends PropsWithChildren {}

interface IWSContext {
  send: (data: WsInDataSchema) => void;
  onMessage: (callback: (data: WsOutDataSchema) => void) => void;
  isConnected: boolean;
}

const WSContext = createContext<IWSContext | null>(null);

export const WebsocketProvider = ({ children }: WebsocketProviderProps) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // request acceess token
  const tokenMut = useMutation(authQueryProps.tokenMut());
  const onMessageFuncRef = useRef<(data: any) => void>((data: any) => {});

  useEffect(() => {
    let ws: WebSocket | null = null;

    const runWebsocket = async () => {
      const token_data = await tokenMut.mutateAsync({ credentials: 'include' });
      const { access_token } = token_data;
      ws = new WebSocket(
        `${settings.VITE_BACKEND_WS_URL}/api/ws?access_token=${access_token}`,
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
    <WSContext.Provider
      value={{
        send,
        onMessage,
        isConnected,
      }}
    >
      {children}
    </WSContext.Provider>
  );
};

export const useWS = () => {
  const context = useContext(WSContext);

  if (!context) {
    throw new Error('ws provider is not found');
  }

  return context;
};
