import { PublicKey } from "@solana/web3.js";
import { PROGRAM_ADDRESS } from "../js/src/generated";

export const findTriflePda = async (mint: PublicKey) => {
  return await PublicKey.findProgramAddress(
    [],
    new PublicKey(PROGRAM_ADDRESS),
  );
};

export const findEscrowPda = async () => {
  return await PublicKey.findProgramAddress(
    [],
    new PublicKey(PROGRAM_ADDRESS),
  );
};
