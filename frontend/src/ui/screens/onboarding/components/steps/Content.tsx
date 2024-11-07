import styled from 'styled-components';

import { Step, useOnboardingSteps } from '@/contexts/OnboardingStepsContext';

import StepActivityLevel from './StepActivityLevel';
import StepAge from './StepAge';
import StepGender from './StepGender';
import StepGoal from './StepGoal';
import StepHeight from './StepHeight';
import StepWeight from './StepWeight';

const getOnboardingStepComponent = (step: Step) => {
  switch (step) {
    case 'gender':
      return StepGender;
    case 'age':
      return StepAge;
    case 'height':
      return StepHeight;
    case 'weight':
      return StepWeight;
    case 'activityLevel':
      return StepActivityLevel;
    case 'goal':
      return StepGoal;
    default:
      return () => null;
  }
};

const Content = () => {
  const { currentStep } = useOnboardingSteps();

  const OnboardingStepComponent = getOnboardingStepComponent(currentStep);

  return (
    <Container>
      <OnboardingStepComponent />
    </Container>
  );
};

const Container = styled.div`
  margin-top: 40px;
`;

export default Content;
