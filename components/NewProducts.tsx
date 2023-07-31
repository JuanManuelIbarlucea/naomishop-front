import { ProductType } from '@/types';
import styled from 'styled-components';
import Center from './Center';
import ProductBox from './ProductBox';

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1.5rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin: 1.875rem 0 1.25rem;
  font-weight: 500;
`;

export default function NewProducts({ products }: { products: ProductType[] }) {
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductGrid>
        {products?.map((product) => (
          <ProductBox key={product._id} {...product} />
        ))}
      </ProductGrid>
    </Center>
  );
}
