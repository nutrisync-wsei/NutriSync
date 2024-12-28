'use client';
import { useRouter } from 'next/navigation';
import { styled } from 'styled-components';

import { useUserProfile } from '@/api/user/hooks';
import { useAuth } from '@/contexts/AuthContext';
import BodyMetrics from '@/ui/components/bodyMetrics';
import Button from '@/ui/components/controls/Button';
import HealthIndicators from '@/ui/components/healthIndicators';
import Text from '@/ui/components/Text';

const HomeScreen = () => {
  const { authUser } = useAuth();
  const router = useRouter();
  const { data: userProfile, isFetched } = useUserProfile();

  if (!userProfile && isFetched) router.push('/onboarding');

  if (!userProfile) return null;

  return (
    <Container>
      <Heading>{authUser ? `Hello, ${authUser.username}!` : 'Hello!'}</Heading>
      <DescriptionContainer>
        <Description>
          Your diet has already been generated based on your metrics. You can
          check it out by going to the "Diet" page or by pressing the button
          below.
        </Description>
        <Button>See your diet</Button>
      </DescriptionContainer>
      <HealthIndicators
        BMI={userProfile.BMI}
        BMR={userProfile.BMR}
        TDEE={userProfile.TDEE}
      />
      <MetricsContainer>
        <Description>Fill in your body measurements below</Description>
        <BodyMetrics />
      </MetricsContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100svh;
  gap: 20px;
`;

const Heading = styled(Text.H2)`
  padding: 60px 0 20px;
  color: ${({ theme }) => theme.palette.primary};
`;

const Description = styled(Text.Body)`
  text-align: center;
  color: ${({ theme }) => theme.palette.dark};
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  padding: 0 20px;
`;

const MetricsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  padding: 0 20px 30px;
`;

export default HomeScreen;
