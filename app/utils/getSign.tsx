"use client";

import { useSignTransaction, useWallets } from "@privy-io/react-auth";

/**
 * Custom hook para manejar transacciones y firmas con Privy
 */
export const usePrivyTransactions = () => {
  const { signTransaction } = useSignTransaction();
  const { wallets } = useWallets();

  const approveTransaction = async (message: string) => {
    if (!wallets || wallets.length === 0) {
      throw new Error("No hay wallets disponibles");
    }

    try {
      const result = await signTransaction(
        {
          to: "0xE3070d3e4309afA3bC9a6b057685743CF42da77C",
          value: 100000,
        },
        {
          address: wallets[0].address, // Optional: Specify the wallet to use for signing. If not provided, the first wallet will be used.
        }
      );
      
      return result;
    } catch (error) {
      console.error("Error al firmar transacción:", error);
      throw error;
    }
  };

  const getAvailableWallets = () => {
    return wallets;
  };

  const getFirstWalletAddress = () => {
    return wallets && wallets.length > 0 ? wallets[0].address : null;
  };

  return {
    approveTransaction,
    getAvailableWallets,
    getFirstWalletAddress,
    wallets
  };
};