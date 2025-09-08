import { privateTransfer } from "./helpers";
import { i0, decryptEGCTBalance, createUserFromPrivateKey } from "./utils";
import EncryptedERCABI from "../abis/EncryptedERC.json";
import RegistrarABI from "../abis/Registrar.json";
import { formatUnits, createPublicClient, http, type WalletClient } from "viem";
import { TransferTransaction } from "./transferTransaction";
import { peconomyNetwork } from "../config/network";

export const transfer = async (senderAddress: `0x${string}`, receiverAddress: `0x${string}`, transferAmountStr: number, walletClient: WalletClient, signaturee: string) => {
  // Definir tipos al inicio del archivo
  type Point = { x: bigint; y: bigint };
  type EGCT = { c1: Point; c2: Point };

  console.log("💡 Using hardcoded values:");
  console.log("   Receiver:", receiverAddress);
  console.log("   Amount:", transferAmountStr);

  if (!receiverAddress) {
    throw new Error("❌ Invalid receiver address provided");
  }

  if (isNaN(transferAmountStr) || transferAmountStr <= 0) {
    throw new Error("❌ Invalid transfer amount provided");
  }

  const encryptedERCAddress = process.env.NEXT_PUBLIC_ENCRYPTED_ERC20;
  const testERC20Address = process.env.NEXT_PUBLIC_ERC20;
  const registrarAddress = process.env.NEXT_PUBLIC_REGISTRAR;

  const publicClient = createPublicClient({
    chain: peconomyNetwork,
    transport: http(),
  });

  console.log("🔄 Performing private transfer...");
  console.log("Sender:", senderAddress);
  console.log("Receiver:", receiverAddress);
  console.log("Amount:", transferAmountStr);
  console.log("EncryptedERC:", encryptedERCAddress);

  try {
    // Check if both sender and receiver are registered
    const isSenderRegistered = await publicClient.readContract({
      address: registrarAddress as `0x${string}`,
      abi: RegistrarABI.abi,
      functionName: "isUserRegistered",
      args: [senderAddress as `0x${string}`],
    });
    const isReceiverRegistered = await publicClient.readContract({
      address: registrarAddress as `0x${string}`,
      abi: RegistrarABI.abi,
      functionName: "isUserRegistered",
      args: [receiverAddress as `0x${string}`],
    });

    if (!isSenderRegistered) {
      console.error("❌ Sender is not registered. Please run the registration script first.");
      return;
    }
    if (!isReceiverRegistered) {
      console.error("❌ Receiver is not registered. They need to register first.");
      return;
    }

    console.log("✅ Both sender and receiver are registered");

    const keysStorageKey = `user-keys-${senderAddress.toLowerCase()}`;
    const savedKeys = localStorage.getItem(keysStorageKey);

    let senderPrivateKey: bigint;
    let signature: string;

    if (savedKeys) {
      console.log("🔑 Loading sender keys from localStorage...");
      try {
        const keysData = JSON.parse(savedKeys);

        if (keysData.userAddress === senderAddress && keysData.keysMatch) {
          senderPrivateKey = BigInt(keysData.privateKey);
          signature = keysData.signature;
          console.log("✅ Sender keys loaded from localStorage");
        } else {
          console.log("⚠️  Saved keys mismatch, generating new signature...");
          signature = signaturee;
          senderPrivateKey = i0(signature);
          localStorage.setItem(keysStorageKey, JSON.stringify(senderPrivateKey));
        }
      } catch {
        console.log("⚠️  Error parsing saved keys, generating new signature...");
        signature = signaturee;
        senderPrivateKey = i0(signature);
        localStorage.setItem(keysStorageKey, JSON.stringify(senderPrivateKey));
      }
    } else {
      console.log("🔐 Generating signature for sender...");
      signature = signaturee;
      senderPrivateKey = i0(signature);
      localStorage.setItem(keysStorageKey, JSON.stringify(senderPrivateKey));
    }

    // Create sender User object
    const sender = createUserFromPrivateKey(senderPrivateKey, walletClient);

    // Get public keys from registrar
    const senderPublicKey = (await publicClient.readContract({
      address: registrarAddress as `0x${string}`,
      abi: RegistrarABI.abi,
      functionName: "getUserPublicKey",
      args: [senderAddress as `0x${string}`],
    })) as [bigint, bigint];
    const receiverPublicKey = (await publicClient.readContract({
      address: registrarAddress as `0x${string}`,
      abi: RegistrarABI.abi,
      functionName: "getUserPublicKey",
      args: [receiverAddress as `0x${string}`],
    })) as [bigint, bigint];

    const auditorPublicKey = (await publicClient.readContract({
      address: encryptedERCAddress as `0x${string}`,
      abi: EncryptedERCABI.abi,
      functionName: "auditorPublicKey",
    })) as [bigint, bigint];

    console.log("🔑 Sender public key:", [senderPublicKey[0].toString(), senderPublicKey[1].toString()]);
    console.log("🔑 Receiver public key:", [receiverPublicKey[0].toString(), receiverPublicKey[1].toString()]);
    console.log("🔑 Auditor public key:", [auditorPublicKey[0].toString(), auditorPublicKey[1].toString()]);

    // Verify sender's keys match
    const derivedSenderPublicKey = sender.publicKey;
    const senderKeysMatch = derivedSenderPublicKey[0] === BigInt(senderPublicKey[0].toString()) && derivedSenderPublicKey[1] === BigInt(senderPublicKey[1].toString());

    if (!senderKeysMatch) {
      console.error("❌ Sender's private key doesn't match registered public key!");
      console.log("Run: npm run fix:keys or npm run register:user");
      return;
    }
    console.log("✅ Sender keys verified");

    // Get token ID
    const tokenId = (await publicClient.readContract({
      address: encryptedERCAddress as `0x${string}`,
      abi: EncryptedERCABI.abi,
      functionName: "tokenIds",
      args: [testERC20Address as `0x${string}`],
    })) as bigint;
    if (tokenId === 0n) {
      console.error("❌ Token not registered in EncryptedERC yet. Make a deposit first.");
      return;
    }
    console.log("📋 Token ID:", tokenId.toString());

    // Get sender's current encrypted balance
    console.log("🔍 Getting sender's encrypted balance...");
    const [eGCT] = (await publicClient.readContract({
      address: encryptedERCAddress as `0x${string}`,
      abi: EncryptedERCABI.abi,
      functionName: "balanceOf",
      args: [senderAddress as `0x${string}`, tokenId],
    })) as [EGCT, bigint, bigint, bigint, bigint];

    // Decrypt sender's balance using EGCT
    const c1: [bigint, bigint] = [BigInt(eGCT.c1.x.toString()), BigInt(eGCT.c1.y.toString())];
    const c2: [bigint, bigint] = [BigInt(eGCT.c2.x.toString()), BigInt(eGCT.c2.y.toString())];

    const isEGCTEmpty = c1[0] === 0n && c1[1] === 0n && c2[0] === 0n && c2[1] === 0n;
    if (isEGCTEmpty) {
      console.error("❌ Sender has no encrypted balance to transfer");
      return;
    }

    const senderCurrentBalance = decryptEGCTBalance(senderPrivateKey, c1, c2);
    const encryptedSystemDecimals = 2;

    console.log(`💰 Sender's current balance: ${formatUnits(senderCurrentBalance, encryptedSystemDecimals)} encrypted units`);

    // Convert transfer amount to encrypted system units
    const transferAmountBigInt = BigInt(Math.floor(transferAmountStr * 10 ** encryptedSystemDecimals));

    if (senderCurrentBalance < transferAmountBigInt) {
      console.error(`❌ Insufficient balance. Have: ${formatUnits(senderCurrentBalance, encryptedSystemDecimals)}, Need: ${transferAmountStr}`);
      return;
    }

    console.log(`✅ Transfer amount: ${formatUnits(transferAmountBigInt, encryptedSystemDecimals)} encrypted units`);

    // Prepare data for transfer proof generation
    const senderEncryptedBalance = [c1[0], c1[1], c2[0], c2[1]];
    const receiverPublicKeyArray = [BigInt(receiverPublicKey[0].toString()), BigInt(receiverPublicKey[1].toString())];
    const auditorPublicKeyArray = [BigInt(auditorPublicKey[0].toString()), BigInt(auditorPublicKey[1].toString())];

    console.log("🔐 Generating transfer proof...");
    console.log("This may take a while...");

    // Generate transfer proof using the helper function
    const { proof, senderBalancePCT } = await privateTransfer(sender, senderCurrentBalance, receiverPublicKeyArray, transferAmountBigInt, senderEncryptedBalance, auditorPublicKeyArray);

    console.log("✅ Transfer proof generated successfully");

    // The proof returned from privateTransfer is already in the correct format (CalldataTransferCircuitGroth16)
    const transferProof = proof as unknown as bigint[];

    console.log("📝 Submitting transfer to contract...");

    console.log("receiverAddress", receiverAddress);
    console.log("tokenId", tokenId);
    console.log("transferProof", transferProof);
    console.log("senderBalancePCT", senderBalancePCT);
    console.log("walletClient", walletClient);

    // Call the contract's transfer function
    const transferTx = await TransferTransaction(receiverAddress, tokenId, transferProof as bigint[], senderBalancePCT, walletClient);

    console.log("📝 Transfer transaction sent:", transferTx);

    const receipt = await publicClient.waitForTransactionReceipt({ hash: transferTx as `0x${string}` });
    console.log("✅ Transfer transaction confirmed in block:", receipt?.blockNumber);

    console.log("🎉 Private transfer completed successfully!");

    // Show updated balances
    console.log("\n🔍 Checking updated balances...");

    // Get sender's new balance
    const [newEGCT] = (await publicClient.readContract({
      address: encryptedERCAddress as `0x${string}`,
      abi: EncryptedERCABI.abi,
      functionName: "balanceOf",
      args: [senderAddress as `0x${string}`, tokenId],
    })) as [EGCT];
    const newC1: [bigint, bigint] = [BigInt(newEGCT.c1.x.toString()), BigInt(newEGCT.c1.y.toString())];
    const newC2: [bigint, bigint] = [BigInt(newEGCT.c2.x.toString()), BigInt(newEGCT.c2.y.toString())];
    const senderNewBalance = decryptEGCTBalance(senderPrivateKey, newC1, newC2);

    console.log(`💰 Sender's new balance: ${formatUnits(senderNewBalance, encryptedSystemDecimals)} encrypted units`);
    console.log(`📤 Amount transferred: ${formatUnits(transferAmountBigInt, encryptedSystemDecimals)} encrypted units`);

    console.log("\n🎯 Transfer Summary:");
    console.log(`   From: ${senderAddress}`);
    console.log(`   To: ${receiverAddress}`);
    console.log(`   Amount: ${transferAmountStr} tokens`);
    console.log(`   Transaction: ${transferTx}`);
    console.log("\n💡 The receiver can check their balance using npm run check:balance");
  } catch (error) {
    console.error("❌ Error during private transfer:");
    console.error(error);

    if (error instanceof Error) {
      if (error.message.includes("User not registered")) {
        console.error("💡 Hint: Both sender and receiver must be registered");
      } else if (error.message.includes("Auditor not set")) {
        console.error("💡 Hint: The auditor needs to be set in the EncryptedERC contract");
      } else if (error.message.includes("InvalidProof")) {
        console.error("💡 Hint: The transfer proof verification failed - check inputs");
      }
    }

    throw error;
  }
};
