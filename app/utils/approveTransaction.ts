import { avalancheFuji } from "viem/chains";
import { WalletClient } from "viem";
import SimpleERC20ABI from "../abis/SimpleERC20.json";

export const ApproveTransaction = async (walletClient: WalletClient) => {
  const [address] = await walletClient.getAddresses();

  const testERC20Address = process.env.NEXT_PUBLIC_ERC20;
  const encryptedERCAddress = process.env.NEXT_PUBLIC_ENCRYPTED_ERC20;
  const depositAmount = 1000000000000000000n;

  const approveTx = await walletClient.writeContract({
    address: testERC20Address as `0x${string}`, // Dirección del contrato
    abi: SimpleERC20ABI.abi, // ABI del contrato
    functionName: "approve",
    args: [encryptedERCAddress, depositAmount],
    chain: avalancheFuji,
    account: address,
  });

  return approveTx;
};
