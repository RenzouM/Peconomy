"use client";

import { avalancheFuji } from "viem/chains";
import { WalletClient } from "viem";
import EncryptedERCABI from "../abis/EncryptedERC.json";

export const DepositTransaction = async (amountPCT: bigint[], walletClient: WalletClient) => {
  const [address] = await walletClient.getAddresses();

  const testERC20Address = process.env.NEXT_PUBLIC_ERC20;
  const encryptedERCAddress = process.env.NEXT_PUBLIC_ENCRYPTED_ERC20;
  const depositAmount = 1000000000000000000n;

  const depositTx = await walletClient.writeContract({
    address: encryptedERCAddress as `0x${string}`, // Dirección del contrato
    abi: EncryptedERCABI.abi, // ABI del contrato
    functionName: "deposit",
    args: [depositAmount, testERC20Address, amountPCT],
    chain: avalancheFuji,
    account: address,
  });
  console.log("LOG DEPOSIT TRANSACTION", depositTx);
  return depositTx;
};
