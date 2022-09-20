import type { NextPage } from 'next'
import { Container, Typography } from '@mui/material'

const Toe: NextPage = () => {
    return (
        <Container fixed>
            <Typography variant="h1">Token Owned Escrow</Typography>
            <Typography variant="body1">
                Use this page to create a token owned escrow account
            </Typography>
        </Container>
    )
}

export default Toe