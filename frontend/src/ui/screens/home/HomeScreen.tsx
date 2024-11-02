'use client';
import { styled } from 'styled-components';

import { useAuth } from '@/contexts/AuthContext';
import BodyMetrics from '@/ui/components/bodyMetrics';
import HealthIndicators from '@/ui/components/healthIndicators';

const HomeScreen = () => {
  const { authUser } = useAuth();

  return (
    <Container>
      {authUser ? `Welcome, ${authUser.username}!` : 'Welcome!'}

      <BodyMetrics />
      <HealthIndicators />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100svh;
  gap: 60px;
`;

export default HomeScreen;
