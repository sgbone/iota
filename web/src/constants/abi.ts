export const ATTENDANCE_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "sessionId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "student",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "CheckedIn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "sessionId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "className",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "teacher",
        type: "address",
      },
    ],
    name: "SessionCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_sessionId",
        type: "uint256",
      },
    ],
    name: "checkIn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_sessionId",
        type: "uint256",
      },
    ],
    name: "closeSession",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_className",
        type: "string",
      },
    ],
    name: "createSession",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "hasCheckedIn",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextSessionId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "sessions",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "className",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
      {
        internalType: "address",
        name: "teacher",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
