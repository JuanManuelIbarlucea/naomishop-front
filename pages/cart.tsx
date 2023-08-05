import Button from '@/components/Button';
import Center from '@/components/Center';
import { useCartContext } from '@/contexts/CartContext';
import { ProductType } from '@/types';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Table from '@/components/Table';
import CheckoutForm from '@/components/CheckoutForm';
import { useRouter } from 'next/router';
import CheckIcon from '@/components/icons/CheckIcon';
import WhiteBox from '@/components/WhiteBox';

const ColumnsWrapper = styled.div`
  display: grid;
  gap: 40px;
  margin-top: 40px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;

  img {
    max-width: 60px;
    max-height: 60px;
  }

  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;

    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityWrapper = styled.div`
  display: flex;
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const SuccessBox = styled.div`
  margin-top: 40px;
  text-align: center;

  svg {
    width: 100px;
    height: 100px;
    color: green;
  }
`;

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct } = useCartContext();
  const [products, setProducts] = useState<ProductType[]>([]);
  const router = useRouter();
  const { success, cancelled } = router.query;

  useEffect(() => {
    if (cartProducts?.length > 0) {
      axios.post('/api/cart', { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    }
  }, [cartProducts]);

  let total = 0;
  for (const productId of cartProducts) {
    const price =
      products.find((product) => product._id === productId)?.price || 0;
    total += price;
  }

  if (success) {
    return (
      <Center>
        <SuccessBox>
          <WhiteBox>
            <CheckIcon />
            <h1>Thank you for your purchase!</h1>
            <p>We will email you when your order is on it&apos;s way.</p>
          </WhiteBox>
        </SuccessBox>
      </Center>
    );
  }

  return (
    <>
      <Center>
        <ColumnsWrapper>
          <WhiteBox>
            <h2>Cart</h2>
            {!cartProducts?.length && <div>There&apos;s nothing here!</div>}
            {cartProducts?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((product) => {
                    const productAmount = cartProducts.filter(
                      (productId: string) => productId === product._id
                    ).length;
                    return (
                      <tr key={product._id}>
                        <td>
                          <ProductImageBox>
                            <img src={product.images[0]} alt={product.name} />
                          </ProductImageBox>
                          {product.name}
                        </td>
                        <td>
                          <QuantityWrapper>
                            <Button onClick={() => removeProduct(product._id)}>
                              -
                            </Button>
                            <QuantityLabel>{productAmount}</QuantityLabel>
                            <Button onClick={() => addProduct(product._id)}>
                              +
                            </Button>
                          </QuantityWrapper>
                        </td>
                        <td>${product.price * productAmount}</td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td>
                      <b>TOTAL</b>
                    </td>
                    <td></td>
                    <td>${total}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </WhiteBox>
          {!!cartProducts.length && (
            <WhiteBox>
              <h2>Order information</h2>
              <CheckoutForm cartProducts={cartProducts} />
            </WhiteBox>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
