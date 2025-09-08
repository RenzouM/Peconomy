// Peconomy Network Configuration
export const peconomyNetwork = {
  id: 46150,
  name: "Peconomy",
  network: "peconomy",
  nativeCurrency: {
    name: "AVAX",
    symbol: "AVAX",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://peconomy-rpc.online/ext/bc/2ZAJXerWfkfLAyAucnAdosUsgQEvH3bWYSVeoJC9cNwwiae5be/rpc"],
    },
  },
} as const;
