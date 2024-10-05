import { ChangeEvent } from "react";
import styled from "styled-components";
interface SliderProps {
  value: number;
  min: number;
  max: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Slider = ({ value, min, max, onChange }: SliderProps) => {
  return (
    <SliderContainer>
      <StyledSlider
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
      />
    </SliderContainer>
  );
};

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  width: 420px;
  height: 8px;
`;

const StyledSlider = styled.input<{ value: number; max: number }>`
  -webkit-appearance: none;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background: ${({ theme, value, max }) =>
    `linear-gradient(to right, ${theme.palette.primaryDark} 0%, ${
      theme.palette.primaryDark
    } ${(value / max) * 100}%, #ECF1F4 ${(value / max) * 100}%, #ECF1F4 100%)`};
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
    box-shadow: 0px 5.5px 5px -3px #0e0e2c33, 0px -1px 0px 0px #0e0e2c66 inset;
  }

  &::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
    box-shadow: 0px 5.5px 5px -3px #0e0e2c33, 0px -1px 0px 0px #0e0e2c66 inset;
  }
`;

export default Slider;
