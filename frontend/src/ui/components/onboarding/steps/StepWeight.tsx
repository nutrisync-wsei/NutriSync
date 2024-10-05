import SliderPicker from "../../SliderPicker";
import { useOnboardingSteps } from "@/contexts/OnboardingStepsContext";

const MIN_WEIGHT = 20;
const MAX_WEIGHT = 200;

const StepWeight = () => {
  const { data, setData } = useOnboardingSteps();

  return (
    <SliderPicker
      initialValue={data?.weight}
      min={MIN_WEIGHT}
      max={MAX_WEIGHT}
      unit="kg"
      onChangeValue={(value) => {
        setData({ ...data, weight: value });
      }}
    />
  );
};

export default StepWeight;
