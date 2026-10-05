import { useState } from "react";
import type { Message } from "../types/message";
import MessageBubble from "./MessageBubble";
import { MessagesCircle, Send, SendHorizonal, User } from "lucide-react";

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
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const handleStartChat = () => {
    setPhoneError(null);
    let formattedPhone = phoneNumber.trim();

    if (formattedPhone.startsWith("+")) {
      formattedPhone = formattedPhone.slice(1);
    }

    if (formattedPhone.startsWith("8") && formattedPhone.length === 11) {
      formattedPhone = "7" + formattedPhone.slice(1);
    }

    const phoneRegex = /^7\d{10}$/;

    if (!formattedPhone) {
      setPhoneError("Phone number is required");
      return;
    }

    if (!phoneRegex.test(formattedPhone)) {
      setPhoneError("Format must be 79991234567 (11 digits, starts with 7)");
      return;
    }
    onStartChat(formattedPhone);
  };

  const handleSend = () => {
    if (!messageInput.trim()) return;
    onSendMessage(messageInput);
    setMessageInput("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-olive-100">
      <div className="w-full max-w-[440px] h-[600px] p-6 bg-white rounded-2xl flex flex-col overflow-hidden shadow">
        {!chatStarted ? (
          <div className="flex-1 flex flex-col justify-center items-center gap-4 w-full">
            <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center">
              <MessagesCircle className="text-emerald-600 text-[28px]" />
            </div>

            <div className="text-center w-full">
              <h2 className="text-[20px] font-semibold text-black mb-1">
                New Chat
              </h2>
              <p className="text-sm text-gray-500">
                Enter the recipient's WhatsApp number
              </p>
            </div>

            <div className="w-full flex flex-col gap-1.5 mt-2">
              <input
                className={`w-full border rounded-xl px-4 py-3 text-[15px] focus:outline-none transition-colors ${
                  phoneError
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-emerald-500"
                }`}
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  if (phoneError) setPhoneError(null);
                }}
                placeholder="79991234567"
                onKeyDown={(e) => e.key === "Enter" && handleStartChat()}
              />

              {phoneError && (
                <p className="text-red-500 text-xs mt-0.5">{phoneError}</p>
              )}
            </div>

            <button
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl py-3 mt-2 transition-colors shadow-xs"
              onClick={handleStartChat}
            >
              Start Chat
            </button>
          </div>
        ) : (
          <div className="flex flex-col h-full w-full justify-between">
            <div className="pb-3 border-b border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center">
                <User className="ext-emerald-600 text-[20px]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-black">
                  +{phoneNumber}
                </p>
                <p className="text-[11px] text-emerald-600 font-medium">
                  Active chat
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto my-3 p-2 flex flex-col gap-2 bg-slate-50 rounded-xl border border-gray-50">
              {messages.map((msg) => (
                <MessageBubble key={msg.idMessage} message={msg} />
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
              <input
                className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-[15px] focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />

              <button
                className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl w-[42px] h-[42px] flex items-center justify-center transition-colors shadow-xs shrink-0"
                onClick={handleSend}
              >
                <SendHorizonal className="text-[15px]" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
