import { processPoseidonEncryption } from "./poseidon";
import { deriveKeysFromUser, getDecryptedBalance, i0, createUserFromPrivateKey, decryptEGCTBalance } from "./utils";
import { getContract, formatUnits, parseUnits, decodeEventLog, createPublicClient, http, type WalletClient } from "viem";
import { avalancheFuji } from "viem/chains";
import SimpleERC20ABI from "../abis/SimpleERC20.json";
import EncryptedERCABI from "../abis/EncryptedERC.json";
import RegistrarABI from "../abis/Registrar.json";
import { WithdrawTransaction } from "./withdrawTransaction";
import { withdraw as withdrawHelper } from "./helpers";
import { formatPrivKeyForBabyJub } from "maci-crypto";
import { mulPointEscalar, Base8 } from "@zk-kit/baby-jubjub";

export const withdraw = async (withdrawAmount: string, signaturee: string, userAddress: string, walletClient: WalletClient) => {
  // Definir tipos al inicio del archivo
  type Point = { x: bigint; y: bigint };
  type EGCT = { c1: Point; c2: Point };
  type AmountPCT = { pct: [bigint, bigint, bigint, bigint, bigint, bigint, bigint]; index: bigint };
  type BalancePCT = [bigint, bigint, bigint, bigint, bigint, bigint, bigint];

  const withdrawAmountStr = withdrawAmount; // Amount to withdraw

  console.log("💸 Withdrawing encrypted tokens to regular ERC20...");
  console.log("User address:", userAddress);
  console.log("Withdraw amount:", withdrawAmountStr);

  const encryptedERCAddress = process.env.NEXT_PUBLIC_ENCRYPTED_ERC20;
  const testERC20Address = process.env.NEXT_PUBLIC_ERC20;
  const registrarAddress = process.env.NEXT_PUBLIC_REGISTRAR;

  const publicClient = createPublicClient({
    chain: avalancheFuji,
    transport: http(),
  });

  console.log("EncryptedERC:", encryptedERCAddress);
  console.log("TestERC20:", testERC20Address);
  console.log("Registrar:", registrarAddress);

  try {
    // Check if user is registered
    const isUserRegistered = await publicClient.readContract({
      address: registrarAddress as `0x${string}`,
      abi: RegistrarABI.abi,
      functionName: "isUserRegistered",
      args: [userAddress as `0x${string}`],
    });
    if (!isUserRegistered) {
      console.error("❌ User is not registered. Please run the registration script first.");
      console.log("💡 Run: npm run register:user");
      return;
    }
    console.log("✅ User is registered");

    const keysStorageKey = `user-keys-${userAddress.toLowerCase()}`;
    const savedKeys = localStorage.getItem(keysStorageKey);

    // Load or generate user's keys
    let userPrivateKey: bigint;
    let signature: string;

    if (savedKeys) {
      console.log("🔑 Loading sender keys from localStorage...");

      const keysData = JSON.parse(savedKeys);

      if (keysData.userAddress === userAddress && keysData.keysMatch) {
        userPrivateKey = BigInt(keysData.privateKey);
        signature = keysData.signature;
        console.log("✅ Keys loaded from file");
      } else {
        console.log("⚠️  Saved keys mismatch, generating new signature...");
        signature = signaturee;
        userPrivateKey = i0(signature);
        localStorage.setItem(keysStorageKey, JSON.stringify(userPrivateKey));
      }
    } else {
      console.log("🔐 Generating signature for withdrawal...");
      console.log("🔐 Generating signature for sender...");
      signature = signaturee;
      userPrivateKey = i0(signature);
      localStorage.setItem(keysStorageKey, JSON.stringify(userPrivateKey));
    }

    // Create user object for proof generation
    const user = createUserFromPrivateKey(userPrivateKey, walletClient);

    // Get public keys
    const userPublicKey = (await publicClient.readContract({
      address: registrarAddress as `0x${string}`,
      abi: RegistrarABI.abi,
      functionName: "getUserPublicKey",
      args: [userAddress as `0x${string}`],
    })) as [bigint, bigint];

    const auditorPublicKey = (await publicClient.readContract({
      address: encryptedERCAddress as `0x${string}`,
      abi: EncryptedERCABI.abi,
      functionName: "auditorPublicKey",
    })) as [bigint, bigint];

    console.log("🔑 User public key:", [userPublicKey[0].toString(), userPublicKey[1].toString()]);
    console.log("🔑 Auditor public key:", [auditorPublicKey[0].toString(), auditorPublicKey[1].toString()]);

    // Verify user's keys match
    const derivedPublicKey = user.publicKey;
    const keysMatch = derivedPublicKey[0] === BigInt(userPublicKey[0].toString()) && derivedPublicKey[1] === BigInt(userPublicKey[1].toString());

    if (!keysMatch) {
      console.error("❌ User's private key doesn't match registered public key!");
      console.log("💡 Run: npm run register:user to fix this");
      return;
    }
    console.log("✅ User keys verified");

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

    // Get user's current encrypted balance
    console.log("🔍 Getting user's encrypted balance...");
    const [eGCT, nonce, amountPCTs, balancePCT, transactionIndex] = (await publicClient.readContract({
      address: encryptedERCAddress as `0x${string}`,
      abi: EncryptedERCABI.abi,
      functionName: "balanceOf",
      args: [userAddress as `0x${string}`, tokenId],
    })) as [EGCT, bigint, bigint, bigint, bigint];

    // Decrypt user's balance using EGCT
    const c1: [bigint, bigint] = [BigInt(eGCT.c1.x.toString()), BigInt(eGCT.c1.y.toString())];
    const c2: [bigint, bigint] = [BigInt(eGCT.c2.x.toString()), BigInt(eGCT.c2.y.toString())];

    const isEGCTEmpty = c1[0] === 0n && c1[1] === 0n && c2[0] === 0n && c2[1] === 0n;
    if (isEGCTEmpty) {
      console.error("❌ User has no encrypted balance to withdraw");
      console.log("💡 Make a deposit first: npm run deposit");
      return;
    }

    const userCurrentBalance = decryptEGCTBalance(userPrivateKey, c1, c2);
    const encryptedSystemDecimals = 2;

    console.log(`💰 Current encrypted balance: ${formatUnits(userCurrentBalance, encryptedSystemDecimals)} encrypted units`);

    // Convert withdrawal amount to encrypted system units
    const withdrawAmount = parseFloat(withdrawAmountStr);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      throw new Error("❌ Invalid withdrawal amount");
    }

    const withdrawAmountBigInt = BigInt(Math.floor(withdrawAmount * 10 ** encryptedSystemDecimals));

    if (userCurrentBalance < withdrawAmountBigInt) {
      console.error(`❌ Insufficient encrypted balance. Have: ${formatUnits(userCurrentBalance, encryptedSystemDecimals)}, Need: ${withdrawAmount}`);
      return;
    }

    console.log(`✅ Withdrawal amount: ${formatUnits(withdrawAmountBigInt, encryptedSystemDecimals)} encrypted units`);

    // Get current public token balance (before withdrawal)
    const tokenDecimals = await publicClient.readContract({
      address: testERC20Address as `0x${string}`,
      abi: SimpleERC20ABI.abi,
      functionName: "decimals",
    });
    const tokenSymbol = await publicClient.readContract({
      address: testERC20Address as `0x${string}`,
      abi: SimpleERC20ABI.abi,
      functionName: "symbol",
    });
    const publicTokenBalanceBefore = await publicClient.readContract({
      address: testERC20Address as `0x${string}`,
      abi: SimpleERC20ABI.abi,
      functionName: "balanceOf",
      args: [userAddress as `0x${string}`],
    });
    console.log(`💰 Current public ${tokenSymbol} balance: ${formatUnits(publicTokenBalanceBefore as bigint, tokenDecimals as number)} ${tokenSymbol}`);

    // Prepare data for withdrawal proof generation
    const userEncryptedBalance = [c1[0], c1[1], c2[0], c2[1]];
    const auditorPublicKeyArray = [BigInt(auditorPublicKey[0].toString()), BigInt(auditorPublicKey[1].toString())];

    console.log("🔐 Generating withdrawal proof...");
    console.log("This may take a while...");

    // Generate withdrawal proof using the helper function
    const { proof, userBalancePCT } = await withdrawHelper(withdrawAmountBigInt, user, userEncryptedBalance, userCurrentBalance, auditorPublicKeyArray);
    console.log("proof", proof);
    console.log("userBalancePCT", userBalancePCT);

    console.log("✅ Withdrawal proof generated successfully");

    // Format proof for contract call (proof is already in the correct format)
    const withdrawProof = proof;

    console.log("📝 Submitting withdrawal to contract...");

    // Call the contract's withdraw function
    const withdrawTx = await WithdrawTransaction(tokenId, withdrawProof, userBalancePCT, walletClient);

    console.log("📝 Withdrawal transaction sent:", withdrawTx);

    const receipt = await publicClient.waitForTransactionReceipt({ hash: withdrawTx as `0x${string}` });
    console.log("✅ Withdrawal transaction confirmed in block:", receipt?.blockNumber);

    console.log("🎉 Private withdrawal completed successfully!");

    // Show updated balances
    console.log("\n🔍 Checking updated balances...");

    // Get user's new encrypted balance
    const [newEGCT] = (await publicClient.readContract({
      address: encryptedERCAddress as `0x${string}`,
      abi: EncryptedERCABI.abi,
      functionName: "balanceOf",
      args: [userAddress as `0x${string}`, tokenId],
    })) as [EGCT, bigint, bigint, bigint, bigint];

    console.log("newEGCT", newEGCT);

    const newC1: [bigint, bigint] = [BigInt(newEGCT.c1.x.toString()), BigInt(newEGCT.c1.y.toString())];
    const newC2: [bigint, bigint] = [BigInt(newEGCT.c2.x.toString()), BigInt(newEGCT.c2.y.toString())];

    let newEncryptedBalance = 0n;
    const isNewEGCTEmpty = newC1[0] === 0n && newC1[1] === 0n && newC2[0] === 0n && newC2[1] === 0n;
    if (!isNewEGCTEmpty) {
      newEncryptedBalance = decryptEGCTBalance(userPrivateKey, newC1, newC2);
    }

    // Get new public token balance
    const publicTokenBalanceAfter = await publicClient.readContract({
      address: testERC20Address as `0x${string}`,
      abi: SimpleERC20ABI.abi,
      functionName: "balanceOf",
      args: [userAddress as `0x${string}`],
    });
    const tokensReceived = (publicTokenBalanceAfter as bigint) - (publicTokenBalanceBefore as unknown as bigint);

    console.log(`💰 New encrypted balance: ${formatUnits(newEncryptedBalance, encryptedSystemDecimals)} encrypted units`);
    console.log(`💰 New public ${tokenSymbol} balance: ${formatUnits(publicTokenBalanceAfter as bigint, tokenDecimals as number)} ${tokenSymbol}`);
    console.log(`📥 ${tokenSymbol} tokens received: ${formatUnits(tokensReceived, tokenDecimals as number)} ${tokenSymbol}`);

    console.log("\n🎯 Withdrawal Summary:");
    console.log(`   User: ${userAddress}`);
    console.log(`   Encrypted Amount Withdrawn: ${withdrawAmount} encrypted units`);
    console.log(`   Public ${tokenSymbol} Received: ${formatUnits(tokensReceived, tokenDecimals as number)} ${tokenSymbol}`);
    console.log(`   Transaction: ${withdrawTx as `0x${string}`}`);

    console.log("\n💡 Your encrypted tokens have been converted back to regular ERC20 tokens!");

    // Update keys if needed
    const keysData = JSON.parse(savedKeys as string);
    if (savedKeys || keysData.userAddress !== userAddress) {
      const formattedPrivateKey = formatPrivKeyForBabyJub(userPrivateKey);
      const derivedPublicKey = mulPointEscalar(Base8, formattedPrivateKey);
      const keysData = {
        userAddress,
        signature,
        privateKey: userPrivateKey.toString(),
        formattedPrivateKey: formattedPrivateKey.toString(),
        publicKey: [derivedPublicKey[0].toString(), derivedPublicKey[1].toString()],
        lastUpdated: new Date().toISOString(),
        note: "Keys for decrypting encrypted balances in EncryptedERC",
        keysMatch: true,
      };

      localStorage.setItem(keysStorageKey, JSON.stringify(keysData));
      console.log(`\n🔑 Keys saved/updated: ${keysStorageKey}`);
    }
  } catch (error) {
    console.error("❌ Error during withdrawal:");
    console.error(error);

    if (error instanceof Error) {
      if (error.message.includes("User not registered")) {
        console.error("💡 Hint: Register your user first with: npm run register:user");
      } else if (error.message.includes("Auditor not set")) {
        console.error("💡 Hint: The auditor needs to be set in the EncryptedERC contract");
      } else if (error.message.includes("Contract is not in converter mode")) {
        console.error("💡 Hint: The EncryptedERC contract needs to be in converter mode for withdrawals");
      } else if (error.message.includes("InvalidProof")) {
        console.error("💡 Hint: The withdrawal proof verification failed - check inputs");
      }
    }

    throw error;
  }
};
