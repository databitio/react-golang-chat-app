import { createContext, useState, useEffect } from "react";
import { User } from "./UserContext";

export interface ServerState {
  users: User[];
  setUsers: (users: User[]) => void;
  connected: boolean;
  setConnected: (connected: boolean) => void;
  conn: WebSocket;
  setConn: (conn: WebSocket) => void;
}

export const ServerContext = createContext<ServerState>({} as ServerState);

export const ServerProvider = (props: any) => {
  const { children } = props;
  const [users, setUsers] = useState<User[]>([]);
  const [connected, setConnected] = useState<boolean>(false);
  const [conn, setConn] = useState<WebSocket>({} as WebSocket);

  useEffect(() => {
    if (connected === false) {
      setConn(new WebSocket("ws://localhost:8080/ws"));
    }
    setConnected(true);
  }, [connected]);

  return (
    <ServerContext.Provider
      value={{ users, setUsers, connected, setConnected, conn, setConn }}
    >
      {children}
    </ServerContext.Provider>
  );
};

export default ServerContext;
