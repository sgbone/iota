# 🎓 IOTA Decentralized Attendance

![IOTA EVM](https://img.shields.io/badge/Network-IOTA%20EVM%20Testnet-00E0CA?style=for-the-badge&logo=iota&logoColor=white)
![Next.js](https://img.shields.io/badge/Frontend-Next.js%2014-black?style=for-the-badge&logo=next.js)
![Solidity](https://img.shields.io/badge/Contract-Solidity%200.8-363636?style=for-the-badge&logo=solidity&logoColor=white)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

A decentralized, tamper-proof attendance management system built on the **IOTA EVM**. This project demonstrates a full-stack integration of a **Solidity** smart contract with a modern **Next.js** frontend, enabling educators to manage classes and students to verify their presence via blockchain transactions.

## Table of Contents

- [IOTA Decentralized Attendance](#-iota-decentralized-attendance)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Key Features](#key-features)
  - [Techniques \& Architecture](#techniques--architecture)
  - [Technologies Used](#technologies-used)
  - [Project Structure](#project-structure)
  - [Installation \& Setup](#installation--setup)
    - [Prerequisites](#prerequisites)
    - [1. Smart Contract Deployment (Backend)](#1-smart-contract-deployment-backend)
    - [2. Frontend Setup (Web)](#2-frontend-setup-web)
  - [Configuration](#configuration)
  - [Smart Contract API](#smart-contract-api)
  - [Proof of Work (Demo)](#proof-of-work-demo)
  - [Contribution](#contribution)
  - [License](#license)

## Introduction

**IOTA Attendance** leverages the immutable nature of the IOTA EVM Layer 2 to solve the problem of attendance fraud. Unlike traditional databases, this dApp ensures that attendance records are cryptographically signed by the student's wallet and stored permanently on the blockchain, eliminating the possibility of retroactive data manipulation.

## Key Features

- **Immutable Record Keeping**: Attendance data is stored on-chain and cannot be altered once confirmed.
- **State-Driven Workflow**:
  - **Teachers**: Create strictly numbered `Sessions` with metadata.
  - **Students**: Execute `Check-in` transactions to prove presence.
- **Sybil Resistance**: The smart contract enforces a "one wallet, one check-in" policy per session.
- **Reactive UI**: Real-time transaction status updates (Pending → Confirming → Success) using optimistic UI patterns.
- **Multi-Wallet Support**: Seamless integration with **MetaMask**, **TanglePay**, and **Firefly** via RainbowKit.

## Techniques & Architecture

This project employs advanced patterns suitable for scalable dApp development on EVM-compatible chains:

- **EVM Compatibility on IOTA**:
  The core logic resides in a **Solidity** smart contract. This allows us to leverage the mature Ethereum developer ecosystem (Hardhat, Viem) while benefiting from IOTA's feeless (or low-fee) structure and high throughput.

- **Client-Side State Management**:
  We utilize **Wagmi v2** and **TanStack Query** to manage blockchain state. This abstracts the complexity of RPC calls, caching, and block synchronization, providing a snappy, Web2-like user experience.

- **Wallet Aggregation Strategy**:
  The UI implements **RainbowKit** to unify the connection experience. It automatically detects injected providers (like TanglePay) and supports WalletConnect protocol for mobile wallets (Firefly), ensuring broad accessibility.

## Technologies Used

- **[IOTA EVM](https://wiki.iota.org/)**: The target Layer 2 Blockchain (Testnet).
- **[Hardhat](https://hardhat.org/)**: Development environment for compiling and deploying contracts.
- **[Next.js 14](https://nextjs.org/)**: The React framework for the frontend (App Router).
- **[Wagmi & Viem](https://wagmi.sh/)**: Type-safe hooks for Ethereum/EVM interaction.
- **[RainbowKit](https://www.rainbowkit.com/)**: The best way to connect a wallet.
- **[TailwindCSS](https://tailwindcss.com/)**: Utility-first CSS framework for rapid UI development.

## Project Structure

```bash
/
├── contracts/              # --- BACKEND (Blockchain) ---
│   ├── contracts/
│   │   └── Attendance.sol  # Solidity Smart Contract logic
│   ├── scripts/
│   │   └── deploy.ts       # Deployment script
│   ├── hardhat.config.ts   # IOTA Network Configuration (Chain ID 1076)
│   └── .env                # Environment variables (Private Key)
│
└── web/                    # --- FRONTEND (User Interface) ---
    ├── src/
    │   ├── app/            # Next.js Pages & Layouts
    │   ├── config/         # Wagmi & RainbowKit Config
    │   └── constants/      # ABI & Contract Address
    ├── .env.local          # Public Config (Project ID)
    └── package.json        # Frontend dependencies
```

## Installation & Setup

### Prerequisites

- **Node.js** (v18+)
- **MetaMask** or **TanglePay** (Browser Extension)
- **IOTA Testnet Tokens** (Get them from the [Faucet](https://faucet.testnet.iota.cafe/))

### 1. Smart Contract Deployment (Backend)

Navigate to the `contracts` directory, install dependencies, and publish to the IOTA Testnet.

```bash
cd contracts
npm install
npm run compile
npm run deploy
```

> **Note**: After deployment, copy the **Contract Address** (`0x...`) from the terminal output. You will need this for the frontend configuration.

### 2. Frontend Setup (Web)

Navigate to the `web` directory, install dependencies, and start the development server.

```bash
cd web
npm install
npm run dev
```

## Configuration

To ensure the application connects correctly, configure your environment variables.

**1. Backend (`contracts/.env`)**:
```env
PRIVATE_KEY=your_metamask_private_key_here
```

**2. Frontend (`web/.env.local`)**:
```env
# Get a free ID at cloud.reown.com
NEXT_PUBLIC_WC_PROJECT_ID=your_project_id_here

# The address obtained from step 1
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
```

## Smart Contract API

The `Attendance` module exposes the following entry functions:

| Function | Type | Description |
| :--- | :--- | :--- |
| `createSession(string _className)` | **Write** | Creates a new attendance session. Only callable by the teacher. |
| `checkIn(uint256 _sessionId)` | **Write** | Records the sender's address into the session. Fails if already checked in. |
| `nextSessionId()` | **Read** | Returns the total number of sessions created. |
| `sessions(uint256 id)` | **Read** | Returns details (Name, Time, Status) of a specific session. |

## Proof of Work (Demo)

Below is a verified transaction on the IOTA EVM Explorer, demonstrating a successful `checkIn` execution.

![Transaction Details](https://cdn.discordapp.com/attachments/1431299562844324001/1448307474691129344/Screenshot_2025-12-10_202745.png?ex=693ac8f2&is=69397772&hm=9716bc34f5d9f4fd0c5afb1e9e12bbb26352cd82c8ea77e0af1f503bb9f461c4&)

*Transaction Hash: 0x924... verified on IOTA EVM Testnet Explorer.*

## Contribution

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Made with ❤️ by <strong>[Your Name]</strong> running on <strong>IOTA</strong>.
</p>
