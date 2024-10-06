import { OnboardingStepsProvider } from "@/contexts/OnboardingStepsContext";
import { ReactNode } from "react";

type OnboardingStepsLayoutProps = {
  children: ReactNode;
};

const OnboardingStepsLayout = ({ children }: OnboardingStepsLayoutProps) => {
  return <OnboardingStepsProvider>{children}</OnboardingStepsProvider>;
};

export default OnboardingStepsLayout;
