import { OnboardingStepsProvider } from '@/contexts/OnboardingStepsContext';

type OnboardingStepsLayoutProps = {
  children: React.ReactNode;
};

const OnboardingStepsLayout = ({ children }: OnboardingStepsLayoutProps) => {
  return <OnboardingStepsProvider>{children}</OnboardingStepsProvider>;
};

export default OnboardingStepsLayout;
