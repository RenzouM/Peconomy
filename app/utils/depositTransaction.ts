import { WalletClient } from "viem";
import EncryptedERCABI from "../abis/EncryptedERC.json";
import { peconomyNetwork } from "../config/network";

export const DepositTransaction = async (amountPCT: bigint[], walletClient: WalletClient, depositAmount: bigint) => {
  const [address] = await walletClient.getAddresses();

  const testERC20Address = process.env.NEXT_PUBLIC_ERC20;
  const encryptedERCAddress = process.env.NEXT_PUBLIC_ENCRYPTED_ERC20;

  const depositTx = await walletClient.writeContract({
    address: encryptedERCAddress as `0x${string}`, // Dirección del contrato
    abi: EncryptedERCABI.abi, // ABI del contrato
    functionName: "deposit",
    args: [depositAmount, testERC20Address, amountPCT],
    chain: peconomyNetwork,
    account: address,
  });
  console.log("LOG DEPOSIT TRANSACTION", depositTx);
  return depositTx;
};
