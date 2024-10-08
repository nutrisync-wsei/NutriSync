import SliderPicker from '@/components/SliderPicker';
import { useOnboardingSteps } from '@/contexts/OnboardingStepsContext';

const MIN_AGE = 10;
const MAX_AGE = 100;

const StepAge = () => {
  const { data, setData } = useOnboardingSteps();

  return (
    <SliderPicker
      initialValue={data?.age}
      min={MIN_AGE}
      max={MAX_AGE}
      unit=""
      onChangeValue={(value) => {
        setData({ ...data, age: value });
      }}
    />
  );
};

export default StepAge;
