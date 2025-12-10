import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { defineChain } from "viem";

// Định nghĩa mạng IOTA EVM Testnet thủ công nếu chưa có trong viem/chains
export const iotaTestnet = defineChain({
  id: 1075,
  name: "IOTA EVM Testnet",
  network: "iota-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "IOTA",
    symbol: "IOTA",
  },
  rpcUrls: {
    default: { http: ["https://json-rpc.evm.testnet.iotaledger.net"] },
    public: { http: ["https://json-rpc.evm.testnet.iotaledger.net"] },
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
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || "demo-project-id",
  chains: [iotaTestnet],
  ssr: true, // Server side rendering
});
