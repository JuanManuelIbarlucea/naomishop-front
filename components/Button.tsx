import { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { primary } from '@/lib/colors';

export interface ButtonProps {
  size?: string;
  white?: boolean;
  primary?: boolean;
  outline?: boolean;
  fullwidth?: boolean;
  children?: ReactNode;
  onClick?: () => void;
}

export const ButtonStyle = css<ButtonProps>`
  border: 0;
  padding: 0.3rem 1rem;
  border-radius: 0.3rem;
  display: inline-flex;
  text-decoration: none;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  text-align: center;
  svg {
    margin-right: 0.5rem;
    height: 1rem;
  }
  cursor: pointer;
  ${(props) =>
    props.white &&
    !props.outline &&
    css`
      background-color: #fff;
      color: #000;
    `}
  ${(props) =>
    props.white &&
    props.outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;
    `}
  ${(props) =>
    props.primary &&
    !props.outline &&
    css`
      background-color: ${primary};
      color: #fff;
      border: 1px solid ${primary};
    `}
    ${(props) =>
    props.primary &&
    props.outline &&
    css`
      background-color: transparent;
      color: ${primary};
      border: 1px solid ${primary};
    `}
    ${(props) =>
    props.size === 'lg' &&
    css`
      font-size: 1rem;
      padding: 0.4rem 1rem;
      svg {
        height: 1.2rem;
      }
    `};
  ${(props) =>
    props.fullwidth &&
    css`
      padding: 0.6rem 0;
      width: 100%;

      @media screen and (min-width: 768px) {
        padding: 0.6rem;
      }
    `}
`;

const StyledButton = styled.button<ButtonProps>`
  ${ButtonStyle}
`;

export default function Button({ children, ...props }: any) {
  return <StyledButton {...props}>{children}</StyledButton>;
}
