import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  walletConnectWallet,
  trustWallet,
  ledgerWallet,
  injectedWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { defineChain } from "viem";

// 1. Cấu hình mạng IOTA EVM Testnet (Chain ID 1076)
export const iotaTestnet = defineChain({
  id: 1076,
  name: "IOTA EVM Testnet",
  nativeCurrency: { name: "IOTA", symbol: "IOTA", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://json-rpc.evm.testnet.iotaledger.net"] },
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://explorer.evm.testnet.iotaledger.net",
    },
  },
});

// 2. Cấu hình RainbowKit với danh sách ví tùy chỉnh
export const config = getDefaultConfig({
  appName: "IOTA Attendance",
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || "demo",
  chains: [iotaTestnet],
  ssr: true,

  // --- PHẦN MỚI THÊM VÀO ---
  wallets: [
    {
      groupName: "Phổ biến nhất",
      wallets: [
        metaMaskWallet, // Ví MetaMask chuẩn
        walletConnectWallet, // Dùng cho Firefly Mobile / Desktop
      ],
    },
    {
      groupName: "Ví IOTA & Khác",
      wallets: [
        // TanglePay sẽ tự động nhận diện qua injectedWallet
        injectedWallet,
        trustWallet,
        ledgerWallet,
      ],
    },
  ],
});
