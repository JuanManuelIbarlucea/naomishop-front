import { CartProvider } from '@/components/contexts/CartContext';
import type { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';
import Header from '@/components/Header';
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
        <Component {...pageProps} />
      </CartProvider>
    </>
  );
}
