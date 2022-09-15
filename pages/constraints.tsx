import { createRef, useState } from 'react';
import { Typography, Box, TextField, Container, Stack } from '@mui/material'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, Transaction } from '@solana/web3.js'
import type { NextPage } from 'next'
import { createCreateEscrowConstraintModelAccountInstruction, PROGRAM_ID } from '../js/src/generated'

const Constraints: NextPage = () => {
    const wallet = useWallet();
    const { connection } = useConnection();
    const nameInputRef = createRef<HTMLInputElement>();


    const createEscrowConstraintModelAccount = async (name: string) => {
        if (!wallet.publicKey) {
            return;
        }


        const [escrowConstraintModelAddress, _escrowConstraintModelAddressBump] = PublicKey.findProgramAddressSync([
            Buffer.from("metadata"),
            PROGRAM_ID.toBuffer(),
            Buffer.from("escrow"),
            wallet.publicKey.toBuffer(),
            Buffer.from(name)
        ], PROGRAM_ID);

        const ix = createCreateEscrowConstraintModelAccountInstruction({
            escrowConstraintModel: escrowConstraintModelAddress,
            payer: wallet.publicKey,
            updateAuthority: wallet.publicKey
        }, {
            createEscrowConstraintModelAccountArgs: { name }
        });

        const tx = new Transaction();
        tx.add(ix);

        const signature = await wallet.sendTransaction(tx, connection);
        console.log({ signature });

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
                        <TextField id="name" label="Name" variant="outlined" sx={{ background: "#dfdfdf" }} inputRef={nameInputRef} />
                        <button type="submit" >Submit</button>
                    </Stack>
                </Box>
            </Stack>
        </Container>
    )
}

export default Constraints 
