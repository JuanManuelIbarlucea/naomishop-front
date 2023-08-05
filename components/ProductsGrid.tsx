import { ProductType } from '@/types';
import styled from 'styled-components';
import ProductBox from './ProductBox';

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1.5rem;
`;

export default function ProductsGrid({
  products,
}: {
  products: ProductType[];
}) {
  return (
    <StyledGrid>
      {products?.map((product) => (
        <ProductBox key={product._id} {...product} />
      ))}
    </StyledGrid>
  );
}
