import { useEffect, useState } from "react"
import { PublicKey, Transaction } from "@solana/web3.js";
import { toast } from "react-toastify";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Container } from "@mui/material";
import { EscrowConstraintModel } from "../../js/src/generated";

const ConstraintDetail: NextPage = () => {
    const router = useRouter();
    const { connection } = useConnection();
    const wallet = useWallet();
    const { escrowConstraintModelAddress } = router.query;

    useEffect(() => {
        const load = async () => {
            if (!escrowConstraintModelAddress) {
                console.log("nodice")
                return;
            }
            const escrowConstraintModel = await loadEscrowConstraintModel(new PublicKey(escrowConstraintModelAddress));
            console.log(escrowConstraintModel);
        }

        load().then(() => {
            console.log("loaded");
        })
    }, [escrowConstraintModelAddress]);

    const loadEscrowConstraintModel = async (address: PublicKey): Promise<EscrowConstraintModel | null> => {
        const maybeEscrowConstraintModel = await connection.getAccountInfo(address);
        if (maybeEscrowConstraintModel?.data) {
            return EscrowConstraintModel.fromAccountInfo(maybeEscrowConstraintModel)[0];
        }
        return null
    }

    return (<Container>
        <span>{escrowConstraintModelAddress}</span>
    </Container>)
};

export default ConstraintDetail