import { WalletClient } from "viem";
import EncryptedERCABI from "../abis/EncryptedERC.json";
import { peconomyNetwork } from "../config/network";

export const TransferTransaction = async (receiverAddress: string, tokenId: bigint, transferProof: bigint[], senderBalancePCT: bigint[], walletClient: WalletClient) => {
  const [address] = await walletClient.getAddresses();

  const encryptedERCAddress = process.env.NEXT_PUBLIC_ENCRYPTED_ERC20;

  const transferTx = await walletClient.writeContract({
    address: encryptedERCAddress as `0x${string}`, // Dirección del contrato
    abi: EncryptedERCABI.abi, // ABI del contrato
    functionName: "transfer",
    args: [receiverAddress, tokenId, transferProof, senderBalancePCT],
    chain: peconomyNetwork,
    account: address,
  });
  console.log("LOG TRANSFER TRANSACTION", transferTx);
  return transferTx;
};
