import ConnectScreen from "./components/ConnectScreen";
import ChatScreen from "./components/ChatScreen";
import { useEffect, useState } from "react";
import type { UserData } from "./types/userData";
import type { Message } from "./types/message";
import { usePolling } from "./hooks/usePolling";
import { getSettings, sendMessage } from "./api/greenApi";
import type { AppErrors } from "./types/errors";

export default function App() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatStarted, setChatStarted] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setError] = useState<AppErrors>({ connect: null, send: null });
  const [isConnecting, setIsConnecting] = useState(false);

  usePolling(userData, chatStarted, (msg) =>
    setMessages((prev) => [...prev, msg]),
  );

  const handleSendMessage = async (text: string) => {
    setError((prev) => ({ ...prev, send: null }));
    try {
      const response = await sendMessage(
        userData!,
        `${phoneNumber}@c.us`,
        text,
      );
      const outcoming: Message = {
        idMessage: response.idMessage,
        text,
        type: "outcoming",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, outcoming]);
    } catch {
      setError((prev) => ({ ...prev, send: "Failed to send message" }));
    }
  };

  const handleConnect = async (id: string, token: string) => {
    setError((prev) => ({ ...prev, connect: null }));
    setIsConnecting(true);
    try {
      await getSettings({ idInstance: id, apiTokenInstance: token });
      setUserData({ idInstance: id, apiTokenInstance: token });
    } catch {
      setError((prev) => ({
        ...prev,
        connect: "Invalid instance ID or token",
      }));
    } finally {
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    if (errors) {
      const timer = setTimeout(() => setError({send: null, connect: null}), 2000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  if (!userData) {
    return (
      <ConnectScreen
        onConnect={handleConnect}
        isConnecting={isConnecting}
        error={errors.connect}
      />
    );
  }

  return (
    <div>
      <ChatScreen
        messages={messages}
        chatStarted={chatStarted}
        onStartChat={(phoneNumber) => {
          setPhoneNumber(phoneNumber);
          setChatStarted(true);
        }}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
