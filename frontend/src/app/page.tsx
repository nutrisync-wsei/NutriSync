"use client";

import Link from "next/link";
import styled from "styled-components";

export default function Home() {
  return (
    <Container>
      <Link href="/welcome">Go to auth</Link>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.light};
  color: ${({ theme }) => theme.palette.dark};
`;
