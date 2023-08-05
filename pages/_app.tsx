import { CartProvider } from '@/contexts/CartContext';
import type { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';
import Header from '@/components/Header';
const GlobalStyles = createGlobalStyle`
  *{
    box-sizing: border-box;
  }
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
