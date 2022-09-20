import { useState, useEffect, useMemo } from 'react';
import type { NextPage } from 'next'
import { Button, Container, Typography, Stack, ImageList, ImageListItem } from '@mui/material'
import { useConnection, useWallet, WalletContextState } from '@solana/wallet-adapter-react';
import { createTOE, transferIn } from '../../helpers/toe';
import { useMetaplex } from '../../hooks/useMetaplex';
import { Metadata, Metaplex, Nft } from '@metaplex-foundation/js';

const Toe: NextPage = () => {
    const wallet = useWallet();
    const { connection } = useConnection();
    const { metaplex } = useMetaplex();
    const [allNFTs, setAllNFTs] = useState<any[]>([]);
    // selected to become the base token
    const [selectedNFT, setSelectedNFT] = useState<any>(null);

    useEffect(() => {
        if (!wallet.publicKey) {
            return;
        }
        if (!metaplex) {
            return;
        }

        loadNFTs(metaplex, wallet).then((nfts) => {
            setAllNFTs(nfts)
        })
    }, [wallet.publicKey, metaplex])

    const loadNFTs = async (metaplex: Metaplex, wallet: WalletContextState) => {
        const lazyNfts = await metaplex.nfts().findAllByOwner({ owner: wallet.publicKey! }).run();
        const nftPromises = lazyNfts.map((nft) => {
            return metaplex.nfts().findByMint({ mintAddress: (nft as Metadata).mintAddress }).run();
        });

        return await Promise.all(nftPromises);
    }

    const handleNFTClick = (nft: Metadata) => {
        console.log({ nft });
        setSelectedNFT(nft);
    }


    return (
        <Container fixed>
            <Typography variant="h1">Token Owned Escrow</Typography>
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="body1">
                    {selectedNFT ? `Selected NFT: ${selectedNFT.name}` : 'Select an NFT to become the base token'}
                </Typography>
                {selectedNFT ? <Button variant="contained" onClick={() => createTOE(connection, selectedNFT, wallet)}>Create TOE</Button> : null}
            </Stack>
            <Stack direction="column" spacing={2}>
                <ImageList sx={{ width: 1120, height: 220 }} cols={5} rowHeight={220}>
                    {allNFTs.map((nft) => (
                        <ImageListItem onClick={() => handleNFTClick(nft)} key={nft.json.image} sx={{ border: "1px solid red" }}>
                            <img
                                src={`${nft.json.image}`}
                                alt={nft.json.name}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Stack>
        </Container>
    )
}

export default Toe