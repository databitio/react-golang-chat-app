import { useState } from "react";
import useCredentials from "../hooks/useCredentials";
import MessageComponent from "./MessageComponent";
import "./Chat.css";

export interface Message {
  username: string;
  content: string;
  time_entered: Date;
  color: number;
}

const ChatMain = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const credentials = useCredentials();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const new_message: Message = {
      username: credentials?.username,
      content: inputMessage,
      time_entered: new Date(),
      color: credentials?.color,
    };

    setMessages([...messages, new_message]);
    setInputMessage("");
  };

  return (
    <main className="chat">
      <section className="chat-view">
        {messages
          .slice(0)
          .reverse()
          .map((message, index) => (
            <div key={index}>
              <MessageComponent message={message} />
            </div>
          ))}
      </section>

      <form onSubmit={handleSubmit} className="chat-input-box">
        <textarea
          className="chat-input"
          placeholder="Send a message"
          onChange={(e) => {
            setInputMessage(e.target.value);
          }}
          value={inputMessage}
          spellCheck="false"
        />
        <button type="submit" className="submit-button">
          Send
        </button>
      </form>
    </main>
  );
};

export default ChatMain;
