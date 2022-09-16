import { createContext, useState, useEffect } from "react";
import { User } from "./UserContext";
import { Message } from "../chat/ChatMain";
import { WsController } from "../ws_controller/WebSocketController";

export interface GlobalState {
  users: string[];
  setUsers: (users: string[]) => void;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  connected: boolean;
  setConnected: (connected: boolean) => void;
  conn: WebSocket;
  setConn: (conn: WebSocket) => void;
}

export const ServerContext = createContext<GlobalState>({} as GlobalState);

export const ServerProvider = (props: any) => {
  const { children } = props;
  const [users, setUsers] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [connected, setConnected] = useState<boolean>(false);
  const [conn, setConn] = useState<WebSocket>({} as WebSocket);

  const global: GlobalState = {
    users: users,
    setUsers: setUsers,
    messages: messages,
    setMessages: setMessages,
    connected: connected,
    setConnected: setConnected,
    conn: conn,
    setConn: setConn,
  };
  WsController(global);

  useEffect(() => {
    if (connected === false) {
      setConn(new WebSocket("ws://localhost:8080/ws"));
    }
    setConnected(true);
  }, [connected]);

  return (
    <ServerContext.Provider value={global}>{children}</ServerContext.Provider>
  );
};

export default ServerContext;
