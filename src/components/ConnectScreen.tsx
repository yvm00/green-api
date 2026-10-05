import { useState } from "react";
import { Link } from "lucide-react";

interface Props {
  onConnect: (idInstance: string, apiTokenInstance: string) => void;
  error: string | null;
  isConnecting: boolean;
}

export default function ConnectScreen({
  onConnect,
  error,
  isConnecting,
}: Props) {
  const [idInput, setIdInput] = useState("");
  const [tokenInput, setTokenInput] = useState("");

  return (
    <div className="flex justify-center items-center min-h-screen bg-olive-100">
      <div className="w-96 bg-white rounded-2xl p-6 shadow flex flex-col items-center justify-between">
        <div className="w-full flex flex-col items-center mb-2">
          <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center">
            <Link className="text-emerald-600 text-[28px]" />
          </div>
          <h1 className="text-[22px] font-semibold text-black text-center">
            Connection
          </h1>
          <p className="text-[14px] text-gray-500 text-center mb-6 leading-relaxed ">
            Enter your GREEN-API details to start chatting
          </p>
        </div>

        <div className="w-full flex flex-col gap-4 mb-6">
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-[14px] font-medium text-black">
              ID Instance
            </label>
            <input
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-[15px] placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              value={idInput}
              onChange={(e) => setIdInput(e.target.value)}
              placeholder="Enter idInstance"
            />
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-[14px] font-medium text-black">
              API Token Instance
            </label>
            <input
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-[15px] placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              type="password"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="Enter apiTokenInstance"
            />
          </div>
        </div>

        <div className="w-full mb-4">
          <button
            className="w-full bg-emerald-500 text-white rounded-lg py-2 disabled:opacity-50"
            onClick={() => onConnect(idInput, tokenInput)}
            disabled={isConnecting}
          >
            {isConnecting ? "Connecting..." : "Connect"}
          </button>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
}
