import { Message } from "../chat/ChatMain";
import { GlobalState } from "../context/ServerContext";
import { User } from "../context/UserContext";

export interface WsMessage {
  event: string;
  status: number;
  body: any;
}

export const SendWsMessage = (
  event: string,
  body: any,
  global: GlobalState
) => {
  const wsMessage: WsMessage = {
    event: event,
    status: -1,
    body: body,
  };
  const json = JSON.stringify(wsMessage);
  global.conn.send(json);
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const WsController = async (global: GlobalState) => {
  global.conn.onmessage = (event) => {
    const wsMessage: WsMessage = JSON.parse(event.data);
    console.log("message body!: ", wsMessage.body);
    if (wsMessage.status < 400) {
      switch (wsMessage.event) {
        case "write-message":
          global.setMessages([...global.messages, wsMessage.body]);
          break;
        case "users-online":
          if (wsMessage.body === "") {
            break;
          }
          global.setUsers([...wsMessage.body]);
          break;
        default:
          break;
      }
    }
  };

  global.conn.onopen = () => {
    SendWsMessage("users-online", "", global);
  };

  global.conn.onclose = async () => {
    await delay(5000);
    Reconnect(global);
  };
};

export const Reconnect = (global: GlobalState) => {
  global?.setConnected(false);
};
