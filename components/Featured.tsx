import Center from './Center';
import styled from 'styled-components';
import Button from './Button';
import { CartIcon } from './icons/CartIcon';
import { ProductType } from '@/types';
import { ButtonLink } from './ButtonLink';
import { useCartContext } from '../contexts/CartContext';

const BG = styled.div`
  background-color: #222;
  color: #fff;
  padding: 3rem 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 3rem;
`;

const Description = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 2rem;
  img {
    max-width: 100%;
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export default function Featured({ product }: { product: ProductType }) {
  const { addProduct } = useCartContext();

  return (
    <BG>
      <Center>
        <Wrapper>
          <Column>
            <div>
              <Title>{product.name}</Title>
              <Description>{product.description}</Description>
              <ButtonWrapper>
                <ButtonLink
                  href={`/products/${product._id}`}
                  outline
                  white
                  size="lg"
                >
                  Read more
                </ButtonLink>
                <Button
                  primary
                  size="lg"
                  onClick={() => addProduct(product._id)}
                >
                  <CartIcon solid /> Add to cart
                </Button>
              </ButtonWrapper>
            </div>
          </Column>
          <Column>
            <img alt="Featured Product" src={product.images[0]} />
          </Column>
        </Wrapper>
      </Center>
    </BG>
  );
}
