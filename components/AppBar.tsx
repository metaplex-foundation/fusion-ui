
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Link from "next/link";

export default function WalletButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: "lightgrey" }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#000' }}>
                        <Link href={"/"} >
                            🍰 Trifle UI
                        </Link>
                    </Typography>
                    <WalletMultiButton />
                </Toolbar>
            </AppBar>
        </Box>
    );
}