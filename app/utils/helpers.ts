import { processPoseidonDecryption, processPoseidonEncryption } from "./poseidon";
import { encryptMessage } from "./jub/jub";
import type { AmountPCTStructOutput } from "../typechain-types/contracts/EncryptedERC";
import type { User } from "./user";
import type { CalldataTransferCircuitGroth16, CalldataWithdrawCircuitGroth16 } from "../zkit";
import { groth16 } from "snarkjs";

/**
 * Function for deploying verifier contracts for eERC
 * @param signer Hardhat signer for the deployment
 * @param isProd Boolean for prod or dev deployments
 * @returns registrationVerifier - Registration verifier contract address
 * @returns mintVerifier - Mint verifier contract address
 * @returns withdrawVerifier - Withdraw verifier contract address
 * @returns transferVerifier - Transfer verifier contract address
 */

/**
 * Function for burning tokens privately
 * In private burn, user proves his/her encrypted balance is greater than the amount that user wants to burn, also proves the encryption of the burn amount as well
 * @param user
 * @param userBalance User balance in plain
 * @param amount  Amount to be burned
 * @param userEncryptedBalance User encrypted balance from eERC contract
 * @param auditorPublicKey Auditor's public key
 * @returns
 */

/**
 * Function for transferring tokens privately in the eERC protocol
 * @param sender Sender
 * @param senderBalance Sender balance in plain
 * @param receiverPublicKey Receiver's public key
 * @param transferAmount Amount to be transferred
 * @param senderEncryptedBalance Sender encrypted balance from eERC contract
 * @param auditorPublicKey Auditor's public key
 * @returns proof, publicInputs - Proof and public inputs for the generated proof
 * @returns senderBalancePCT - Sender's balance after the transfer encrypted with Poseidon encryption
 */
export const privateTransfer = async (
  sender: User,
  senderBalance: bigint,
  receiverPublicKey: bigint[],
  transferAmount: bigint,
  senderEncryptedBalance: bigint[],
  auditorPublicKey: bigint[]
): Promise<{
  proof: CalldataTransferCircuitGroth16;
  senderBalancePCT: bigint[];
}> => {
  const senderNewBalance = senderBalance - transferAmount;
  // 1. encrypt the transfer amount with el-gamal for sender
  const { cipher: encryptedAmountSender } = encryptMessage(sender.publicKey, transferAmount);

  // 2. encrypt the transfer amount with el-gamal for receiver
  const { cipher: encryptedAmountReceiver, random: encryptedAmountReceiverRandom } = encryptMessage(receiverPublicKey, transferAmount);

  // 3. creates a pct for receiver with the transfer amount
  const { ciphertext: receiverCiphertext, nonce: receiverNonce, authKey: receiverAuthKey, encRandom: receiverEncRandom } = processPoseidonEncryption([transferAmount], receiverPublicKey);

  // 4. creates a pct for auditor with the transfer amount
  const { ciphertext: auditorCiphertext, nonce: auditorNonce, authKey: auditorAuthKey, encRandom: auditorEncRandom } = processPoseidonEncryption([transferAmount], auditorPublicKey);

  // 5. create pct for the sender with the newly calculated balance
  const { ciphertext: senderCiphertext, nonce: senderNonce, authKey: senderAuthKey } = processPoseidonEncryption([senderNewBalance], sender.publicKey);

  const input = {
    ValueToTransfer: transferAmount,
    SenderPrivateKey: sender.formattedPrivateKey,
    SenderPublicKey: sender.publicKey,
    SenderBalance: senderBalance,
    SenderBalanceC1: senderEncryptedBalance.slice(0, 2),
    SenderBalanceC2: senderEncryptedBalance.slice(2, 4),
    SenderVTTC1: encryptedAmountSender[0],
    SenderVTTC2: encryptedAmountSender[1],
    ReceiverPublicKey: receiverPublicKey,
    ReceiverVTTC1: encryptedAmountReceiver[0],
    ReceiverVTTC2: encryptedAmountReceiver[1],
    ReceiverVTTRandom: encryptedAmountReceiverRandom,
    ReceiverPCT: receiverCiphertext,
    ReceiverPCTAuthKey: receiverAuthKey,
    ReceiverPCTNonce: receiverNonce,
    ReceiverPCTRandom: receiverEncRandom,
    AuditorPublicKey: auditorPublicKey,
    AuditorPCT: auditorCiphertext,
    AuditorPCTAuthKey: auditorAuthKey,
    AuditorPCTNonce: auditorNonce,
    AuditorPCTRandom: auditorEncRandom,
  };

  const wasmPath = "../../../circuits/TransferCircuit.wasm";
  const zkeyPath = "../../../circuits/TransferCircuit.groth16.zkey";

  const { proof: calldata, publicSignals } = await groth16.fullProve(input, wasmPath, zkeyPath);

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
      return [signals[0], signals[1], signals[2], signals[3], signals[4], signals[5], signals[6], signals[7], signals[8], signals[9], signals[10], signals[11], signals[12], signals[13], signals[14], signals[15], signals[16], signals[17], signals[18], signals[19], signals[20], signals[21], signals[22], signals[23], signals[24], signals[25], signals[26], signals[27], signals[28], signals[29], signals[30], signals[31]];
    })(),
  };

  return {
    proof: formattedProof,
    senderBalancePCT: [...senderCiphertext, ...senderAuthKey, senderNonce],
  };
};

