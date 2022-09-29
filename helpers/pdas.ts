import { PublicKey } from "@solana/web3.js";
import { PROGRAM_ADDRESS } from "../js/src/generated";
import { PROGRAM_ADDRESS as TOKEN_METADATA_PROGRAM_ADDRESS } from "@metaplex-foundation/mpl-token-metadata";

export const findTriflePda = async (
  mint: PublicKey,
  authority: PublicKey,
  escrow_constraint_model: PublicKey,
) => {
  return await PublicKey.findProgramAddress(
    [
      Buffer.from("trifle"),
      mint.toBuffer(),
      authority.toBuffer(),
      escrow_constraint_model.toBuffer(),
    ],
    new PublicKey(PROGRAM_ADDRESS),
  );
};

// does not support token owned, only creator owned
// export const findEscrowPda = async (mint: PublicKey, authority: PublicKey) => {
//   return await PublicKey.findProgramAddress(
//     [
//       Buffer.from("metadata"),
//       new PublicKey(TOKEN_METADATA_PROGRAM_ADDRESS).toBuffer(),
//       mint.toBuffer(),
//       Uint8Array.from([1]),
//       authority.toBuffer(),
//       Buffer.from("escrow"),
//     ],
//     new PublicKey(TOKEN_METADATA_PROGRAM_ADDRESS),
//   );
// };
export const findEscrowPda = async (
  mint: PublicKey,
  authority: 0 | 1,
  creator?: PublicKey,
) => {
  let seeds = [
    Buffer.from("metadata"),
    new PublicKey(TOKEN_METADATA_PROGRAM_ADDRESS).toBuffer(),
    mint.toBuffer(),
    Uint8Array.from([authority]),
  ];

  if (authority == 1) {
    if (creator) {
      seeds.push(creator.toBuffer());
    } else {
      throw new Error("Creator is required");
    }
  }

  seeds.push(Buffer.from("escrow"));
  return await PublicKey.findProgramAddress(
    seeds,
    new PublicKey(TOKEN_METADATA_PROGRAM_ADDRESS),
  );
};
