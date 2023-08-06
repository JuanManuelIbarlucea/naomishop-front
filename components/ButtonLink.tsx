import Link from 'next/link';
import styled from 'styled-components';
import { ButtonStyle } from './Button';

const StyledLink = styled(Link)<any>`
  ${ButtonStyle}
`;

export function ButtonLink({ children, ...props }: any) {
  return <StyledLink {...props}>{children}</StyledLink>;
}