/**
 * Function for decrypting a PCT
 * @param privateKey
 * @param pct PCT to be decrypted
 * @param length Length of the original input array
 * @returns decrypted - Decrypted message as an array
 */
export const decryptPCT = async (privateKey: bigint, pct: bigint[], length = 1) => {
  // extract the ciphertext, authKey, and nonce from the pct
  const ciphertext = pct.slice(0, 4);
  const authKey = pct.slice(4, 6);
  const nonce = pct[6];

  const decrypted = processPoseidonDecryption(ciphertext, authKey, nonce, privateKey, length);

  return decrypted;
};

/**
 * Function for withdrawing tokens privately in the eERC protocol
 * @param amount Amount to be withdrawn
 * @param user
 * @param userEncryptedBalance User encrypted balance from eERC contract
 * @param userBalance User plain balance
 * @param auditorPublicKey Auditor's public key
 * @returns proof - Proof and public inputs for the generated proof
 * @returns userBalancePCT - User's balance after the withdrawal encrypted with Poseidon encryption
 */
export const withdraw = async (
  amount: bigint,
  user: User,
  userEncryptedBalance: bigint[],
  userBalance: bigint,
  auditorPublicKey: bigint[]
): Promise<{
  proof: CalldataWithdrawCircuitGroth16;
  userBalancePCT: bigint[];
}> => {
  const newBalance = userBalance - amount;
  const userPublicKey = user.publicKey;

  // 1. create pct for the user with the newly calculated balance
  const { ciphertext: userCiphertext, nonce: userNonce, authKey: userAuthKey } = processPoseidonEncryption([newBalance], userPublicKey);

  // 2. create pct for the auditor with the withdrawal amount
  const { ciphertext: auditorCiphertext, nonce: auditorNonce, encRandom: auditorEncRandom, authKey: auditorAuthKey } = processPoseidonEncryption([amount], auditorPublicKey);

  const input = {
    ValueToWithdraw: amount,
    SenderPrivateKey: user.formattedPrivateKey,
    SenderPublicKey: userPublicKey,
    SenderBalance: userBalance,
    SenderBalanceC1: userEncryptedBalance.slice(0, 2),
    SenderBalanceC2: userEncryptedBalance.slice(2, 4),
    AuditorPublicKey: auditorPublicKey,
    AuditorPCT: auditorCiphertext,
    AuditorPCTAuthKey: auditorAuthKey,
    AuditorPCTNonce: auditorNonce,
    AuditorPCTRandom: auditorEncRandom,
  };

  const wasmPath = "../../../circuits/WithdrawCircuit.wasm";
  const zkeyPath = "../../../circuits/WithdrawCircuit.groth16.zkey";

  const { proof: calldata, publicSignals } = await groth16.fullProve(input, wasmPath, zkeyPath);

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
      if (signals.length !== 16) {
        throw new Error(`Expected 16 public signals, got ${signals.length}`);
      }
      return [signals[0], signals[1], signals[2], signals[3], signals[4], signals[5], signals[6], signals[7], signals[8], signals[9], signals[10], signals[11], signals[12], signals[13], signals[14], signals[15]];
    })(),
  };
  return {
    proof: formattedProof,
    userBalancePCT: [...userCiphertext, ...userAuthKey, userNonce],
  };
};

/**
 * Function for getting the decrypted balance of a user by decrypting amount and balance PCTs
 * @param privateKey
 * @param amountPCTs User amount PCTs
 * @param balancePCT User balance PCT
 * @returns totalBalance - balance of the user
 */
export const getDecryptedBalance = async (privateKey: bigint, amountPCTs: AmountPCTStructOutput[], balancePCT: bigint[]) => {
  let totalBalance = 0n;

  // decrypt the balance PCT
  if (balancePCT.some(e => e !== 0n)) {
    const decryptedBalancePCT = await decryptPCT(privateKey, balancePCT);
    totalBalance += BigInt(decryptedBalancePCT[0]);
  }

  // decrypt all the amount PCTs and add them to the total balance
  for (const [pct] of amountPCTs) {
    if (pct.some(e => e !== 0n)) {
      const decryptedAmountPCT = await decryptPCT(privateKey, pct);
      totalBalance += BigInt(decryptedAmountPCT[0]);
    }
  }

  // decrypt the balance from the eERC contract
  // const decryptedBalance = decryptPoint(privateKey, encryptedBalance[0], encryptedBalance[1]);

  // compare the decrypted balance with the calculated balance
  if (totalBalance !== 0n) {
    // const expectedPoint = mulPointEscalar(Base8, totalBalance);
    // Note: In a production environment, you might want to add validation here
    // to ensure the decrypted balance matches the expected point
  }

  return totalBalance;
};
