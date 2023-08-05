import Featured from '@/components/Featured';
import { Product } from '@/models/Product';
import { mongooseConnect } from '../lib/mongoose';
import { ProductType } from '@/types';
import NewProducts from '@/components/NewProducts';
export default function Home({
  featuredProduct,
  newProducts,
}: {
  featuredProduct: ProductType;
  newProducts: ProductType[];
}) {
  return (
    <div>
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = '64a33299a15e101ca812e92d';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
