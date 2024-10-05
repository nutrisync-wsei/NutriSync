import { useOnboardingSteps } from "@/contexts/OnboardingStepsContext";

import { UserData } from "@/api/user/types";
import Button from "../../../../components/controls/Button";
import styled from "styled-components";

type GenderButtonProps = {
  gender: UserData["gender"];
};

const GenderButton = ({ gender }: GenderButtonProps) => {
  const { data, setData } = useOnboardingSteps();

  const handleClick = () => {
    setData({ ...data, gender });
  };

  return (
    <Button
      onClick={handleClick}
      variant={data?.gender === gender ? "secondary" : "tertiary"}
    >
      {gender}
    </Button>
  );
};

const StepGender = () => {
  return (
    <Container>
      <GenderButton gender="male" />
      <GenderButton gender="female" />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 200px;
`;

export default StepGender;
