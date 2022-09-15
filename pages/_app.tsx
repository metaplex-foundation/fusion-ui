import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Wallet } from '../components/Wallet';
import AppBar from '../components/AppBar';

function MyApp({ Component, pageProps }: AppProps) {
  return <Wallet><AppBar /><Component {...pageProps} /></Wallet>
}

export default MyApp
