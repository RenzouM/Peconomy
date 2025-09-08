/* Type definitions for zkit circuits */

export type Groth16ProofPoints = {
  a: readonly [bigint, bigint];
  b: readonly [readonly [bigint, bigint], readonly [bigint, bigint]];
  c: readonly [bigint, bigint];
};

export type CalldataTransferCircuitGroth16 = {
  proofPoints: Groth16ProofPoints;
  publicSignals: bigint[];
};

export type CalldataWithdrawCircuitGroth16 = {
  proofPoints: Groth16ProofPoints;
  publicSignals: bigint[];
};
