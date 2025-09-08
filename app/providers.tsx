"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { peconomyNetwork } from "./config/network";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      clientId={process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID!}
      config={{
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          ethereum: {
            createOnLogin: "users-without-wallets",
          },
        },
        // Configure supported chains
        supportedChains: [peconomyNetwork],
        // Set default chain
        defaultChain: peconomyNetwork,
      }}>
      {children}
    </PrivyProvider>
  );
}
