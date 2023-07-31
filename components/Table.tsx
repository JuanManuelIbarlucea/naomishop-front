import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
  width: 100%;
  th {
    text-align: left;
    text-transform: uppercase;
    color: #ccc;
    font-weight: bold;
    font-size: 0.7rem;
  }
  td {
    padding: 10px 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

export default function Table(props: PropsWithChildren) {
  return <StyledTable {...props}></StyledTable>;
}
