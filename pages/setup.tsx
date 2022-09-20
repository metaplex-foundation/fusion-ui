import { useEffect, useState } from "react";
import type { NextPage } from "next";
import type { IdentitySigner } from "@metaplex-foundation/js";
import { token } from "@metaplex-foundation/js";
import { Box, Container, Stack, Typography, Button, List, ListItem } from "@mui/material";
import { PublicKey, Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useMetaplex } from "../hooks/useMetaplex";
import { toast } from "react-toastify";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

export const Setup: NextPage = () => {
    const wallet = useWallet();
    const { connection } = useConnection();
    const { metaplex } = useMetaplex();

    useEffect(() => {
        if (!wallet.publicKey) {
            return;
        }

        connection.getTokenAccountsByOwner(wallet.publicKey, { programId: TOKEN_PROGRAM_ID }).then(result => {
            console.log({ result });
        });
    }, [wallet.publicKey]);

    const setupAttributeNFTs = async () => {
        if (!wallet.publicKey) {
            toast.error("wallet not connected");
            return;
        }

        if (!metaplex) {
            toast.error("metaplex not initialized");
            return;
        }

        await metaplex
            .nfts()
            .createSft({
                uri: "http://localhost:8080/assets/Chain.json",
                name: "Test Dino Chain",
                sellerFeeBasisPoints: 500, // Represents 5.00%.
                tokenOwner: wallet.publicKey,
                tokenAmount: token(1),
            })
            .run();

        await metaplex
            .nfts()
            .createSft({
                uri: "http://localhost:8080/assets/Dragon_Breath.json",
                name: "Test Dino Dragon Breath",
                sellerFeeBasisPoints: 500, // Represents 5.00%.
                tokenOwner: wallet.publicKey,
                tokenAmount: token(1),
            })
            .run();

        await metaplex
            .nfts()
            .createSft({
                uri: "http://localhost:8080/assets/Piercing.json",
                name: "Test Dino Piercing",
                sellerFeeBasisPoints: 500, // Represents 5.00%.
                tokenOwner: wallet.publicKey,
                tokenAmount: token(1),
            })
            .run();
    }

    const setupEmptyBaseToken = async () => {
        if (!wallet.publicKey) {
            toast.error("wallet not connected");
            return;
        }

        if (!metaplex) {
            toast.error("metaplex not initialized");
            return;
        }

        await metaplex
            .nfts()
            .createSft({
                uri: "http://localhost:8080/assets/EmptyBase.json",
                name: "Test Dino Empty Base",
                sellerFeeBasisPoints: 500, // Represents 5.00%.
                tokenOwner: wallet.publicKey,
                tokenAmount: token(1),
            })
            .run();
    }

    return <Container fixed>
        <Typography variant="h1">Setup</Typography>
        <Typography variant="subtitle1">Create attribute NFTs to use use with a TOE</Typography>
        <Box sx={{ marginTop: 8 }}>
            <Stack direction="column" spacing={2}>
                <Button variant="outlined" onClick={setupAttributeNFTs}>Create Attribute NFTs</Button>
                <Button variant="outlined" onClick={setupEmptyBaseToken}>Create an empty Base Token</Button>
            </Stack>
        </Box>
    </Container>
}

export default Setup