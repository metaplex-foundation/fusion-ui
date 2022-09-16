import { useEffect, useState } from "react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { toast } from "react-toastify";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Container, Typography, Stack, Button, List, ListItem } from "@mui/material";
import { EscrowConstraintModel, EscrowConstraint } from "../../js/src/generated";
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
                {showConstraintForm ? <EscrowConstraintForm setFormVisible={setShowConstraintForm} onSubmit={async () => { }} /> : null}
            </Stack>
        </Container>);
}

export default ConstraintDetail;