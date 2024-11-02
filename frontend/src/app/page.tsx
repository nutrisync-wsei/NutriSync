'use client';
import Link from 'next/link';
import styled from 'styled-components';

import { useAuth } from '@/contexts/AuthContext';
import Button from '@/ui/components/controls/Button';

export default function Home() {
  const { logout } = useAuth();

  return (
    <Container>
      <Link href="/welcome">Go to auth</Link>
      <Link href="/onboarding">Go to onboarding</Link>
      <Link href="/home">Go to home</Link>
      <Button onClick={logout}>Logout</Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 10px;
  background-color: ${({ theme }) => theme.palette.light};
  color: ${({ theme }) => theme.palette.dark};
`;
