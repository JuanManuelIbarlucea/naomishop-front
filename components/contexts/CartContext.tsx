import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

const CartContext = createContext<any>({});

export function CartProvider({ children }: { children: ReactNode }) {
  const ls = typeof window !== 'undefined' ? localStorage : null;
  const [cartProducts, setCartProducts] = useState<string[]>([]);

  function addProduct(productId: string) {
    setCartProducts((prev: string[]) => [...prev, productId]);
  }

  function removeProduct(productId: string) {
    setCartProducts((prev: string[]) => {
      const index = prev.indexOf(productId);
      if (index !== -1) {
        return prev.filter((id, idx) => idx !== index);
      }

      return prev;
    });
  }

  useEffect(() => {
    if (cartProducts?.length <= 0) return;

    localStorage.setItem('cart', JSON.stringify(cartProducts));
  }, [cartProducts]);

  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart') as string) || []);
    }
  }, []);

  return (
    <CartContext.Provider value={{ cartProducts, addProduct, removeProduct }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => useContext(CartContext);
