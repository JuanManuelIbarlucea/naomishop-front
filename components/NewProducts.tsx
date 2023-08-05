import { ProductType } from '@/types';
import styled from 'styled-components';
import Center from './Center';
import ProductsGrid from './ProductsGrid';

const Title = styled.h2`
  font-size: 2rem;
  margin: 1.875rem 0 1.25rem;
  font-weight: 500;
`;

export default function NewProducts({ products }: { products: ProductType[] }) {
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductsGrid products={products} />
    </Center>
  );
}
