import type { Message } from "../types/message";

interface Props {
  message: Message;
}

export default function MessageBubble({ message }: Props) {
  return (
    <div
      className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${message.type === "outcoming" ? "self-end bg-blue-500 text-white" : "self-start bg-gray-100"}`}
    >
      {message.text}
    </div>
  );
}
