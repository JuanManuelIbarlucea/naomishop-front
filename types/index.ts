export interface ProductPropertyType {
  name: string;
  values: string | string[];
}

export interface ProductType {
  _id: string;
  name: string;
  price: number;
  description?: string | undefined;
  images: string[];
  category?: string;
  properties: { [key: string]: string };
}

export interface CategoryType {
  _id: string;
  name: string;
  parent?: CategoryType;
  properties: ProductPropertyType[];
}

export interface StripeOrder {
  quantity: number;
  price_data: {
    currency: string;
    product_data: {
      name: string;
    };
    unit_amount: number;
  };
}

export interface StripeData {
  line_items: StripeOrder[];
  mode: 'payment' | 'subscription' | 'setup';
  customer_email: string;
  success_url: string;
  cancel_url: string;
  metadata: {
    orderId: string;
  };
}

export interface OrderType {
  line_items: StripeOrder[];
  name: string;
  email: string;
  city: string;
  postalCode: string;
  streetAddress: string;
  country: string;
  paid: boolean;
}
