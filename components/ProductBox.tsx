import { ProductType } from '@/types';
import styled from 'styled-components';
import Button from './Button';
import Link from 'next/link';
import { useCartContext } from '@/contexts/CartContext';

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 1.2rem;
  height: 10rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.8rem;
  img {
    max-width: 100%;
    max-height: 7rem;
  }
`;

const Name = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  margin: 0;
  text-decoration: none;
  color: inherit;
`;

const ProductWrapper = styled.div``;

const ProductInfoBox = styled.div`
  margin-top: 0.3rem;
`;

const PriceRow = styled.div`
  align-items: center;
  justify-content: space-between;
  margin-top: 0.125rem;

  @media screen and (min-width: 768px) {
    display: flex;
    gap: 10px;
  }
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 700;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    text-align: left;
  }
`;

export default function ProductBox({ _id, name, price, images }: ProductType) {
  const { addProduct } = useCartContext();

  return (
    <ProductWrapper>
      <WhiteBox href={`/product/${_id}`}>
        <div>
          <img src={images[0]} />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Name href={`/product/${_id}`}>{name}</Name>
        <PriceRow>
          <Price>${price}</Price>
          <Button fullWidth primary outline onClick={() => addProduct(_id)}>
            Add to cart
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
