import {
  findAssociatedTokenAccountPda,
  Nft,
  NftWithToken,
  Pda,
  SftWithToken,
} from "@metaplex-foundation/js";
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  createCreateEscrowAccountInstruction,
  createTransferIntoEscrowInstruction,
} from "../js/src/generated";
import { findToePda } from "./pdas";
import { AccountLayout, getAssociatedTokenAddress } from "@solana/spl-token";
import { Wallet, WalletContextState } from "@solana/wallet-adapter-react";

export const createTOE = async (
  connection: Connection,
  nft: NftWithToken,
  wallet: WalletContextState,
) => {
  let escrowAccountAddress = await findToePda(nft.mint.address);

  let createIX = createCreateEscrowAccountInstruction(
    {
      escrow: escrowAccountAddress[0],
      metadata: nft.metadataAddress,
      mint: nft.mint.address,
      edition: nft.edition.address,
      payer: wallet.publicKey!,
    },
  );

  let tx = new Transaction().add(createIX);

  const { blockhash } = await connection.getLatestBlockhash();
  tx.recentBlockhash = blockhash;
  tx.feePayer = wallet.publicKey!;
  await wallet.sendTransaction(tx, connection);

  return escrowAccountAddress;
};

export const transferIn = async (
  connection: Connection,
  escrowNft: NftWithToken,
  escrowAccountAddress: PublicKey,
  nft: NftWithToken | SftWithToken,
  keypair: Keypair,
) => {
  let dst: PublicKey = await getAssociatedTokenAddress(
    nft.mint.address,
    escrowAccountAddress,
    true,
  );
  console.log("dst:");
  console.log(dst.toString());
  let transferIX = createTransferIntoEscrowInstruction(
    {
      escrow: escrowAccountAddress,
      payer: keypair.publicKey,
      attributeMint: nft.mint.address,
      attributeSrc: nft.token.address,
      attributeDst: dst,
      attributeMetadata: nft.metadataAddress,
      escrowMint: escrowNft.mint.address,
      escrowAccount: escrowNft.token.address,
      constraintModel: new PublicKey(
        "CjWwgEJUBdb2iYjZsDng5qkYRC8f3rQeqr4k1j9jExr5",
      ),
    },
    {
      transferIntoEscrowArgs: { amount: 1, index: 0 },
    },
  );

  let tx = new Transaction().add(transferIX);

  // let accountInfo = await connection.getAccountInfo(nft.token.address);
  // if (accountInfo){
  //     let account = AccountLayout.decode(accountInfo.data);
  //     console.log(account);
  // }

  const { blockhash } = await connection.getLatestBlockhash();
  tx.recentBlockhash = blockhash;
  tx.feePayer = keypair.publicKey;
  console.log(tx);
  await connection.sendTransaction(tx, [keypair], { skipPreflight: true });
};
