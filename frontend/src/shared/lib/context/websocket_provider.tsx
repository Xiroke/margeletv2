import {
  useEffect,
  PropsWithChildren,
  createContext,
  useRef,
  useContext,
  useState,
} from "react";

import config from "@/shared/config";
import { apiAuth } from "@/features/auth/model";
import { useRouter } from "next/navigation";

interface WebsocketProviderProps extends PropsWithChildren {}

interface ITokenData {
  data:
    | {
        access_token: string;
      }
    | undefined;
  isLoading: boolean;
  isError: boolean;
}

interface IWSContext {
  send: (data: any) => void;
  onMessage: (data: any) => void;
  isConnected: boolean;
}

const WSContext = createContext<IWSContext | null>(null);

const WebsocketProvider = ({ children }: WebsocketProviderProps) => {
  const router = useRouter();
  const wsRef = useRef<WebSocket | null>(null);
  const {
    data: tokenData,
    isLoading,
    isError,
  }: ITokenData = apiAuth.getAccessToken(undefined, { retry: false });
  const onMessageFuncRef = useRef<(data: any) => void>((data: any) => {});

  useEffect(() => {
    if (isError) {
      router.push("/");
    }

    if (wsRef.current || isLoading || isError || !tokenData) {
      console.log(wsRef);
      return;
    }

    const ws = new WebSocket(
      `${config.NEXT_PUBLIC_API_WS_URL}/api/messages/?access_token=${tokenData.access_token}`
    );
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("connect");
    };

    ws.onmessage = (event) => {
      onMessageFuncRef.current(JSON.parse(event.data));
    };

    ws.onclose = () => {
      console.log("disconnect");
    };

    return () => {
      ws.close();
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
        console.log("WebSocket closed");
      }
    };
  }, [isLoading, tokenData]);

  const send = (data: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    } else {
      console.warn("websocket not open");
    }
  };

  const onMessage = (callback: (data: any) => void) => {
    // add listener on message,
    // use in your component in useEffect
    onMessageFuncRef.current = callback;
  };

  return (
    <WSContext.Provider
      value={{
        send,
        onMessage,
        isConnected: wsRef.current?.readyState === WebSocket.OPEN,
      }}
    >
      {children}
    </WSContext.Provider>
  );
};

export const useWS = () => {
  const context = useContext(WSContext);

  if (!context) {
    throw new Error("ws provider is not found");
  }

  return context;
};

export default WebsocketProvider;
