'use client';
import { useRouter } from 'next/navigation';
import { styled } from 'styled-components';

import axiosInstance from '@/api/axiosSetup';
import { useUserProfile } from '@/api/user/hooks';
import { useAuth } from '@/contexts/AuthContext';
import BodyMetrics from '@/ui/components/bodyMetrics';
import Button from '@/ui/components/controls/Button';
import HealthIndicators from '@/ui/components/healthIndicators';

const HomeScreen = () => {
  const { authUser, logout } = useAuth();
  const router = useRouter();
  const { data: userProfile, isFetched } = useUserProfile();

  if (!userProfile && isFetched) router.push('/onboarding');

  const getPlans = async () => {
    const response = await axiosInstance.post(
      `/diet-plans/generateDietPlan/${authUser?.id}`,
    );

    console.log(response);
  };

  const getMeals = async () => {
    const response = await axiosInstance.get(
      `/diet-plans/getMeals/${authUser?.id}`,
    );

    console.log(response);
  };

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
      <Button onClick={getPlans}>Get plans</Button>
      <Button onClick={getMeals}>Get meals</Button>
      <Button onClick={logout}>Logout</Button>
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
