'use client';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

import { useOnboardingSteps } from '@/contexts/OnboardingStepsContext';
import Button from '@/ui/components/controls/Button';
import LogoWithText from '@/ui/components/LogoWithText';
import ProgressBar from '@/ui/screens/onboarding/components/ProgressBar';
import Content from '@/ui/screens/onboarding/components/steps/Content';
import Header from '@/ui/screens/onboarding/components/steps/Header';

const OnboardingStepsScreen = () => {
  const router = useRouter();
  const {
    data,
    currentStep,
    currentStepIndex,
    numberOfSteps,
    nextStep,
    prevStep,
    submitData,
  } = useOnboardingSteps();

  const isFirstStepIndex = currentStepIndex === 0;

  const isLastStepIndex = currentStepIndex === numberOfSteps - 1;

  return (
    <Container>
      <LogoWithText width={170} />
      <ProgressBar />
      <Header />
      <ContentContainer>
        <Content />
      </ContentContainer>
      <ButtonsContainer>
        <Button
          $variant="tertiary"
          onClick={isFirstStepIndex ? router.back : prevStep}
        >
          Back
        </Button>
        <Button
          onClick={isLastStepIndex ? submitData : nextStep}
          disabled={!data?.[currentStep]}
        >
          {isLastStepIndex ? 'Submit' : 'Next'}
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: ${({ theme }) => theme.palette.light};
  padding: 50px 20px 60px;
  height: 100vh;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const ContentContainer = styled.div`
  flex: 1;
`;

export default OnboardingStepsScreen;
