import styled from 'styled-components';

import Text from '@/components/Text';
import { Step, useOnboardingSteps } from '@/contexts/OnboardingStepsContext';

type HeaderItem = {
  title: string;
  subtitle: string;
};

const headerTexts: Record<Step, HeaderItem> = {
  gender: {
    title: 'Gender',
    subtitle: 'Choose your',
  },
  age: {
    title: 'Age',
    subtitle: 'Enter your',
  },
  weight: {
    title: 'Weight',
    subtitle: 'Enter your',
  },
  height: {
    title: 'Height',
    subtitle: 'Enter your',
  },
  activityLevel: {
    title: 'Activity Level',
    subtitle: 'Access your',
  },
  goal: {
    title: 'Goal',
    subtitle: 'Define your',
  },
};

const Header = () => {
  const { currentStep } = useOnboardingSteps();

  return (
    <Container>
      <Subtitle>{headerTexts[currentStep].subtitle}</Subtitle>
      <Title>{headerTexts[currentStep].title}</Title>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 80px;
`;

const Title = styled(Text.H2)`
  text-align: center;
  text-transform: uppercase;
  color: ${({ theme }) => theme.palette.dark};
`;

const Subtitle = styled(Text.Subtitle)`
  text-align: center;
  color: ${({ theme }) => theme.palette.text};
`;

export default Header;
