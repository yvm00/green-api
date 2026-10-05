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
    let isCurrentEffectActive = true;

    async function poll() {
      while (isPollingActive.current) {
        try {
          const data = await receiveNotification(userData!);
          if (!isCurrentEffectActive) break;

          if (!data) {
            await new Promise((r) => setTimeout(r, 1000));
            continue;
          }
          if (!isPollingActive.current) break;

          const body = data.body;

          if (body?.typeWebhook === "incomingMessageReceived") {
            const text =
              body.messageData?.textMessageData?.textMessage ||
              body.messageData?.extendedTextMessageData?.text;

            if (text) {
              onMessage({
                idMessage: body.idMessage,
                text,
                type: "incoming",
                timestamp: Date.now(),
              });
            }
          }

          await deleteNotification(userData!, data.receiptId);
        } catch (err) {
          console.error("Polling error:", err);
          await new Promise((r) => setTimeout(r, 100));
        }
      }
    }

    poll();
    return () => {
      isPollingActive.current = false;
    };
  }, [userData, active, onMessage]);
}
