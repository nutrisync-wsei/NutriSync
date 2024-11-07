import styled from 'styled-components';

import { UserData } from '@/api/user/types';
import Button from '@/components/controls/Button';
import { useOnboardingSteps } from '@/contexts/OnboardingStepsContext';

type GoalButtonProps = {
  goal: UserData['goal'];
};

const GOALS: {
  type: UserData['goal'];
  name: string;
}[] = [
  {
    type: 'lose_weight',
    name: 'Lose weight',
  },
  {
    type: 'maintain_weight',
    name: 'Maintain weight',
  },
  {
    type: 'gain_weight',
    name: 'Gain weight',
  },
];

const GoalButton = ({ goal }: GoalButtonProps) => {
  const { data, setData } = useOnboardingSteps();

  const handleClick = () => {
    setData({ ...data, goal });
  };

  return (
    <Button
      onClick={handleClick}
      $variant={data?.goal === goal ? 'secondary' : 'tertiary'}
    >
      {GOALS.find((item) => item.type === goal)?.name}
    </Button>
  );
};

const StepGoal = () => {
  return (
    <Container>
      <GoalButton goal="lose_weight" />
      <GoalButton goal="maintain_weight" />
      <GoalButton goal="gain_weight" />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  width: 200px;
`;

export default StepGoal;
