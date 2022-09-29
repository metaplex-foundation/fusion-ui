import { useEffect, useState } from "react";
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Container, Typography } from "@mui/material";
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { useMetaplex } from '../../hooks/useMetaplex';
import { toast } from 'react-toastify';
import { PublicKey } from '@solana/web3.js';
import { Trifle } from "../../js/src/generated";

const TrifleDetail: NextPage = () => {
    const router = useRouter();
    const wallet = useWallet();
    const { connection } = useConnection();
    const { metaplex } = useMetaplex();
    const [trifle, setTrifle] = useState<any>(null);

    let { publicKey: trifleAddressString } = router.query;

    useEffect(() => {
        if (!trifleAddressString) {
            return;
        }

        loadTrifleAccount(new PublicKey(trifleAddressString as string)).then((trifle) => {
            console.log({ trifle });
            if (trifle) {
                setTrifle(trifle);
            }
        })

    }, [trifleAddressString]);

    const loadTrifleAccount = async (trifleAddress: PublicKey): Promise<Trifle | undefined> => {
        let maybeTrifleAccount = await connection.getAccountInfo(trifleAddress);

        if (maybeTrifleAccount?.data) {
            return Trifle.fromAccountInfo(maybeTrifleAccount)[0];
        }
    };

    return <Container>
        <Typography variant="h1">Trifle Detail</Typography>
        {trifleAddressString && <Typography variant="h6">{trifleAddressString}</Typography>}
    </Container>
}

export default TrifleDetail