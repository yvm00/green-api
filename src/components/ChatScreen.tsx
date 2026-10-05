import { useState } from "react";
import type { Message } from "../types/message";
import MessageBubble from "./MessageBubble";

interface Props {
  messages: Message[];
  chatStarted: boolean;
  onStartChat: (phoneNumber: string) => void;
  onSendMessage: (text: string) => void;
}

export default function ChatScreen({
  messages,
  chatStarted,
  onStartChat,
  onSendMessage,
}: Props) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [messageInput, setMessageInput] = useState("");

  const handleSend = () => {
    if (!messageInput.trim()) return;
    onSendMessage(messageInput);
    setMessageInput("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-80 h-[480px] bg-white rounded-2xl flex flex-col overflow-hidden shadow">
        {!chatStarted ? (
          <div className="flex-1 flex flex-col justify-center items-center p-6 gap-3">
            <p className="text-sm text-gray-500">Recipient's phone number </p>
            <input
              className="w-full border rounded-lg px-3 py-2"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="79991234567"
            />
            <button
              className="w-full bg-black text-white rounded-lg py-2"
              onClick={() => onStartChat(phoneNumber)}
            >
              Start chat
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
              {messages.map((msg) => (
                <MessageBubble key={msg.idMessage} message={msg} />
              ))}
            </div>
            <div className="flex items-center gap-2 p-2 border-t">
              <input
                className="flex-1 border rounded-full px-3 py-2"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Введите сообщение"
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                className="bg-black text-white rounded-full w-9 h-9 flex items-center justify-center"
                onClick={handleSend}
              >
                →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
