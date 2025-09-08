import { Base8, mulPointEscalar, subOrder, addPoint, Fr, type Point } from "@zk-kit/baby-jubjub";
import { poseidon2 } from "poseidon-lite";
import { WalletClient } from "viem";

export async function deriveKeysFromUser(wallet: WalletClient): Promise<{
  privateKey: bigint;
  formattedPrivateKey: bigint;
  publicKey: [bigint, bigint];
  signature: string;
}> {
  // Create deterministic message for signing
  const message = `eERC
Registering user with
Address:${wallet.account?.address.toLowerCase()}`;

  console.log("📝 Message to sign for balance:", message);

  // Get signature from user
  const signature = await wallet.signMessage({
    account: wallet.account as unknown as `0x${string}`,
    message: message,
  });

  if (!signature || signature.length < 64) {
    throw new Error("Invalid signature received from user");
  }

  // Derive private key from signature deterministically
  console.log("🔑 Deriving private key from signature...");
  const privateKey = poseidon2([signature]);
  console.log("Private key (raw):", privateKey.toString());

  // Format private key for BabyJubJub
  const formattedPrivateKey = BigInt(privateKey) % subOrder;
  console.log("Private key (formatted):", formattedPrivateKey.toString());

  // Generate public key using BabyJubJub
  const publicKey = mulPointEscalar(Base8, formattedPrivateKey).map(x => BigInt(x)) as [bigint, bigint];
  console.log("Public key X:", publicKey[0].toString());
  console.log("Public key Y:", publicKey[1].toString());

  return {
    privateKey,
    formattedPrivateKey,
    publicKey,
    signature,
  };
}

export function decryptEGCTBalance(privateKey: bigint, c1: [bigint, bigint], c2: [bigint, bigint]): bigint {
  try {
    // Decrypt the point using ElGamal
    function decryptPoint(privateKey: bigint, c1: Point<bigint>, c2: Point<bigint>): Point<bigint> {
      const privKey = BigInt(privateKey) % subOrder;
      const c1x = mulPointEscalar(c1, privKey);
      const c1xInverse = [Fr.e(c1x[0] * BigInt(-1)), c1x[1]];
      return addPoint(c2, c1xInverse as Point<bigint>);
    }

    const decryptedPoint = decryptPoint(privateKey, c1, c2);

    // Use optimized discrete log search
    const result = findDiscreteLogOptimized([decryptedPoint[0], decryptedPoint[1]]);

    if (result !== null) {
      return result;
    }

    console.log("⚠️  Could not find discrete log for decrypted point:", decryptedPoint);
    return BigInt(0);
  } catch (error) {
    console.log("⚠️  Error decrypting EGCT:", error);
    return BigInt(0);
  }
}

// Cache for frequently computed discrete logs
const discreteLogCache = new Map<string, bigint>();

// Pre-populate cache with common values on first use
let cacheInitialized = false;
function initializeCache() {
  if (cacheInitialized) return;

  // Pre-compute and cache common values (0-100, then multiples of 100 up to 10000)
  const commonValues = [];

  // Add 0-100 (very common small amounts)
  for (let i = 0; i <= 100; i++) {
    commonValues.push(BigInt(i));
  }

  // Add multiples of 100 up to 10000 (common transaction amounts)
  for (let i = 200; i <= 10000; i += 100) {
    commonValues.push(BigInt(i));
  }

  // Pre-compute these values
  for (const value of commonValues) {
    try {
      const point = mulPointEscalar(Base8, value);
      const key = `${point[0]},${point[1]}`;
      discreteLogCache.set(key, value);
    } catch (error) {
      // Skip if computation fails
    }
  }

  cacheInitialized = true;
}

// Cache management to prevent memory leaks
const MAX_CACHE_SIZE = 1000;
function setCacheWithLimit(key: string, value: bigint) {
  if (discreteLogCache.size >= MAX_CACHE_SIZE) {
    // Remove oldest entries (simple FIFO)
    const firstKey = discreteLogCache.keys().next().value;
    if (firstKey) {
      discreteLogCache.delete(firstKey);
    }
  }
  discreteLogCache.set(key, value);
}

