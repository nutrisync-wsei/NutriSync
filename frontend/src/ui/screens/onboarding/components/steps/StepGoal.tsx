import SliderPicker from "../../../../components/SliderPicker";
import { useOnboardingSteps } from "@/contexts/OnboardingStepsContext";

import { UserData } from "@/api/user/types";
import Button from "../../../../components/controls/Button";
import styled from "styled-components";

type GoalButtonProps = {
  goal: UserData["goal"];
};

const GOALS: {
  type: UserData["goal"];
  name: string;
}[] = [
  {
    type: "lose_weight",
    name: "Lose weight",
  },
  {
    type: "maintain_weight",
    name: "Maintain weight",
  },
  {
    type: "gain_weight",
    name: "Gain weight",
  },
];

const GoalButton = ({ goal }: GoalButtonProps) => {
  const { data, setData } = useOnboardingSteps();

  const handleClick = () => {
    setData({ ...data, goal });
  };

  return (
    <StyledButton
      onClick={handleClick}
      variant={data?.goal === goal ? "secondary" : "tertiary"}
    >
      {GOALS.find((item) => item.type === goal)?.name}
    </StyledButton>
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
  gap: 16px;
  width: 200px;
`;

const StyledButton = styled(Button)`
  margin: 8px;
`;

export default StepGoal;