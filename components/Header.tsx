import Link from 'next/link';
import styled from 'styled-components';
import Center from './Center';
import { CartIcon } from './icons/CartIcon';
import { useCartContext } from '@/contexts/CartContext';
import BarsIcon from './icons/BarsIcon';
import { useState } from 'react';

const StyledHeader = styled.header`
  background-color: #222;
  position: sticky;
  top: -1px;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
`;

const Wrapper = styled.div`
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledNav = styled.nav<any>`
  ${(props) => (props.mobileNavActive ? `display: block;` : `display: none;`)}
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #222;
  @media screen and (min-width: 768px) {
    position: static;
    display: flex;
    padding: 0;
  }
`;

const NavLink = styled(Link)`
  display: block;
  color: #aaa;
  text-decoration: none;
  display: flex;
  padding: 10px 0;
  svg {
    height: 1.2rem;
  }

  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  svg {
    height: 1.2rem;
  }

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export default function Header() {
  const { cartProducts } = useCartContext();
  const [mobileNavActive, setMobileNavActive] = useState<boolean>(false);

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
            <BarsIcon />
          </NavButton>
          <Logo href={'/'}>Naomishop</Logo>
          <StyledNav
            mobileNavActive={mobileNavActive}
            onClick={() => setMobileNavActive((prev) => !prev)}
          >
            <NavLink href={'/'}>Home</NavLink>
            <NavLink href={'/products'}>Products</NavLink>
            <NavLink href={'/categories'}>Categories</NavLink>
            <NavLink href={'/account'}>Account</NavLink>
          </StyledNav>
          <NavLink href={'/cart'}>
            <CartIcon /> ({cartProducts?.length})
          </NavLink>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
