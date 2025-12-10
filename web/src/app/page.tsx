"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { useState, useEffect } from "react";
import { ATTENDANCE_ABI } from "../constants/abi";

// Lấy địa chỉ contract từ biến môi trường
const CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

export default function Home() {
  const { isConnected, address } = useAccount();

  // State quản lý input
  const [className, setClassName] = useState("");
  const [sessionId, setSessionId] = useState("");

  // Hooks tương tác Contract
  const {
    writeContract,
    data: hash,
    isPending,
    error: writeError,
  } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  // Reset form khi thành công
  useEffect(() => {
    if (isConfirmed) {
      setClassName("");
      setSessionId("");
    }
  }, [isConfirmed]);

  // Hàm xử lý tạo Session
  const handleCreateSession = () => {
    if (!className) return alert("Vui lòng nhập tên lớp!");
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: ATTENDANCE_ABI,
      functionName: "createSession",
      args: [className],
    });
  };

  // Hàm xử lý điểm danh
  const handleCheckIn = () => {
    if (!sessionId) return alert("Vui lòng nhập ID Session!");
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: ATTENDANCE_ABI,
      functionName: "checkIn",
      args: [BigInt(sessionId)],
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col items-center py-10 px-4">
      {/* Header */}
      <header className="w-full max-w-3xl flex justify-between items-center mb-10 bg-white p-5 rounded-xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-teal-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">
            I
          </div>
          <h1 className="text-xl font-bold text-teal-700">IOTA Attendance</h1>
        </div>
        <ConnectButton
          label="Kết nối Ví"
          accountStatus="address"
          showBalance={false}
        />
      </header>

      <main className="w-full max-w-3xl space-y-6">
        {/* Thông báo chưa kết nối */}
        {!isConnected && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">
              Chào mừng đến với Web3
            </h2>
            <p className="text-gray-500 mb-6">
              Kết nối ví TanglePay hoặc MetaMask để bắt đầu điểm danh.
            </p>
          </div>
        )}

        {isConnected && (
          <>
            {/* Khu vực thông báo trạng thái giao dịch */}
            {isPending && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span> Vui lòng xác nhận giao
                dịch trên ví...
              </div>
            )}
            {isConfirming && (
              <div className="p-4 bg-blue-50 border border-blue-200 text-blue-800 rounded-lg text-center animate-pulse">
                ⛓️ Đang ghi dữ liệu lên IOTA Tangle...
              </div>
            )}
            {isConfirmed && (
              <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-center font-bold">
                ✅ Giao dịch thành công!
              </div>
            )}
            {writeError && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-center">
                ❌ Lỗi: {writeError.message.split("\n")[0]}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {/* Card Giáo viên */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-teal-500 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  👨‍🏫 Giáo viên
                </h3>
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-600">
                    Tên môn học / Lớp
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Nhập môn Blockchain"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                  />
                  <button
                    onClick={handleCreateSession}
                    disabled={isPending}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
                  >
                    Tạo Session Mới
                  </button>
                </div>
              </div>

              {/* Card Sinh viên */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-indigo-500 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  👨‍🎓 Sinh viên
                </h3>
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-600">
                    Mã Session (ID)
                  </label>
                  <input
                    type="number"
                    placeholder="VD: 0"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    value={sessionId}
                    onChange={(e) => setSessionId(e.target.value)}
                  />
                  <button
                    onClick={handleCheckIn}
                    disabled={isPending}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
                  >
                    Điểm Danh Ngay
                  </button>
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-gray-400 mt-4">
              Connected: {address}
            </p>
          </>
        )}
      </main>
    </div>
  );
}
