import Input from './Input';
import Button from './Button';
import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

export default function CheckoutForm({
  cartProducts,
}: {
  cartProducts: string[];
}) {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [streetAddress, setStreetAddress] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');
  const router = useRouter();
  async function goToPayment() {
    const response = await axios.post('/api/checkout', {
      name,
      email,
      city,
      country,
      postalCode,
      streetAddress,
      cartProducts,
    });

    if (response.data.url) {
      router.push(response.data.url);
    }
  }

  return (
    <>
      <Input
        value={name}
        name="name"
        onChange={(ev: any) => setName(ev?.target?.value)}
        type="text"
        placeholder="Name"
      />
      <Input
        onChange={(ev: any) => setEmail(ev?.target?.value)}
        value={email}
        name="email"
        type="text"
        placeholder="Email"
      />
      <Input
        onChange={(ev: any) => setStreetAddress(ev?.target?.value)}
        value={streetAddress}
        name="streetAddress"
        type="text"
        placeholder="Street Address"
      />
      <Input
        onChange={(ev: any) => setCountry(ev?.target?.value)}
        value={country}
        name="country"
        type="text"
        placeholder="Country"
      />
      <CityHolder>
        <Input
          value={city}
          name="city"
          onChange={(ev: any) => setCity(ev?.target?.value)}
          type="text"
          placeholder="City"
        />
        <Input
          value={postalCode}
          name="postalCode"
          onChange={(ev: any) => setPostalCode(ev?.target?.value)}
          type="text"
          placeholder="Postal Code"
        />
        <input type="hidden" name="products" value={cartProducts.join(',')} />
      </CityHolder>
      <Button onClick={goToPayment} block primary>
        Continue to payment
      </Button>
    </>
  );
}
