"use client";
import { useUpdateUserProfile } from "@/api/user/hooks";
import { UserData } from "@/api/user/types";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Step =
  | "gender"
  | "age"
  | "height"
  | "weight"
  | "activityLevel"
  | "goal";

type OnboardingData = Partial<UserData>;

const onboardingSteps: Step[] = [
  "gender",
  "age",
  "height",
  "weight",
  "activityLevel",
  "goal",
] as const;

const numberOfSteps = onboardingSteps.length;

type OnboardingStepsContextType = {
  currentStep: Step;
  currentStepIndex: number;
  numberOfSteps: number;
  data: OnboardingData | undefined;
  setData: Dispatch<SetStateAction<OnboardingData | undefined>>;
  nextStep: () => void;
  prevStep: () => void;
  submitData: () => void;
};

const OnboardingStepsContext = createContext<OnboardingStepsContextType | null>(
  null
);

export const OnboardingStepsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [data, setData] = useState<OnboardingData>();

  const { mutate: updateUserProfile } = useUpdateUserProfile();

  const handleStepChange = (direction: "next" | "prev") => {
    setCurrentStepIndex((prev) => {
      if (direction === "next") {
        return Math.min(prev + 1, numberOfSteps - 1);
      } else {
        return Math.max(prev - 1, 0);
      }
    });
  };

  const submitData = () => {
    data && updateUserProfile(data);
  };

  const value = useMemo(
    () => ({
      currentStep: onboardingSteps[currentStepIndex],
      currentStepIndex,
      numberOfSteps,
      data,
      setData,
      submitData,
      nextStep: () => handleStepChange("next"),
      prevStep: () => handleStepChange("prev"),
    }),
    [currentStepIndex, data, submitData, handleStepChange, numberOfSteps]
  );

  return (
    <OnboardingStepsContext.Provider value={value}>
      {children}
    </OnboardingStepsContext.Provider>
  );
};

export const useOnboardingSteps = () => {
  const context = useContext(OnboardingStepsContext);
  if (!context) {
    throw new Error(
      "useOnboardingSteps must be used within an OnboardingStepsProvider"
    );
  }
  return context;
};
