import ConnectScreen from "./components/ConnectScreen";
import ChatScreen from "./components/ChatScreen";
import { useState } from "react";
import type { UserData } from "./types/userData";
import type { Message } from "./types/message";
import { usePolling } from "./hooks/usePolling";

export default function App() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatStarted, setChatStarted] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  usePolling(userData, chatStarted, (msg) => setMessages((prev) => [...prev, msg]))

  if(!userData){
    return (
      <ConnectScreen onConnect = {(id, token) => setUserData({idInstance: id, apiTokenInstance: token})}/>
    )
  }

  return (
    <>
    </>
  );
}
