import Link from 'next/link';
import styled from 'styled-components';
import Center from './Center';
import { CartIcon } from './icons/CartIcon';
import { useCartContext } from './contexts/CartContext';

const StyledHeader = styled.header`
  background-color: #222;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: #aaa;
  text-decoration: none;
  display: inline-flex;
  svg {
    height: 1.2rem;
  }
`;

export default function Header() {
  const { cartProducts } = useCartContext();

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={'/'}>Naomishop</Logo>
          <StyledNav>
            <NavLink href={'/'}>Home</NavLink>
            <NavLink href={'/products'}>Products</NavLink>
            <NavLink href={'/categories'}>Categories</NavLink>
            <NavLink href={'/account'}>Account</NavLink>
            <NavLink href={'/cart'}>
              <CartIcon /> ({cartProducts?.length})
            </NavLink>
          </StyledNav>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
