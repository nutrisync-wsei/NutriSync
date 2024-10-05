import { Step, useOnboardingSteps } from "@/contexts/OnboardingStepsContext";
import StepAge from "./steps/StepAge";
import React from "react";
import styled from "styled-components";
import StepWeight from "./steps/StepWeight";
import StepHeight from "./steps/StepHeight";
import StepGender from "./steps/StepGender";
import StepActivityLevel from "./steps/StepActivityLevel";
import StepGoal from "./steps/StepGoal";

const getOnboardingStepComponent = (step: Step) => {
  switch (step) {
    case "gender":
      return StepGender;
    case "age":
      return StepAge;
    case "height":
      return StepHeight;
    case "weight":
      return StepWeight;
    case "activityLevel":
      return StepActivityLevel;
    case "goal":
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
