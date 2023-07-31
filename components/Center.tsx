import { ReactNode } from "react";
import styled from 'styled-components'

const StyledDiv = styled.div`
    max-width: 50rem;
    margin: 0 auto;
    padding: 0 1.2rem; 
`

export default function Center({ children }: { children?: ReactNode }) {
    return (
        <StyledDiv>
            {children}
        </StyledDiv>
    )

}
