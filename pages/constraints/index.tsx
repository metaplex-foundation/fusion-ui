import { createRef, useState, useEffect } from 'react';
import { Typography, Box, TextField, Container, Stack, Button } from '@mui/material'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, Transaction } from '@solana/web3.js'
import type { NextPage } from 'next'
import { toast } from 'react-toastify';
import { createCreateEscrowConstraintModelAccountInstruction, PROGRAM_ID } from '../../trifle_js/src/generated'
import { loadEscrowConstraintModels } from '../../helpers/loadEscrowConstraintModels';

const Constraints: NextPage = () => {
    const wallet = useWallet();
    const { connection } = useConnection();
    const nameInputRef = createRef<HTMLInputElement>();
    const constraintModels = useState<any[]>([]);

    useEffect(() => {
        if (!wallet.publicKey) {
            return;
        }
        loadEscrowConstraintModels(wallet.publicKey, connection);
    }, [wallet.publicKey]);


    const createEscrowConstraintModelAccount = async (name: string) => {
        if (!wallet.publicKey) {
            return;
        }

        const [escrowConstraintModelAddress, _escrowConstraintModelAddressBump] = PublicKey.findProgramAddressSync([
            Buffer.from("escrow"),
            wallet.publicKey.toBuffer(),
            Buffer.from(name)
        ], PROGRAM_ID);

        const ix = createCreateEscrowConstraintModelAccountInstruction({
            escrowConstraintModel: escrowConstraintModelAddress,
            payer: wallet.publicKey,
            updateAuthority: wallet.publicKey
        }, {
            createEscrowConstraintModelAccountArgs: { name, schemaUri: "http://localhost:8080/assets/schema.json" }
        });


        const tx = new Transaction();
        tx.add(ix);

        try {
            const sig = await wallet.sendTransaction(tx, connection, { skipPreflight: true });
            toast.success("Transaction Success");
            console.log({ sig });
            window.location.href = `constraints/${escrowConstraintModelAddress}`;
        } catch (e) {
            console.log(e);
            toast.error("Transaction Failed");
        }


    }
    return (
        <Container fixed>
            <Stack direction="column" spacing={2}>
                <Typography variant="h1">Create A Constraint Model</Typography>
                <Typography variant="body1">Explaination will go here</Typography>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    onSubmit={(e) => {
                        e.preventDefault();
                        const name = nameInputRef.current?.value as string;
                        createEscrowConstraintModelAccount(name);
                    }}
                >
                    <Stack direction="column" spacing={2}>
                        <TextField id="name" label="Name" variant="outlined" inputRef={nameInputRef} />
                        <Button variant="outlined" type="submit" >Submit</Button>
                    </Stack>
                </Box>
            </Stack>
        </Container>
    )
}

export default Constraints 
