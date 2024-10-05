import SliderPicker from "../../SliderPicker";
import { useOnboardingSteps } from "@/contexts/OnboardingStepsContext";

import { UserData } from "@/api/user/types";
import Button from "../../controls/Button";
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
    <StyledButton
      onClick={handleClick}
      variant={data?.gender === gender ? "secondary" : "tertiary"}
    >
      {gender}
    </StyledButton>
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

const StyledButton = styled(Button)`
  margin: 8px;
`;

export default StepGender;
