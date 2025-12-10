import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  injectedWallet,
  walletConnectWallet,
  metaMaskWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { defineChain } from "viem";

// Cấu hình mạng IOTA EVM Testnet (Chain ID 1076)
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

export const config = getDefaultConfig({
  appName: "IOTA Attendance",
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || "demo",
  chains: [iotaTestnet],
  ssr: true,
  // Tùy chỉnh danh sách ví hiển thị
  wallets: [
    {
      groupName: "Ví IOTA Khuyên Dùng",
      wallets: [
        // 1. Injected: Tự nhận diện TanglePay (Extension) hoặc MetaMask
        injectedWallet,
        // 2. WalletConnect: Dùng cho Firefly Mobile (Quét mã QR)
        walletConnectWallet,
      ],
    },
    {
      groupName: "Khác",
      wallets: [metaMaskWallet],
    },
  ],
});
