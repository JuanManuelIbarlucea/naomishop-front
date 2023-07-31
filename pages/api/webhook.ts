import { mongooseConnect } from '@/lib/mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import { Order } from '@/models/Order';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret =
  'whsec_2d3f2e9d42a3e9879e7138afc3da701c7f931e2778b3604ee8fc1f3d6e631e20';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await mongooseConnect();

  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      endpointSecret
    );
  } catch (err: any) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const { metadata, payment_status } = event.data.object;
      const orderId = metadata.orderId;
      const paid = payment_status == 'paid';

      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, { paid: true });
      }

      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send('Succss!');
}

export const config = {
  api: { bodyParser: false },
};
