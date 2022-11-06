import { createRef, useState, useEffect } from 'react';
import { Typography, Box, TextField, Container, Stack, Button } from '@mui/material'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, Transaction } from '@solana/web3.js'
import type { NextPage } from 'next'
import { toast } from 'react-toastify';
import { createCreateEscrowConstraintModelAccountInstruction, PROGRAM_ID } from '../../trifle_js/src/generated'
import { loadEscrowConstraintModels } from '../../helpers/loadEscrowConstraintModels';
import styles from '../../styles/Home.module.css'

const Constraints: NextPage = () => {
    const wallet = useWallet();
    const { connection } = useConnection();
    const nameInputRef = createRef<HTMLInputElement>();
    const schemaInputRef = createRef<HTMLInputElement>();
    const constraintModels = useState<any[]>([]);

    useEffect(() => {
        if (!wallet.publicKey) {
            return;
        }
        loadEscrowConstraintModels(wallet.publicKey, connection);
    }, [connection, wallet.publicKey]);


    const createEscrowConstraintModelAccount = async (name: string, schemaUri: string) => {
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
            createEscrowConstraintModelAccountArgs: { name, schemaUri }
        });


        const tx = new Transaction().add(ix);

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
        <Container fixed className={styles.container} maxWidth="sm">
            <Stack direction="column" spacing={2}>
                <Typography variant="h3" className={styles.mainHeading}>Create A Constraint Model</Typography>
                <Typography variant="body1">You can use the inputs below to name your project. The Schema URI is the address to your publicly hosted Whipped Cream Schema JSON file. For more information, <a href="#" className={styles.link}>you can find the documentation here</a>.</Typography>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    onSubmit={(e) => {
                        e.preventDefault();
                        const name = nameInputRef.current?.value as string;
                        const schemaUri = schemaInputRef.current?.value as string;
                        createEscrowConstraintModelAccount(name, schemaUri);
                    }}
                >
                    <Stack direction="column" spacing={2}>
                        <TextField id="name" label="Name" variant="outlined" inputRef={nameInputRef} />
                        <TextField id="schemaUri" label="Schema URI" variant="outlined" inputRef={schemaInputRef} />
                        <Button variant="contained" size="large" type="submit" >Submit</Button>
                    </Stack>
                </Box>
            </Stack>
        </Container>
    )
}

export default Constraints 
