import { ReactNode } from 'react';

import { OnboardingStepsProvider } from '@/contexts/OnboardingStepsContext';

type OnboardingStepsLayoutProps = {
  children: ReactNode;
};

const OnboardingStepsLayout = ({ children }: OnboardingStepsLayoutProps) => {
  return <OnboardingStepsProvider>{children}</OnboardingStepsProvider>;
};

export default OnboardingStepsLayout;
