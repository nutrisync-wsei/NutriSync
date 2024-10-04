import { OnboardingStepsProvider } from "@/contexts/OnboardingStepsContext";

type OnboardingStepsScreenProps = {
  children: React.ReactNode;
};

const OnboardingStepsScreen = ({ children }: OnboardingStepsScreenProps) => {
  return <OnboardingStepsProvider>{children}</OnboardingStepsProvider>;
};

export default OnboardingStepsScreen;