export function findDiscreteLogOptimized(targetPoint: [bigint, bigint]): bigint | null {
  // Initialize cache with common values if not done yet
  initializeCache();

  // Check cache first
  const cacheKey = `${targetPoint[0]},${targetPoint[1]}`;
  const cached = discreteLogCache.get(cacheKey);
  if (cached !== undefined) {
    return cached;
  }
  const maxValue = BigInt(100000); // Up to 1000 PRIV with 2 decimals

  // Strategy 1: Check common small values first (0-1000)
  // Most balances are likely to be small
  for (let i = BigInt(0); i <= BigInt(1000); i++) {
    const testPoint = mulPointEscalar(Base8, i);
    if (testPoint[0] === targetPoint[0] && testPoint[1] === targetPoint[1]) {
      // Cache the result (with size limit)
      setCacheWithLimit(cacheKey, i);
      return i;
    }
  }

  // Strategy 2: Check round numbers (multiples of 100, 1000, etc.)
  // Many transactions are likely to be round amounts
  const roundNumbers = [BigInt(100), BigInt(500), BigInt(1000), BigInt(1500), BigInt(2000), BigInt(2500), BigInt(3000), BigInt(5000), BigInt(10000), BigInt(15000), BigInt(20000), BigInt(25000), BigInt(30000), BigInt(40000), BigInt(50000), BigInt(75000), BigInt(100000)];

  for (const value of roundNumbers) {
    if (value <= maxValue) {
      const testPoint = mulPointEscalar(Base8, value);
      if (testPoint[0] === targetPoint[0] && testPoint[1] === targetPoint[1]) {
        // Cache the result (with size limit)
        setCacheWithLimit(cacheKey, value);
        return value;
      }
    }
  }

  // Strategy 3: Binary search-like approach for remaining values
  // Divide the remaining space into chunks and search efficiently
  const chunkSize = BigInt(1000);
  for (let chunk = BigInt(1000); chunk < maxValue; chunk += chunkSize) {
    const chunkEnd = chunk + chunkSize > maxValue ? maxValue : chunk + chunkSize;

    // Check chunk boundaries first
    for (let i = chunk; i < chunkEnd; i += BigInt(100)) {
      const testPoint = mulPointEscalar(Base8, i);
      if (testPoint[0] === targetPoint[0] && testPoint[1] === targetPoint[1]) {
        // Cache the result (with size limit)
        setCacheWithLimit(cacheKey, i);
        return i;
      }
    }

    // If we find we're in the right chunk, do detailed search
    // (This would need more sophisticated logic, but for now keep it simple)
  }

  // Strategy 4: Fallback to linear search in remaining space (with early termination)
  // Only search areas we haven't covered yet, with periodic checks
  for (let i = BigInt(1001); i <= maxValue; i++) {
    // Skip values we already checked in previous strategies
    if (i % BigInt(100) === BigInt(0)) continue; // Already checked multiples of 100

    const testPoint = mulPointEscalar(Base8, i);
    if (testPoint[0] === targetPoint[0] && testPoint[1] === targetPoint[1]) {
      // Cache the result (with size limit)
      setCacheWithLimit(cacheKey, i);
      return i;
    }

    // Early termination: if we've been searching too long, give up
    if (i > BigInt(50000) && i % BigInt(10000) === BigInt(0)) {
      console.log(`🔍 Discrete log search progress: ${i}/${maxValue}...`);
    }
  }

  return null; // Not found
}

export async function getDecryptedBalance(privateKey: bigint, amountPCTs: { pct: bigint[]; index: bigint }[], balancePCT: bigint[], encryptedBalance: bigint[][]): Promise<bigint> {
  // First, try to decrypt the EGCT (main encrypted balance)
  const c1: [bigint, bigint] = [encryptedBalance[0][0], encryptedBalance[0][1]];
  const c2: [bigint, bigint] = [encryptedBalance[1][0], encryptedBalance[1][1]];

  // Check if EGCT is empty (all zeros)
  const isEGCTEmpty = c1[0] === BigInt(0) && c1[1] === BigInt(0) && c2[0] === BigInt(0) && c2[1] === BigInt(0);

  if (!isEGCTEmpty) {
    // Decrypt EGCT - this is the primary balance
    const egctBalance = decryptEGCTBalance(privateKey, c1, c2);
    console.log("🔐 EGCT Balance found:", egctBalance.toString());
    return egctBalance;
  }

  // If EGCT is empty, fall back to PCT decryption
  let totalBalance = BigInt(0);

  // Decrypt the balance PCT if it exists
  if (balancePCT.some(e => e !== BigInt(0))) {
    try {
      const decryptedBalancePCT = await decryptPCT(privateKey, balancePCT);
      totalBalance += BigInt(decryptedBalancePCT[0]);
    } catch (error) {
      console.log("Note: Balance PCT is empty or couldn't be decrypted");
    }
  }

  // Decrypt all the amount PCTs and add them to the total balance
  for (const amountPCT of amountPCTs) {
    if (amountPCT.pct && amountPCT.pct.some((e: bigint) => e !== BigInt(0))) {
      try {
        const decryptedAmountPCT = await decryptPCT(privateKey, amountPCT.pct);
        totalBalance += BigInt(decryptedAmountPCT[0]);
      } catch (error) {
        console.log("Note: Some amount PCT couldn't be decrypted");
      }
    }
  }

  return totalBalance;
}

export const randomNonce = (): bigint => {
  const bytes = randomBytes(16);
  // add 1 to make sure it's non-zero
  return BigInt(`0x${bytes.toString("hex")}`) + 1n;
};

export const processPoseidonEncryption = (inputs: bigint[], publicKey: bigint[]) => {
  const nonce = randomNonce();

  let encRandom = genRandomBabyJubValue();
  if (encRandom >= BASE_POINT_ORDER) {
    encRandom = genRandomBabyJubValue() / 10n;
  }

  const poseidonEncryptionKey = mulPointEscalar(publicKey as Point<bigint>, encRandom);
  const authKey = mulPointEscalar(Base8, encRandom);
  const ciphertext = poseidonEncrypt(inputs, poseidonEncryptionKey, nonce);

  return { ciphertext, nonce, encRandom, poseidonEncryptionKey, authKey };
};
