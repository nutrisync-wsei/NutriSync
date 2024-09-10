"use client";
import Text from "@/app/ui/components/Text";
import styled from 'styled-components';

export default function Home() {
  return (
    <div>
      <main>
        <StyledHeader>HOME</StyledHeader>
      </main>
    </div>
  );
}

const StyledHeader = styled(Text.H2)`
  color: ${({ theme }) => theme.palette.darkSpring};
`