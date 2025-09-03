"use client";

import { usePrivy, useWallets } from "@privy-io/react-auth";

/**
 * Hook para extraer private keys de Privy embedded wallets
 */
export const usePrivyPrivateKeys = () => {
  const { authenticated, user } = usePrivy();
  const { wallets } = useWallets();

  const getPrivateKey = async (): Promise<string | null> => {
    if (!authenticated || !user) {
      throw new Error("Usuario no autenticado");
    }

    // Buscar el embedded wallet del usuario
    const embeddedWallet = wallets.find(
      (wallet) => wallet.walletClientType === "privy"
    );

    if (!embeddedWallet) {
      throw new Error("No se encontró embedded wallet");
    }

    try {
      // Exportar la private key del embedded wallet
      const privateKey = await embeddedWallet.export();
      return privateKey;
    } catch (error) {
      console.error("Error al extraer private key:", error);
      throw error;
    }
  };

  const getWalletAddress = (): string | null => {
    return user?.wallet?.address || null;
  };

  return {
    getPrivateKey,
    getWalletAddress,
    authenticated,
    user
  };
};

/**
 * Función utilitaria para guardar keys en un archivo
 * (para usar desde componentes)
 */
export const savePrivateKeyToFile = async (privateKey: string, address: string) => {
  const keyData = {
    address,
    privateKey,
    timestamp: new Date().toISOString(),
    source: "privy-embedded-wallet"
  };

  // Opción 1: Guardar en localStorage para acceso desde el frontend
  localStorage.setItem("privy-private-key", JSON.stringify(keyData));

  // Opción 2: Llamar a un API endpoint para guardar en el servidor
  try {
    const response = await fetch("/api/save-private-key", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(keyData),
    });

    if (!response.ok) {
      throw new Error("Error al guardar private key en el servidor");
    }

    return await response.json();
  } catch (error) {
    console.error("Error saving to server:", error);
    // Fallback: solo usar localStorage
    return { success: true, source: "localStorage" };
  }
};