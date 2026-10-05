import { useEffect, useRef } from "react";
import { receiveNotification, deleteNotification } from "../api/greenApi";
import type { UserData } from "../types/userData";
import type { Message } from "../types/message";

export function usePolling(
  userData: UserData | null,
  active: boolean,
  onMessage: (msg: Message) => void,
) {
  const isPollingActive = useRef(false);

  useEffect(() => {
    if (!userData || !active) return;
    isPollingActive.current = true;

    async function poll() {
      while (isPollingActive.current) {
        try {
          const data = await receiveNotification(userData!);
          if (!data) continue;
          if (!isPollingActive.current) break;

          const text = data.body?.messageData?.textMessageData?.textMessage;
          if (data.body?.typeWebhook === "incomingMessageReceived" && text) {
            onMessage({
              idMessage: data.body.idMessage,
              text,
              type: "incoming",
              timestamp: Date.now(),
            });
          }
          await deleteNotification(userData!, data.receiptId);
        } catch (err) {
          console.error("Polling error:", err);
          await new Promise((r) => setTimeout(r, 2000));
        }
      }
    }

    poll();
    return () => {
      isPollingActive.current = false;
    };
  }, [userData, active]);
}
