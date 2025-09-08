import { Account, createPublicClient, http, type WalletClient } from "viem";
import SimpleERC20Abi from "../abis/SimpleERC20.json";
import { formatUnits } from "viem";

export const faucet = async (userAddress: `0x${string}`, wallet: WalletClient) => {
  // Configure which wallet to use: 1 for first signer, 2 for second signer

  const testERC20Address = process.env.NEXT_PUBLIC_ERC20;

  const peconomyNetwork = {
    id: 46150,
    name: "Peconomy",
    network: "peconomy",
    nativeCurrency: {
      name: "AVAX",
      symbol: "AVAX",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ["https://peconomy-rpc.online/ext/bc/2ZAJXerWfkfLAyAucnAdosUsgQEvH3bWYSVeoJC9cNwwiae5be/rpc"],
      },
    },
  };

  console.log("🔧 Claiming tokens from testERC20 faucet...");
  console.log("Token address:", testERC20Address);
  console.log("User address:", userAddress);

  // Connect to the testERC20 contract using the wallet
  const publicClient = createPublicClient({
    chain: peconomyNetwork,
    transport: http(),
  });

  try {
    // Get token details
    const name = await publicClient.readContract({
      address: testERC20Address as `0x${string}`,
      abi: SimpleERC20Abi.abi,
      functionName: "name",
    });
    const symbol = await publicClient.readContract({
      address: testERC20Address as `0x${string}`,
      abi: SimpleERC20Abi.abi,
      functionName: "symbol",
    });
    const decimals = await publicClient.readContract({
      address: testERC20Address as `0x${string}`,
      abi: SimpleERC20Abi.abi,
      functionName: "decimals",
    });
    const faucetAmount = await publicClient.readContract({
      address: testERC20Address as `0x${string}`,
      abi: SimpleERC20Abi.abi,
      functionName: "FAUCET_AMOUNT",
    });

    console.log("📋 Token Details:");
    console.log("- Name:", name);
    console.log("- Symbol:", symbol);
    console.log("- Decimals:", decimals);
    console.log("- Faucet amount:", formatUnits(faucetAmount as bigint, decimals as number), symbol);

    // Check current token balance
    const currentBalance = await publicClient.readContract({
      address: testERC20Address as `0x${string}`,
      abi: SimpleERC20Abi.abi,
      functionName: "balanceOf",
      args: [userAddress],
    });
    console.log("💰 Current token balance:", formatUnits(currentBalance as bigint, decimals as number), symbol);

    // Check if user can claim from faucet
    const canClaim = await publicClient.readContract({
      address: testERC20Address as `0x${string}`,
      abi: SimpleERC20Abi.abi,
      functionName: "canClaimFromFaucet",
      args: [userAddress],
    });
    console.log("🚰 Can claim from faucet:", canClaim);

    if (!canClaim) {
      // Get next claim time
      const nextClaimTime = await publicClient.readContract({
        address: testERC20Address as `0x${string}`,
        abi: SimpleERC20Abi.abi,
        functionName: "getNextFaucetClaimTime",
        args: [userAddress],
      });
      const now = Math.floor(Date.now() / 1000);
      const waitTime = Number(nextClaimTime) - now;

      if (waitTime > 0) {
        const hours = Math.floor(waitTime / 3600);
        const minutes = Math.floor((waitTime % 3600) / 60);
        console.log(`⏰ Next claim available in: ${hours}h ${minutes}m`);
        console.log(`⏰ Next claim time: ${new Date(Number(nextClaimTime) * 1000).toLocaleString()}`);
      } else {
        console.log("🤔 Claim should be available, trying anyway...");
      }
    }

    if (canClaim) {
      console.log("🚰 Claiming tokens from faucet...");

      // Claim from faucet
      const claimTx = await wallet.writeContract({
        address: testERC20Address as `0x${string}`,
        abi: SimpleERC20Abi.abi,
        functionName: "claimFromFaucet",
        chain: peconomyNetwork,
        account: wallet.account as Account,
      });
      console.log("📝 Transaction sent:", claimTx);

      const receipt = await publicClient.waitForTransactionReceipt({ hash: claimTx });
      console.log("✅ Transaction confirmed in block:", receipt?.blockNumber);

      // Check new balance
      const newBalance = await publicClient.readContract({
        address: testERC20Address as `0x${string}`,
        abi: SimpleERC20Abi.abi,
        functionName: "balanceOf",
        args: [userAddress],
      });
      const received = ((newBalance as bigint) - (currentBalance as bigint)) as bigint;

      console.log("🎉 Faucet claim successful!");
      console.log("💰 Previous balance:", formatUnits(currentBalance as bigint, decimals as number), symbol);
      console.log("💰 New balance:", formatUnits(newBalance as bigint, decimals as number), symbol);
      console.log("🎁 Tokens received:", formatUnits(received as bigint, decimals as number), symbol);

      // Show next claim time
      const nextClaimTime = await publicClient.readContract({
        address: testERC20Address as `0x${string}`,
        abi: SimpleERC20Abi.abi,
        functionName: "getNextFaucetClaimTime",
        args: [userAddress],
      });
      console.log(`⏰ Next claim available at: ${new Date(Number(nextClaimTime) * 1000).toLocaleString()}`);
    } else {
      console.log("❌ Cannot claim from faucet at this time. Please wait for the cooldown period to end.");
    }
  } catch (error) {
    console.error("❌ Error during faucet claim:");

    // Show detailed error information
    if (error instanceof Error) {
      console.error("Error type:", error.constructor.name);
      console.error("Message:", error.message);

      // Handle specific errors
      if (error.message.includes("Faucet: Cooldown period not elapsed")) {
        console.error("💡 Hint: You need to wait 24 hours between faucet claims");
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
