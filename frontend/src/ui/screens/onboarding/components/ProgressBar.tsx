'use client';
import styled from 'styled-components';

import { useOnboardingSteps } from '@/contexts/OnboardingStepsContext';

const ProgressBar = () => {
  const { currentStepIndex, numberOfSteps } = useOnboardingSteps();

  return (
    <Container>
      {Array.from({ length: numberOfSteps }, (_, i) => i).map((_, i) => (
        <Step key={i} $active={i <= currentStepIndex} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 14px;
`;

const Step = styled.div<{ $active: boolean }>`
  flex: 1;
  height: 12px;
  background-color: ${({ theme, $active }) =>
    $active ? theme.palette.primary : theme.palette.tertiary};
  margin-bottom: 10px;
  border-radius: 10px;
  transition: 0.2s;
`;

export default ProgressBar;
