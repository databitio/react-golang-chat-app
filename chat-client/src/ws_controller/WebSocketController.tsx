import { ServerState } from "../context/ServerContext";

export interface WsMessage {
  event: string;
  status: number;
  body: any;
}

export const SendWsMessage = (
  event: string,
  body: any,
  socket: ServerState
) => {
  const wsMessage: WsMessage = {
    event: event,
    status: -1,
    body: body,
  };
  const json = JSON.stringify(wsMessage);
  socket.conn.send(json);
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const WsController = (socket: ServerState) => {
  socket.conn.onmessage = () => {};

  socket.conn.onclose = async (e) => {
    await delay(5000);
    Reconnect(socket);
  };
};
export const Reconnect = (socket: ServerState) => {
  socket?.setConnected(false);
};
