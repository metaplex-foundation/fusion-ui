import { Metadata, Metaplex } from "@metaplex-foundation/js";
import { WalletContextState } from "@solana/wallet-adapter-react";

export const loadNFTs = async (
  metaplex: Metaplex,
  wallet: WalletContextState,
) => {
  const lazyNfts = await metaplex.nfts().findAllByOwner({
    owner: wallet.publicKey!,
  }).run();
  const nftPromises = lazyNfts.map((nft) => {
    return metaplex.nfts().findByMint({
      mintAddress: (nft as Metadata).mintAddress,
    }).run();
  });

  return await Promise.all(nftPromises);
};
