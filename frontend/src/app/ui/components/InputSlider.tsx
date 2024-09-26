import { ChangeEvent } from 'react';
import styled from 'styled-components';
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

const StyledSlider = styled.input<{ value: number, max: number }>`
  -webkit-appearance: none;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background: ${({ value, max }) => `linear-gradient(to right, #027a39 0%, #027a39 ${(value / max) * 100}%, #ECF1F4 ${(value / max) * 100}%, #ECF1F4 100%)`};
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
    box-shadow: 0px 5.5px 5px -3px #0E0E2C33, 0px -1px 0px 0px #0E0E2C66 inset;
  }

  &::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
    box-shadow: 0px 5.5px 5px -3px #0E0E2C33, 0px -1px 0px 0px #0E0E2C66 inset;
  }
`;


export default Slider;