import { useOnboardingSteps } from '@/contexts/OnboardingStepsContext';
import Allergies from '@/ui/components/allergies';
import { Allergy } from '@/ui/components/allergies/types';

const StepDietaryRestrictions = () => {
  const { data, setData } = useOnboardingSteps();

  return (
    <Allergies
      initialValues={(data?.dietaryRestrictions || []) as Allergy[]}
      setData={(selectedOptions) =>
        setData((prev) => ({
          ...prev,
          dietaryRestrictions: selectedOptions,
        }))
      }
    />
  );
};

export default StepDietaryRestrictions;
