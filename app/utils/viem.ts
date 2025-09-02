import { createWalletClient, createPublicClient, custom, http, type EIP1193Provider } from "viem";
import { avalancheFuji } from "viem/chains";

/**
 * Creates a public client for reading blockchain data
 * @returns PublicClient configured for Avalanche Fuji testnet
 */
export function createFujiPublicClient() {
  return createPublicClient({
    chain: avalancheFuji,
    transport: http(),
  });
}

/**
 * Creates a wallet client for signing transactions
 * @param ethereumProvider - The ethereum provider (window.ethereum)
 * @returns WalletClient configured for Avalanche Fuji testnet
 */
export function createFujiWalletClient(ethereumProvider: EIP1193Provider) {
  return createWalletClient({
    chain: avalancheFuji,
    transport: custom(ethereumProvider),
  });
}

/**
 * Creates both public and wallet clients for Avalanche Fuji
 * @param ethereumProvider - The ethereum provider (window.ethereum)
 * @returns Object containing both publicClient and walletClient
 */
export function createFujiClients(ethereumProvider: EIP1193Provider) {
  return {
    publicClient: createFujiPublicClient(),
    walletClient: createFujiWalletClient(ethereumProvider),
  };
}

/**
 * Gets the user's address from a wallet client
 * @param walletClient - The wallet client
 * @returns The first account address
 * @throws Error if no accounts are found
 */
export async function getUserAddress(walletClient: ReturnType<typeof createFujiWalletClient>): Promise<string> {
  const accounts = await walletClient.getAddresses();
  const userAddress = accounts[0];

  if (!userAddress) {
    throw new Error("No se pudo obtener la dirección de la wallet");
  }

  return userAddress;
}
