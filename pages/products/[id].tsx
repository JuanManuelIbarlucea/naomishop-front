import Center from '@/components/Center';
import { mongooseConnect } from '@/lib/mongoose';
import { ProductType } from '@/types';
import { Product } from '@/models/Product';
import Title from '@/components/Title';
import styled from 'styled-components';
import WhiteBox from '@/components/WhiteBox';
import ProductImages from '@/components/ProductImages';
import Button from '@/components/Button';
import { CartIcon } from '@/components/icons/CartIcon';
import { useCartContext } from '@/contexts/CartContext';

const ColWrapper = styled.div`
  display: grid;
  justify-content: center;
  gap: 40px;
  margin: 40px 0;

  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
`;

const PriceRow = styled.div`
  gap: 20px;
  display: flex;
  text-align: right;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    text-align: left;
    align-items: center;
  }
`;

const Price = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
`;

export default function ProductPage({ product }: { product: ProductType }) {
  const { addProduct } = useCartContext();

  return (
    <Center>
      <ColWrapper>
        <WhiteBox>
          <ProductImages images={product.images} />
        </WhiteBox>
        <div>
          <Title>{product.name}</Title>
          <p>{product.description}</p>
          <PriceRow>
            <Price>${product.price}</Price>
            <div>
              <Button
                fullwidth
                primary
                size="lg"
                onClick={() => addProduct(product._id)}
              >
                <CartIcon solid /> Add to cart
              </Button>
            </div>
          </PriceRow>
        </div>
      </ColWrapper>
    </Center>
  );
}

export async function getServerSideProps(context: any) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
