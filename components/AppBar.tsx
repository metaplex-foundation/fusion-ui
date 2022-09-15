
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function WalletButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: "#2a2a2a" }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Fusion UI
                    </Typography>
                    <WalletMultiButton />
                </Toolbar>
            </AppBar>
        </Box>
    );
}