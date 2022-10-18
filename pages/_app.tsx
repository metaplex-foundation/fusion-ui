import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Wallet } from '../components/Wallet';
import AppBar from '../components/AppBar';
import { ToastContainer } from "react-toastify";
import { MetaplexProvider } from '../components/MetaplexProvider';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Wallet>
    <MetaplexProvider>
      <AppBar />
      <Component {...pageProps} />
      <ToastContainer position="bottom-right" />
    </MetaplexProvider>
  </Wallet>
}

export default MyApp
