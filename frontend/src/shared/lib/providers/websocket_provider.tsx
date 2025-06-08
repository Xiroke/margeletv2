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

type WebsocketEvent = "message";

interface SendDataI {
  event: WebsocketEvent;
  chat_id: string;
  data: any;
}
interface WebsocketProviderProps extends PropsWithChildren {}

interface IWSContext {
  send: (data: any) => void;
  onMessage: (data: any) => void;
  isConnected: boolean;
}

const WSContext = createContext<IWSContext | null>(null);

const WebsocketProvider = ({ children }: WebsocketProviderProps) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  // request acceess token
  const { mutateAsync } = apiAuth.postAccessToken();
  const onMessageFuncRef = useRef<(data: any) => void>((data: any) => {});

  const runWebsocket = async (): Promise<WebSocket> => {
    const data = await mutateAsync();
    const { access_token } = data as { access_token: string };
    const ws = new WebSocket(
      `${config.NEXT_PUBLIC_API_WS_URL}/api/messages/?access_token=${access_token}`
    );

    ws.onopen = () => {
      console.log("connect");
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      const data: SendDataI = JSON.parse(event.data);

      if (data.event != "message") {
        return;
      }

      onMessageFuncRef.current(data.data);
    };

    ws.onclose = () => {
      console.log("disconnect");
      setIsConnected(false);
    };
    return ws;
  };

  useEffect(() => {
    if (wsRef.current) {
      return;
    }

    let ws: WebSocket | null = null;

    const connect = async () => {
      ws = await runWebsocket();
      wsRef.current = ws;
    };

    connect();

    return () => {
      if (ws) {
        ws.close();
      }
      wsRef.current = null;
      setIsConnected(false);
    };
  }, []);

  const send = (data: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    } else if (!wsRef.current) {
      // restart websocket
      runWebsocket();
      if (wsRef.current!.readyState === WebSocket.OPEN) {
        wsRef.current!.send(JSON.stringify(data));
      }
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
    throw new Error("ws provider is not found");
  }

  return context;
};

export default WebsocketProvider;
