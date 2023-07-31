import { mongooseConnect } from '@/lib/mongoose';
import { Order } from '@/models/Order';
import { Product } from '@/models/Product';
import { ProductType, StripeOrder, StripeData } from '@/types';
import { NextApiRequest, NextApiResponse } from 'next';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method !== 'POST') {
    await res.json('Should be a POST request!');
    return;
  }

  const {
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    cartProducts,
  }: any = req.body;

  await mongooseConnect();
  const uniqueIds = [...new Set<string>(cartProducts)];
  const productsInfos: ProductType[] = await Product.find({ _id: uniqueIds });

  let line_items: StripeOrder[] = [];

  uniqueIds.forEach((productId: string) => {
    const productInfo: ProductType | undefined = productsInfos.find(
      (p: ProductType) => p._id.toString() === productId
    );
    const quantity =
      cartProducts.filter((id: string) => id === productId)?.length || 0;

    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: 'USD',
          product_data: { name: productInfo.name },
          unit_amount: quantity * productInfo.price * 100,
        },
      });
    }
  });

  const newOrder = await Order.create({
    line_items,
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    paid: false,
  });

  const stripeData: StripeData = {
    line_items,
    mode: 'payment',
    customer_email: email,
    success_url: `${process.env.URL}/cart?success=1`,
    cancel_url: `${process.env.URL}/cart?canceled=1`,
    metadata: {
      orderId: newOrder._id.toString(),
    },
  };

  const session = await stripe.checkout.sessions.create(stripeData);

  res.json({ url: session.url });
}
