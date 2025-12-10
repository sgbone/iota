"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { useState, useEffect } from "react";
import { ATTENDANCE_ABI } from "../constants/abi";

// Lấy địa chỉ từ file .env
const CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

export default function Home() {
  const { isConnected } = useAccount();
  const [className, setClassName] = useState("");
  const [sessionId, setSessionId] = useState("");

  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isConfirmed) {
      alert("Giao dịch thành công!");
      setClassName("");
      setSessionId("");
    }
  }, [isConfirmed]);

  return (
    <div className="min-h-screen p-8 bg-gray-100 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h1 className="text-2xl font-bold text-teal-600">IOTA Điểm Danh</h1>
          <ConnectButton />
        </div>

        {!isConnected ? (
          <p className="text-center py-10 text-gray-500">
            Vui lòng kết nối ví để sử dụng.
          </p>
        ) : (
          <div className="space-y-8">
            {/* Trạng thái */}
            {isPending && (
              <p className="text-yellow-600 text-center">
                Đang mở ví... Vui lòng ký xác nhận.
              </p>
            )}
            {isConfirming && (
              <p className="text-blue-600 text-center">
                Đang chờ mạng IOTA xử lý...
              </p>
            )}
            {error && (
              <p className="text-red-500 text-center text-sm">
                {error.message.split("\n")[0]}
              </p>
            )}

            {/* Giáo viên */}
            <div className="p-4 border border-teal-200 rounded-lg bg-teal-50">
              <h2 className="font-bold text-lg mb-2 text-teal-800">
                Giáo viên: Tạo Lớp
              </h2>
              <div className="flex gap-2">
                <input
                  className="flex-1 border p-2 rounded text-black"
                  placeholder="Tên môn học (VD: Blockchain)"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                />
                <button
                  disabled={isPending}
                  onClick={() =>
                    writeContract({
                      address: CONTRACT_ADDRESS,
                      abi: ATTENDANCE_ABI,
                      functionName: "createSession",
                      args: [className],
                    })
                  }
                  className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 disabled:opacity-50"
                >
                  Tạo
                </button>
              </div>
            </div>

            {/* Sinh viên */}
            <div className="p-4 border border-indigo-200 rounded-lg bg-indigo-50">
              <h2 className="font-bold text-lg mb-2 text-indigo-800">
                Sinh viên: Điểm danh
              </h2>
              <div className="flex gap-2">
                <input
                  className="flex-1 border p-2 rounded text-black"
                  type="number"
                  placeholder="ID Session (VD: 0)"
                  value={sessionId}
                  onChange={(e) => setSessionId(e.target.value)}
                />
                <button
                  disabled={isPending}
                  onClick={() =>
                    writeContract({
                      address: CONTRACT_ADDRESS,
                      abi: ATTENDANCE_ABI,
                      functionName: "checkIn",
                      args: [BigInt(sessionId || 0)],
                    })
                  }
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
                >
                  Điểm danh
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
