import { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { primary } from '@/lib/colors';

export interface ButtonProps {
  size?: string;
  white?: boolean;
  primary?: boolean;
  outline?: boolean;
  block?: boolean;
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
      font-size: 1.2rem;
      padding: 0.6rem 1.2rem;
      svg {
        height: 1.2rem;
      }
    `};
  ${(props) =>
    props.block &&
    css`
      display: block;
      width: 100%;
    `}
`;

const StyledButton = styled.button<ButtonProps>`
  ${ButtonStyle}
`;

export default function Button({ children, ...props }: any) {
  return <StyledButton {...props}>{children}</StyledButton>;
}