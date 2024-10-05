import { useState } from "react";
import styled from "styled-components";

interface ToggleProps {
  initialState?: boolean;
  onToggle?: (state: boolean) => void;
}

const Toggle = ({ initialState = false, onToggle }: ToggleProps) => {
  const [toggled, setToggled] = useState(initialState);

  const toggleSwitch = () => {
    setToggled(!toggled);
    if (onToggle) {
      onToggle(!toggled);
    }
  };

  return (
    <ToggleContainer toggled={toggled} onClick={toggleSwitch}>
      <ToggleKnob toggled={toggled} />
    </ToggleContainer>
  );
};

export default Toggle;

const ToggleContainer = styled.div<{ toggled: boolean }>`
  width: 72px;
  height: 40px;
  background-color: ${(props: { toggled: boolean }) =>
    props.toggled ? "#F5C19E" : "#ECF1F4"};
  border-radius: 24px;
  display: flex;
  align-items: center;
  padding: 4px;
  box-shadow: 0px 2px 2px -1px #4a4a681a inset;
  cursor: pointer;
`;

const ToggleKnob = styled.div<{ toggled: boolean }>`
  width: 32px;
  height: 32px;
  background-color: #ffffff;
  border-radius: 50%;
  box-shadow: 0px 5.5px 5px -3px #0e0e2c33;
  transition: transform 0.3s ease;
  transform: ${(props: { toggled: boolean }) =>
    props.toggled ? "trantextX(32px)" : "trantextX(0px)"};
`;
