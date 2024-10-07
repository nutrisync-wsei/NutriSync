import SliderPicker from "../../../../components/SliderPicker";
import { useOnboardingSteps } from "@/contexts/OnboardingStepsContext";

const MIN_HEIGHT = 100;
const MAX_HEIGHT = 220;

const StepHeight = () => {
  const { data, setData } = useOnboardingSteps();

  return (
    <SliderPicker
      initialValue={data?.height}
      min={MIN_HEIGHT}
      max={MAX_HEIGHT}
      unit="cm"
      onChangeValue={(value) => {
        setData({ ...data, height: value });
      }}
    />
  );
};

export default StepHeight;
