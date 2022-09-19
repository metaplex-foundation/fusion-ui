import { useEffect, useState } from "react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { toast } from "react-toastify";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Container, Typography, Stack, Button, List, ListItem } from "@mui/material";
import { EscrowConstraintModel, EscrowConstraint, createAddConstraintToEscrowConstraintModelInstruction } from "../../js/src/generated";
import { EscrowConstraintForm } from "../../components/EscrowConstraintForm";

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

    const handleConstraintFormSubmit = async (constraint: EscrowConstraint) => {
        if (!wallet.publicKey) {
            toast.error("wallet disconnected");
            return;
        }

        let tx = new Transaction();
        let ix = createAddConstraintToEscrowConstraintModelInstruction({
            escrowConstraintModel: new PublicKey(escrowConstraintModelAddress as string),
            payer: wallet.publicKey,
            updateAuthority: wallet.publicKey
        }, {
            addConstraintToEscrowConstraintModelArgs: {
                constraint
            }
        });

        tx.add(ix);

        const sig = await wallet.sendTransaction(tx, connection)
        console.log({ sig });

        setShowConstraintForm(false)
    }

    return (
        <Container>
            <Typography variant="h1">{escrowConstraintModel?.name}</Typography>
            <Typography variant="subtitle1">Escrow Constraint Model</Typography>
            <Stack>
                <List>
                    {escrowConstraintModel ? escrowConstraintModel.constraints.map(constraint => (
                        <ListItem>{constraint.name}</ListItem>
                    )) : null}
                    <ListItem></ListItem>
                </List>
                {!showConstraintForm ? <Button variant="outlined" onClick={handleAddConstraintClick}>Add a Constraint</Button> : null}
                {showConstraintForm ? <EscrowConstraintForm onSubmit={handleConstraintFormSubmit} /> : null}
            </Stack>
        </Container>);
}

export default ConstraintDetail;