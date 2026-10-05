import type { UserData } from "../types/userData";

async function handleResponse(res: Response) {
  if (!res.ok) {
    throw new Error(`Request error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function sendMessage(
  { idInstance, apiTokenInstance }: UserData,
  chatId: string,
  message: string,
) {
  const res = await fetch(
    `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatId, message }),
    },
  );
  return handleResponse(res);
}

export async function getSettings({ idInstance, apiTokenInstance }: UserData,){
  const res = await fetch(
    `https://api.green-api.com/waInstance${idInstance}/getSettings/${apiTokenInstance}`,
  );
  return handleResponse(res);
}

export async function receiveNotification({
  idInstance,
  apiTokenInstance,
}: UserData) {
  const res = await fetch(
    `https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
  );
  return handleResponse(res);
}

export async function deleteNotification(
  { idInstance, apiTokenInstance }: UserData,
  receiptId: number,
) {
  const res = await fetch(
    `https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
    { method: "DELETE" },
  );
  return handleResponse(res);
}
