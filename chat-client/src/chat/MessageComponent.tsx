import { colorArray } from "../context/UserContext";
import { Message } from "./ChatMain";
import { FormatTime } from "../utils/FormatTime";

const MessageComponent = (props: { message: Message }) => {
  const { message } = props;
  const timeEntered = FormatTime(message?.time_entered);

  return (
    <section className="chat-message">
      <span className="chat-time-entered">{timeEntered}</span>
      <span
        style={{
          color:
            typeof message?.color === "undefined"
              ? colorArray[Math.floor(Math.random() * colorArray?.length)]
              : colorArray[message?.color],
        }}
      >
        {`${message?.username} `}
      </span>
      <span className="message-content">{`${message?.content}`}</span>
    </section>
  );
};

export default MessageComponent;
