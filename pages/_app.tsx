import { CartProvider } from '@/contexts/CartContext';
import type { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';
import Header from '@/components/Header';
import Head from 'next/head';
const GlobalStyles = createGlobalStyle`
  body{
    background-color: #eee;
    padding: 0;
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <CartProvider>
        <Header />
        <Head>
          <title>NaomiShop</title>
          <meta
            name="description"
            content="Welcome to NaomiShop! The best place to get your pets daily needs"
          />
          <meta name="author" content="Juan Manuel Ibarlucea" />
        </Head>
        <Component {...pageProps} />
      </CartProvider>
    </>
  );
}
