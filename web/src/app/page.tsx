"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { useState } from "react";
import { ATTENDANCE_ABI } from "../constants/abi";

const CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

export default function Home() {
  const { address, isConnected } = useAccount();
  const [className, setClassName] = useState("");
  const [sessionIdToCheckIn, setSessionIdToCheckIn] = useState("");

  const {
    writeContract,
    data: hash,
    error: writeError,
    isPending,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  // Đọc tổng số session (Ví dụ đơn giản để hiển thị)
  const { data: nextId } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ATTENDANCE_ABI,
    functionName: "nextSessionId",
    watch: true, // Tự động cập nhật
  });

  const handleCreateSession = () => {
    if (!className) return;
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: ATTENDANCE_ABI,
      functionName: "createSession",
      args: [className],
    });
  };

  const handleCheckIn = () => {
    if (!sessionIdToCheckIn) return;
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: ATTENDANCE_ABI,
      functionName: "checkIn",
      args: [BigInt(sessionIdToCheckIn)],
    });
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50 text-gray-900 font-sans">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold text-teal-600">IOTA Attendance</h1>
        <ConnectButton />
      </header>

      <main className="max-w-2xl mx-auto space-y-8">
        {!isConnected ? (
          <div className="text-center p-10 bg-white rounded shadow">
            <p>Vui lòng kết nối ví để tiếp tục.</p>
          </div>
        ) : (
          <>
            {/* Khu vực trạng thái giao dịch */}
            {(isPending || isConfirming) && (
              <div className="p-4 bg-yellow-100 text-yellow-800 rounded">
                Đang xử lý giao dịch... Vui lòng đợi.
              </div>
            )}
            {isConfirmed && (
              <div className="p-4 bg-green-100 text-green-800 rounded">
                Giao dịch thành công!
              </div>
            )}
            {writeError && (
              <div className="p-4 bg-red-100 text-red-800 rounded">
                Lỗi: {writeError.message.split("\n")[0]}
              </div>
            )}

            {/* Dành cho Giáo viên */}
            <div className="p-6 bg-white rounded-xl shadow border border-gray-100">
              <h2 className="text-xl font-bold mb-4">Giáo viên: Tạo Lớp</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Tên lớp (VD: Web3 101)"
                  className="flex-1 p-2 border rounded"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                />
                <button
                  onClick={handleCreateSession}
                  disabled={isPending}
                  className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 disabled:opacity-50"
                >
                  Tạo Session
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Tổng số session hiện tại: {nextId ? nextId.toString() : "0"}
              </p>
            </div>

            {/* Dành cho Sinh viên */}
            <div className="p-6 bg-white rounded-xl shadow border border-gray-100">
              <h2 className="text-xl font-bold mb-4">Sinh viên: Điểm danh</h2>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="ID Session (VD: 0)"
                  className="flex-1 p-2 border rounded"
                  value={sessionIdToCheckIn}
                  onChange={(e) => setSessionIdToCheckIn(e.target.value)}
                />
                <button
                  onClick={handleCheckIn}
                  disabled={isPending}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  Điểm danh ngay
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Ví của bạn: {address?.slice(0, 6)}...{address?.slice(-4)}
              </p>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
