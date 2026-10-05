import type { Message } from "../types/message";

interface Props {
  message: Message;
}

export default function MessageBubble({ message }: Props) {
  const isOutcoming = message.type === "outcoming";

  return (
    <div
      className={`max-w-[75%] px-4 py-2 rounded-2xl text-[15px] shadow-2xs border relative min-w-[80px]
        ${
          isOutcoming
            ? "self-end bg-emerald-200 text-[#111b21] rounded-tr-none border-emerald-300"
            : "self-start bg-white text-[#111b21] rounded-tl-none border-gray-100"
        }
      `}
    >
      <p className="break-words whitespace-pre-wrap pr-10">{message.text}</p>

      <span
        className={`text-[10px] absolute bottom-1 right-2 select-none font-light
          ${isOutcoming ? "text-emerald-700" : "text-gray-400"}
        `}
      >
        {new Date(message.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    </div>
  );
}
