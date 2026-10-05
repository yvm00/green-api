import { useState } from "react";

interface Props {
  onConnect: (idInstance: string, apiTokenInstance: string) => void;
  error: string | null;
  isConnecting: boolean;
}

export default function ConnectScreen({ onConnect, error, isConnecting }: Props) {
  const [idInput, setIdInput] = useState("");
  const [tokenInput, setTokenInput] = useState("");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-80 bg-white rounded-2xl p-6 shadow">
        <h1 className="text-lg font-medium text-center mb-4">
          Chat Connecting
        </h1>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        <label className="text-sm text-gray-500">Instance ID</label>
        <input
          className="w-full border rounded-lg px-3 py-2 mb-3"
          value={idInput}
          onChange={(e) => setIdInput(e.target.value)}
        />

        <label className="text-sm text-gray-500">API Token</label>
        <input
          className="w-full border rounded-lg px-3 py-2 mb-4"
          type="password"
          value={tokenInput}
          onChange={(e) => setTokenInput(e.target.value)}
        />

        <button
          className="w-full bg-black text-white rounded-lg py-2 disabled:opacity-50"
          onClick={() => onConnect(idInput, tokenInput)}
          disabled={isConnecting}
        >
          {isConnecting ? "Connecting..." : "Connect"}
        </button>
      </div>
    </div>
  );
}
