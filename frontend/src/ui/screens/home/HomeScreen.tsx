'use client';
import { useRouter } from 'next/navigation';
import { styled } from 'styled-components';

import { useGenerateDietPlan } from '@/api/diet/hooks';
import { useUserProfile } from '@/api/user/hooks';
import { useAuth } from '@/contexts/AuthContext';
import BodyMetrics from '@/ui/components/bodyMetrics';
import Button from '@/ui/components/controls/Button';
import HealthIndicators from '@/ui/components/healthIndicators';

const HomeScreen = () => {
  const { authUser } = useAuth();
  const router = useRouter();
  const { data: userProfile, isFetched } = useUserProfile();
  const { mutate: generatePlans } = useGenerateDietPlan();

  if (!userProfile && isFetched) router.push('/onboarding');

  if (!userProfile) return null;

  return (
    <Container>
      {authUser ? `Welcome, ${authUser.username}!` : 'Welcome!'}

      <BodyMetrics />
      <HealthIndicators
        BMI={userProfile.BMI}
        BMR={userProfile.BMR}
        TDEE={userProfile.TDEE}
      />
      <Button onClick={() => generatePlans()}>Get plans</Button>
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
