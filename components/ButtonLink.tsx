import Link from 'next/link';
import styled from 'styled-components';
import { ButtonProps, ButtonStyle } from './Button';

const StyledLink = styled(Link)<ButtonProps>`
  ${ButtonStyle}
`;

export function ButtonLink({ children, ...props }: any) {
  return <StyledLink {...props}>{children}</StyledLink>;
}
