import { poseidon3 } from "poseidon-lite";
import { deriveKeysFromUser } from "./utils";
import { createPublicClient, http, type WalletClient } from "viem";
import { avalancheFuji } from "viem/chains";
import RegistrarABI from "../abis/Registrar.json";
import { groth16 } from "snarkjs";

// Define basic types locally to avoid import issues
type CircuitInput = {
  SenderPrivateKey: bigint;
  SenderPublicKey: [bigint, bigint];
  SenderAddress: bigint;
  ChainID: bigint;
  RegistrationHash: bigint;
};

export const register = async (signature: string, userAddress: string, walletClient: WalletClient) => {
  // Read deployment addresses

  const registrar = process.env.NEXT_PUBLIC_REGISTRAR;

  console.log("🔧 Registering user in EncryptedERC using zkit...");
  console.log("Registrar:", registrar);
  console.log("User to register:", userAddress);

  const publicClient = createPublicClient({
    chain: avalancheFuji,
    transport: http(),
  });

  // 1. Check if already registered
  const isRegistered = await publicClient.readContract({
    address: registrar as `0x${string}`,
    abi: RegistrarABI.abi,
    functionName: "isUserRegistered",
    args: [userAddress as `0x${string}`],
  });
  if (isRegistered) {
    console.log("✅ User is already registered");
    return;
  }

  // 2. Generate deterministic private key from signature using utility function
  const { privateKey, formattedPrivateKey, publicKey } = await deriveKeysFromUser(signature);

  // 3. Generate registration hash using poseidon3
  const chainId = avalancheFuji.id;
  const address = userAddress;

  const registrationHash = poseidon3([BigInt(chainId), formattedPrivateKey, BigInt(address)]);

  console.log("Chain ID:", chainId.toString());
  console.log("Address:", address);
  console.log("Registration Hash:", registrationHash.toString());

  // 4. Generate proof using zkit
  // Get the registration circuit
  const wasmPath = "../../../circuits/RegistrationCircuit.wasm";
  const zkeyPath = "../../../circuits/RegistrationCircuit.groth16.zkey";
  try {
    // Prepare inputs for the circuit
    const input = {
      SenderPrivateKey: formattedPrivateKey,
      SenderPublicKey: [publicKey[0], publicKey[1]],
      SenderAddress: userAddress as `0x${string}`,
      ChainID: BigInt(chainId),
      RegistrationHash: registrationHash,
    };

    console.log("🔐 Generating registration proof using zkit...");
    console.log("📋 Circuit inputs:", input);

    // Generate proof
    // Generate calldata for the contract

    const { proof: calldata, publicSignals } = await groth16.fullProve(input, wasmPath, zkeyPath);
    console.log("✅ Calldata generated successfully");

    const formattedProof = {
      proofPoints: {
        a: [BigInt(calldata.pi_a[0]), BigInt(calldata.pi_a[1])] as readonly [bigint, bigint],
        b: [
          [BigInt(calldata.pi_b[0][1]), BigInt(calldata.pi_b[0][0])],
          [BigInt(calldata.pi_b[1][1]), BigInt(calldata.pi_b[1][0])],
        ] as readonly [readonly [bigint, bigint], readonly [bigint, bigint]],
        c: [BigInt(calldata.pi_c[0]), BigInt(calldata.pi_c[1])] as readonly [bigint, bigint],
      },
      publicSignals: (() => {
        const signals = publicSignals.map((signal: string) => BigInt(signal));
        if (signals.length !== 32) {
          throw new Error(`Expected 5 public signals, got ${signals.length}`);
        }
        return [signals[0], signals[1], signals[2], signals[3], signals[4]] as const;
      })(),
    };
    const [address] = await walletClient.getAddresses();

    // 5. Call the contract
    console.log("📝 Registering in the contract...");
    try {
      const registerTx = await walletClient.writeContract({
        address: registrar as `0x${string}`,
        abi: RegistrarABI.abi,
        functionName: "register",
        args: [formattedProof],
        chain: avalancheFuji,
        account: address as `0x${string}`,
      });

      console.log("✅ User registered successfully!");
    } catch (contractError) {
      console.error("❌ Contract error: ", contractError);

      // Extract contract error message
      if (contractError instanceof Error) {
        const errorMessage = contractError.message;

        // Look for specific contract error message
        if (errorMessage.includes("execution reverted")) {
          // Try to extract custom error message
          const revertMatch = errorMessage.match(/execution reverted: (.+)/);
          if (revertMatch && revertMatch[1]) {
            console.error("Contract error message:", revertMatch[1]);
          } else {
            console.error("Contract reverted without specific message");
          }
        } else {
          console.error("Full error:", errorMessage);
        }

        // Show additional information for debugging
        console.error("Error details:");
        console.error("- Message:", errorMessage);
        console.error("- Stack:", contractError.stack);
      } else {
        console.error("Unknown error:", contractError);
      }

      throw contractError;
    }

    // 6. Verify registration
    const isNowRegistered = await publicClient.readContract({
      address: registrar as `0x${string}`,
      abi: RegistrarABI.abi,
      functionName: "isUserRegistered",
      args: [userAddress as `0x${string}`],
    });
    const userPublicKey = (await publicClient.readContract({
      address: registrar as `0x${string}`,
      abi: RegistrarABI.abi,
      functionName: "getUserPublicKey",
      args: [userAddress as `0x${string}`],
    })) as [bigint, bigint];

    console.log("Verification:");
    console.log("- Registered:", isNowRegistered);
    console.log("- Public key X:", userPublicKey[0].toString());
    console.log("- Public key Y:", userPublicKey[1].toString());

    // 7. Save generated keys for future use
    const userKeys = {
      address: address,
      privateKey: {
        raw: privateKey.toString(),
        formatted: formattedPrivateKey.toString(),
      },
      publicKey: {
        x: publicKey[0].toString(),
        y: publicKey[1].toString(),
      },
      registrationHash: registrationHash.toString(),
    };

    const keysStorageKey = `user-keys-register-${userAddress.toLowerCase()}`;
    localStorage.setItem(keysStorageKey, JSON.stringify(userKeys));

    console.log("🔑 User keys saved to:", keysStorageKey);
  } catch (error) {
    console.error("❌ Error during registration:");

    // Show detailed error information
    if (error instanceof Error) {
      console.error("Error type:", error.constructor.name);
      console.error("Message:", error.message);

      // If it's a contract error, it was already handled above
      if (error.message.includes("execution reverted")) {
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
