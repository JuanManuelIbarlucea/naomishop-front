import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import { ProductType } from '@/types';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductType[]>
) {
  await mongooseConnect();
  const ids = req.body.ids;

  res.json(await Product.find({ _id: ids }));
}
