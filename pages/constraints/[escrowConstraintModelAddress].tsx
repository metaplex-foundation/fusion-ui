import { useEffect, useState } from "react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { toast } from "react-toastify";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Container, Typography, Stack, Button, List, ListItem } from "@mui/material";
import { EscrowConstraintModel, EscrowConstraint, createAddNoneConstraintToEscrowConstraintModelInstruction, createAddCollectionConstraintToEscrowConstraintModelInstruction, createAddTokensConstraintToEscrowConstraintModelInstruction } from "../../js/src/generated";
import { EscrowConstraintForm } from "../../components/EscrowConstraintForm";
import { ConstraintType } from "../../helpers/constraintType";
import { findMetadataPda } from "@metaplex-foundation/js";

const ConstraintDetail: NextPage = () => {
    const router = useRouter();
    const { connection } = useConnection();
    const wallet = useWallet();
    const { escrowConstraintModelAddress } = router.query;
    const [escrowConstraintModel, setEscrowConstraintModel] = useState<EscrowConstraintModel | null>(null);
    const [showConstraintForm, setShowConstraintForm] = useState(false);

    useEffect(() => {
        const load = async () => {
            if (!escrowConstraintModelAddress) {
                return;
            }
            const maybeEscrowConstraintModel = await loadEscrowConstraintModel(new PublicKey(escrowConstraintModelAddress));
            console.log("escrow constraint model", maybeEscrowConstraintModel);
            setEscrowConstraintModel(maybeEscrowConstraintModel);
        }

        load().then(() => {
            console.log("loaded");
        });

    }, [escrowConstraintModelAddress])

    const loadEscrowConstraintModel = async (address: PublicKey): Promise<EscrowConstraintModel | null> => {
        const maybeEscrowConstraintModel = await connection.getAccountInfo(address);
        if (maybeEscrowConstraintModel?.data) {
            return EscrowConstraintModel.fromAccountInfo(maybeEscrowConstraintModel)[0];
        }
        return null;
    }

    const handleAddConstraintClick = async () => {
        setShowConstraintForm(true);
    }

    const handleConstraintFormSubmit = async (name: string, tokenLimit: number, tokens: PublicKey[], constraintType: ConstraintType) => {
        if (!wallet.publicKey) {
            toast.error("wallet disconnected");
            return;
        }

        let tx = new Transaction();
        const escrowConstraintModel = new PublicKey(escrowConstraintModelAddress as string);

        switch (constraintType) {
            case ConstraintType.None:
                tx.add(createAddNoneConstraintToEscrowConstraintModelInstruction({
                    escrowConstraintModel,
                    payer: wallet.publicKey,
                    updateAuthority: wallet.publicKey
                }, {
                    addNoneConstraintToEscrowConstraintModelArgs: { constraintName: name, tokenLimit }
                }));
                break;
            case ConstraintType.Collection:
                let [mint] = tokens;
                let metadataAddress = findMetadataPda(mint);
                tx.add(createAddCollectionConstraintToEscrowConstraintModelInstruction({
                    escrowConstraintModel,
                    payer: wallet.publicKey,
                    updateAuthority: wallet.publicKey,
                    collectionMint: mint,
                    collectionMintMetadata: metadataAddress,
                }, {
                    addCollectionConstraintToEscrowConstraintModelArgs: { constraintName: name, tokenLimit }
                }));
                break;
            case ConstraintType.Tokens:
                tx.add(createAddTokensConstraintToEscrowConstraintModelInstruction({
                    escrowConstraintModel,
                    payer: wallet.publicKey,
                    updateAuthority: wallet.publicKey,
                }, {
                    addTokensConstraintToEscrowConstraintModelArgs: { constraintName: name, tokenLimit, tokens }
                }))
                break;
            default:
                console.log("reached impossible default case");
        }

        let sig = await wallet.sendTransaction(tx, connection)

        // TODO: reset form and reload constraint model.
        await connection.confirmTransaction(sig);
        setShowConstraintForm(false);
        setEscrowConstraintModel(await loadEscrowConstraintModel(escrowConstraintModel));
    }

    return (
        <Container>
            <Typography variant="subtitle1">Escrow Constraint Model</Typography>
            <Typography variant="h1">{escrowConstraintModel?.name}</Typography>
            <Stack>
                <List>
                    {escrowConstraintModel ? Array.from(escrowConstraintModel.constraints.entries()).map(data => {
                        let [name, constraint] = data;
                        // constraint component goes here.
                        return (
                            <div>{name}</div>
                        )
                    }) : null}
                </List>
                {!showConstraintForm ? <Button variant="outlined" onClick={handleAddConstraintClick}>Add a Constraint</Button> : null}
                {showConstraintForm ? <EscrowConstraintForm onSubmit={handleConstraintFormSubmit} /> : null}
            </Stack>
        </Container>);
}

export default ConstraintDetail;