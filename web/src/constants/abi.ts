// Copy mảng "abi" từ file contracts/artifacts/contracts/Attendance.sol/Attendance.json
export const ATTENDANCE_ABI = [
  // ... Paste nội dung ABI vào đây (rất dài, nhưng bắt buộc phải có để frontend hiểu contract)
  // Ví dụ ngắn gọn để chạy demo (bạn cần copy full):
  {
    inputs: [{ internalType: "string", name: "_className", type: "string" }],
    name: "createSession",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_sessionId", type: "uint256" }],
    name: "checkIn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "nextSessionId",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "hasCheckedIn",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
] as const;
