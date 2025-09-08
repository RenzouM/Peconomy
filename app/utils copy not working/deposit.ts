import * as fs from "fs";
import * as path from "path";
import { poseidon2 } from "poseidon-lite";
import { deriveKeysFromUser, getDecryptedBalance } from "../utils/encrypt_decrypt";
import { getContract, type Address, type WalletClient, formatUnits, parseUnits } from "viem";
import SimpleERC20ABI from "../abis/SimpleERC20.json";
import EncryptedERCABI from "../abis/EncryptedERC.json";
import RegistrarABI from "../abis/Registrar.json";

export const deposit = async (wallet: WalletClient, depositAmount: string) => {
  // Configure which wallet to use: 1 for first signer, 2 for second signer
  const depositAmountStr = depositAmount; // Amount to Deposit
  const userAddress = wallet;

  const encryptedERCAddress = process.env.NEXT_PUBLIC_ENCRYPTED_ERC20;
  const testERC20Address = process.env.NEXT_PUBLIC_TEST_ERC20;
  const registrarAddress = process.env.NEXT_PUBLIC_REGISTRAR;

  console.log(`🔧 Depositing ${depositAmount} TEST token into EncryptedERC...`);
  console.log("User address:", userAddress);
  console.log("EncryptedERC:", encryptedERCAddress);
  console.log("TestERC20:", testERC20Address);

  if (!encryptedERCAddress || !testERC20Address || !registrarAddress) {
    throw new Error("Contract addresses not configured");
  }

  // Connect to contracts using the wallet
  const testERC20 = await getContract({
    address: testERC20Address as `0x${string}`,
    abi: SimpleERC20ABI.abi,
    client: wallet as WalletClient,
  });
  const encryptedERC = await getContract({
    address: encryptedERCAddress as `0x${string}`,
    abi: EncryptedERCABI.abi,
    client: wallet as WalletClient,
  });
  const registrar = await getContract({
    address: registrarAddress as `0x${string}`,
    abi: RegistrarABI.abi,
    client: wallet as WalletClient,
  });

  try {
    // 1. Check if user is registered
    const isRegistered = await registrar.read.isUserRegistered([userAddress]);
    if (!isRegistered) {
      console.error("❌ User is not registered. Please run the registration script first.");
      console.log("💡 Run: npx hardhat run scripts/03_register-user.ts --network fuji");
      return;
    }
    console.log("✅ User is registered");

    // 2. Generate keys using utility function
    const { privateKey: userPrivateKey, formattedPrivateKey, publicKey: derivedPublicKey, signature } = await deriveKeysFromUser(userAddress);

    // 3. Get user's public key for PCT generation
    const userPublicKey = (await registrar.read.getUserPublicKey(userAddress)) as [bigint, bigint];
    console.log("🔑 User public key:", [userPublicKey[0].toString(), userPublicKey[1].toString()]);

    // Verify public keys match (they should be the same)
    const publicKeysMatch = derivedPublicKey[0] === BigInt(userPublicKey[0].toString()) && derivedPublicKey[1] === BigInt(userPublicKey[1].toString());
    if (publicKeysMatch) {
      console.log("✅ Derived public key matches registered public key");
    } else {
      console.log("⚠️  Derived public key doesn't match registered key - this may cause decryption issues");
    }

    // 4. Check testERC20 balance
    const tokenBalance = await testERC20.read.balanceOf(userAddress);
    const tokenDecimals = await testERC20.read.decimals();
    const tokenSymbol = await testERC20.read.symbol();

    console.log(`💰 Current ${tokenSymbol} balance:`, formatUnits(tokenBalance as bigint, tokenDecimals as number), tokenSymbol);

    // 5. Check current encrypted balance before deposit
    console.log("🔍 Checking current encrypted balance...");
    try {
      // Get token ID for testERC20 (0 if not registered, or actual ID if registered)
      let tokenId = BigInt(0);
      try {
        tokenId = (await encryptedERC.read.tokenIds([testERC20Address])) as bigint;
        if (tokenId === BigInt(0)) {
          console.log("📋 Token not yet registered in EncryptedERC (will be registered on first deposit)");
        }
      } catch (error) {
        console.log("📋 Token not yet registered in EncryptedERC");
      }

      // Get encrypted balance components using balanceOf function
      // Definir tipos al inicio del archivo
      type Point = { x: bigint; y: bigint };
      type EGCT = { c1: Point; c2: Point };
      type AmountPCT = { pct: [bigint, bigint, bigint, bigint, bigint, bigint, bigint]; index: bigint };
      type BalancePCT = [bigint, bigint, bigint, bigint, bigint, bigint, bigint];

      // ✅ Usar tipos definidos
      const [eGCT, nonce, amountPCTs, balancePCT, transactionIndex] = (await encryptedERC.read.balanceOf([userAddress, tokenId])) as [EGCT, bigint, AmountPCT[], BalancePCT, bigint];

      // ✅ Definir encryptedBalance
      const encryptedBalance = [
        [eGCT.c1.x, eGCT.c1.y],
        [eGCT.c2.x, eGCT.c2.y],
      ];

      console.log({ encryptedBalance });
      const balancePCTArray = balancePCT.map((x: bigint) => BigInt(x.toString()));

      // ✅ Ahora puedes usar encryptedBalance
      const decryptedBalance = await getDecryptedBalance(userPrivateKey, amountPCTs, balancePCTArray, encryptedBalance);
      console.log({ decryptedBalance });

      // Convert to display units (the encrypted system uses 2 decimals as per constants)
      const encryptedSystemDecimals = 2;
      console.log(`🔒 Current encrypted balance: ${formatUnits(decryptedBalance, encryptedSystemDecimals)} (encrypted units)`);
    } catch (error) {
      console.log("📋 No existing encrypted balance found (this is normal for first deposit)");
    }

    // Amount to deposit: 10 TEST token
    const depositAmount = parseUnits(depositAmountStr, tokenDecimals as number);

    if ((tokenBalance as bigint) < depositAmount) {
      console.error(`❌ Insufficient ${tokenSymbol} balance. Required: 1 ${tokenSymbol}, Available:`, formatUnits(tokenBalance as bigint, tokenDecimals as number), tokenSymbol);
      console.log("💡 Get more tokens from faucet: npx hardhat run scripts/05_get_faucet.ts --network fuji");
      return;
    }

    // 4. Check allowance
    const currentAllowance = await testERC20.read.allowance([userAddress, encryptedERCAddress]);
    console.log(`📋 Current allowance:`, formatUnits(currentAllowance as bigint, tokenDecimals as number), tokenSymbol);

    if ((currentAllowance as bigint) < depositAmount) {
      console.log(`🔓 Approving ${tokenSymbol} spending for EncryptedERC...`);
      const approveTx = await testERC20.write.approve([encryptedERCAddress, depositAmount]);
      console.log("📝 Approval transaction sent:", approveTx);
      console.log("✅ Approval confirmed");
    } else {
      console.log("✅ Allowance already sufficient");
    }

    // 5. Generate amountPCT for auditing
    console.log("🔐 Generating amountPCT for auditing...");
    const depositAmountBigInt = BigInt(depositAmount.toString());
    const publicKeyBigInt = [BigInt(userPublicKey[0].toString()), BigInt(userPublicKey[1].toString())];

    const { ciphertext: amountCiphertext, nonce: amountNonce, authKey: amountAuthKey } = poseidon2([depositAmountBigInt], publicKeyBigInt);

    // Format amountPCT as [ciphertext (5 elements), authKey (2 elements), nonce (1 element)] = 7 elements total
    const amountPCT: [bigint, bigint, bigint, bigint, bigint, bigint, bigint] = [...amountCiphertext, ...amountAuthKey, amountNonce] as [bigint, bigint, bigint, bigint, bigint, bigint, bigint];

    console.log("✅ AmountPCT generated successfully");

    // 6. Perform the deposit
    console.log(`💾 Depositing 1 ${tokenSymbol} into EncryptedERC...`);
    const depositTx = await encryptedERC.deposit(depositAmount, testERC20Address, amountPCT);
    console.log("📝 Deposit transaction sent:", depositTx.hash);

    const receipt = await depositTx.wait();
    console.log("✅ Deposit transaction confirmed in block:", receipt?.blockNumber);

    // 7. Check results
    const newTokenBalance = await testERC20.balanceOf(userAddress);
    const deposited = tokenBalance - newTokenBalance;

    console.log("🎉 Deposit successful!");
    console.log(`💰 Previous ${tokenSymbol} balance:`, ethers.formatUnits(tokenBalance, tokenDecimals), tokenSymbol);
    console.log(`💰 New ${tokenSymbol} balance:`, ethers.formatUnits(newTokenBalance, tokenDecimals), tokenSymbol);
    console.log(`📦 Amount deposited:`, ethers.formatUnits(deposited, tokenDecimals), tokenSymbol);

    // 8. Check encrypted balance after deposit
    console.log("\n🔍 Checking encrypted balance after deposit...");
    try {
      // Get the updated token ID (should be set now if it wasn't before)
      const finalTokenId = await encryptedERC.tokenIds(testERC20Address);

      // Get updated encrypted balance components using balanceOf function
      const [updatedEGCT, updatedNonce, updatedAmountPCTs, updatedBalancePCT, updatedTransactionIndex] = await encryptedERC.balanceOf(userAddress, finalTokenId);
      const updatedEncryptedBalance = [
        [BigInt(updatedEGCT.c1.x.toString()), BigInt(updatedEGCT.c1.y.toString())],
        [BigInt(updatedEGCT.c2.x.toString()), BigInt(updatedEGCT.c2.y.toString())],
      ];

      const updatedBalancePCTArray = updatedBalancePCT.map((x: any) => BigInt(x.toString()));

      // Decrypt and calculate new total balance
      const newDecryptedBalance = await getDecryptedBalance(userPrivateKey, updatedAmountPCTs, updatedBalancePCTArray, updatedEncryptedBalance);

      // Convert to display units
      const encryptedSystemDecimals = 2;
      console.log(`🔒 Updated encrypted balance: ${ethers.formatUnits(newDecryptedBalance, encryptedSystemDecimals)} (encrypted units)`);
      console.log(`📋 Token ID in system: ${finalTokenId.toString()}`);

      // Show balance change in encrypted system
      console.log("\n📊 Balance Summary:");
      console.log(`   Public ${tokenSymbol} Balance: ${ethers.formatUnits(tokenBalance, tokenDecimals)} → ${ethers.formatUnits(newTokenBalance, tokenDecimals)}`);
      console.log(`   Private Encrypted Balance: ${ethers.formatUnits(newDecryptedBalance, encryptedSystemDecimals)} encrypted units`);
    } catch (error) {
      console.error("❌ Error checking encrypted balance after deposit:", error);
    }

    // 8. Check if there were any dust returns (from decimal scaling)
    if (receipt) {
      const logs = receipt.logs;
      for (const log of logs) {
        try {
          const parsed = encryptedERC.interface.parseLog(log);
          if (parsed && parsed.name === "Deposit") {
            const [user, amount, dust, tokenId] = parsed.args;
            console.log("📋 Deposit Details:");
            console.log("  - User:", user);
            console.log("  - Amount:", ethers.formatUnits(amount, tokenDecimals), tokenSymbol);
            console.log("  - Dust returned:", ethers.formatUnits(dust, tokenDecimals), tokenSymbol);
            console.log("  - Token ID:", tokenId.toString());

            if (dust > 0n) {
              console.log("💡 Some dust was returned due to decimal scaling differences");
            }
          }
        } catch (e) {
          // Skip logs that can't be parsed by this contract
        }
      }
    }

    // Save keys for future reference
    const keysData = {
      userAddress,
      signature,
      privateKey: userPrivateKey.toString(),
      formattedPrivateKey: formattedPrivateKey.toString(),
      publicKey: [derivedPublicKey[0].toString(), derivedPublicKey[1].toString()],
      lastUpdated: new Date().toISOString(),
      note: "Keys for decrypting encrypted balances in EncryptedERC",
    };

    const keysPath = path.join(__dirname, "../../deployments/converter/user-keys.json");
    fs.writeFileSync(keysPath, JSON.stringify(keysData, null, 2));
    console.log(`\n🔑 Keys saved to: ${keysPath}`);

    console.log("\n🎯 Next Steps:");
    console.log("   • Your tokens are now privately encrypted in the EncryptedERC contract");
    console.log("   • You can perform private transfers to other registered users");
    console.log("   • You can withdraw your tokens back to regular ERC20 format");
    console.log("   • Your keys are saved for future balance checking");
  } catch (error) {
    console.error("❌ Error during deposit:");

    // Show detailed error information
    if (error instanceof Error) {
      console.error("Error type:", error.constructor.name);
      console.error("Message:", error.message);

      // Handle specific errors
      if (error.message.includes("User not registered")) {
        console.error("💡 Hint: Please register your user first with the registration script");
      } else if (error.message.includes("Auditor not set")) {
        console.error("💡 Hint: The auditor needs to be set in the EncryptedERC contract");
      } else if (error.message.includes("Contract is not in converter mode")) {
        console.error("💡 Hint: The EncryptedERC contract needs to be in converter mode for deposits");
      } else if (error.message.includes("Token is blacklisted")) {
        console.error("💡 Hint: The token you're trying to deposit is blacklisted");
      } else if (error.message.includes("ERC20: insufficient allowance")) {
        console.error("💡 Hint: Increase the allowance for the EncryptedERC contract");
      } else if (error.message.includes("ERC20: transfer amount exceeds balance")) {
        console.error("💡 Hint: You don't have enough tokens to deposit");
      } else if (error.message.includes("execution reverted")) {
        console.error("This is a contract execution error");
      }

      // Show stack trace for debugging
      if (error.stack) {
        console.error("Stack trace:");
        console.error(error.stack);
      }
    } else {
      console.error("Unknown error:", error);
    }

    throw error;
  }
};

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
