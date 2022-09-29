import { useState, useEffect, useMemo } from 'react';
import type { NextPage } from 'next'
import { Button, Container, Typography, Stack, ImageList, ImageListItem, Select, MenuItem } from '@mui/material'
import { useConnection, useWallet, WalletContextState } from '@solana/wallet-adapter-react';
import { useMetaplex } from '../../hooks/useMetaplex';
import { Metadata, Metaplex, Nft } from '@metaplex-foundation/js';
import { AccountInfo, PublicKey, Transaction } from '@solana/web3.js';
import { EscrowConstraintModel, createCreateTrifleAccountInstruction } from '../../js/src/generated';
import { findAssociatedTokenAccountPda } from '@metaplex-foundation/js';
import { TOKEN_PROGRAM_ID } from "@solana/spl-token"
import { PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import { findEscrowPda, findTriflePda } from '../../helpers/pdas';
import { loadEscrowConstraintModels } from '../../helpers/loadEscrowConstraintModels';
import { toast } from 'react-toastify';

type EscrowConstraintModelWithPubkey = {
    pubkey: PublicKey,
    escrowConstraintModel: EscrowConstraintModel
}

const CreateTrifle: NextPage = () => {
    const wallet = useWallet();
    const { connection } = useConnection();
    const { metaplex } = useMetaplex();
    const [allNFTs, setAllNFTs] = useState<any[]>([]);
    // selected to become the base token
    const [selectedNFT, setSelectedNFT] = useState<any>(null);
    const [selectedEscrowConstraintModel, setSelectedEscrowConstraintModel] = useState<string>("");
    const [escrowConstraintModels, setEscrowConstraintModels] = useState<Record<string, EscrowConstraintModel>>({});

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

        loadEscrowConstraintModels(wallet.publicKey, connection).then(models => {
            setEscrowConstraintModels(models)
        });
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

    // TODO: type this function properly
    const handleCreateTrifleAccount = async (selectedNFT: any) => {
        if (!wallet.publicKey) {
            toast.error("Wallet not connected");
            return;
        }

        if (!selectedEscrowConstraintModel) {
            toast.error("Please select an escrow constraint model");
            return;
        }

        let selectedNFTTokenAccountAddress = findAssociatedTokenAccountPda(selectedNFT.address, wallet.publicKey);
        let selectedEscrowConstraintModelAddress = new PublicKey(selectedEscrowConstraintModel);
        let [trifleAddress] = await findTriflePda(selectedNFT.address, wallet.publicKey, selectedEscrowConstraintModelAddress);
        let [escrowAddress] = await findEscrowPda(selectedNFT.address, 1, trifleAddress);

        const tx = new Transaction();
        let args = {
            escrow: escrowAddress,
            metadata: selectedNFT.metadataAddress,
            mint: selectedNFT.address,
            tokenAccount: selectedNFTTokenAccountAddress,
            edition: selectedNFT.edition.address,
            trifleAccount: trifleAddress,
            trifleAuthority: wallet.publicKey,
            escrowConstraintModel: selectedEscrowConstraintModelAddress,
            payer: wallet.publicKey,
            tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
        };

        console.log(args);
        const instruction = createCreateTrifleAccountInstruction(args);

        try {
            tx.add(instruction);
            let sig = await wallet.sendTransaction(tx, connection, { skipPreflight: true })
            toast.success("Trifle account created");
            console.log(sig);
            window.location.href = `/trifle/${trifleAddress.toBase58()}`;
        } catch (e) {
            toast.error("Failed to create trifle account");
        }

    }

    const setSelectedModel = (input: any) => {
        setSelectedEscrowConstraintModel(input.target.value as string);
    }


    return (
        <Container fixed>
            <Typography variant="h1">Token Owned Escrow</Typography>
            <Stack direction="column">
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body1">
                        {selectedNFT ? `Selected NFT: ${selectedNFT.name}` : 'Select an NFT to become the base token'}
                    </Typography>
                    {selectedNFT ? <Button variant="contained" onClick={() => handleCreateTrifleAccount(selectedNFT)}>Create TOE</Button> : null}
                </Stack>
                <Select value={selectedEscrowConstraintModel} onChange={setSelectedModel}>
                    {Object.entries(escrowConstraintModels).map(([pubkey, ecm]) => {
                        console.log({ pubkey, ecm })
                        return <MenuItem value={pubkey}>{ecm.name}</MenuItem>
                    })}
                </Select>
            </Stack>
            <ImageList sx={{ width: 1120, height: 670 }} cols={5} rowHeight={220}>
                {allNFTs.map((nft) => (
                    <ImageListItem onClick={() => handleNFTClick(nft)} key={nft.address.toString()} sx={{ border: "1px solid red" }}>
                        <img
                            src={`${nft.json?.image}`}
                            alt={nft.json?.name}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Container >
    )
}

export default CreateTrifle 