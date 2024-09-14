import styled from 'styled-components';

interface SliderProps {
    value: number;
    min: number;
    max: number;
    onChange: (value: number) => void;
}

// TODO: Fix sliding
const Slider: React.FC<SliderProps> = ({ value, min, max, onChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(Number(event.target.value));
    };

    return (
        <SliderContainer>
            <SliderTrack value={value} max={max} />
            <input
                type="range"
                value={value}
                min={min}
                max={max}
                onChange={handleChange}
                style={{
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    cursor: 'pointer',
                }}
            />
            <Thumb left={(value / max) * 100} />
        </SliderContainer>
    );
};

const SliderContainer = styled.div`
  width: 420px;
  height: 12px;
  background: #ECF1F4;
  border-radius: 12px;
  box-shadow: 0px 2px 2px -1px #4A4A681A inset;
  position: relative;
`;

const SliderTrack = styled.div<{ value: number; max: number }>`
  height: 100%;
  background-color: #027a39;
  width: ${props => (props.value / props.max) * 100}%;
  border-radius: 12px;
`;

const Thumb = styled.div<{ left: number }>`
  position: absolute;
  top: 50%;
  left: ${props => (props.left)}%;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
  background-color: #FFFFFF;
  border: 1px solid #0000001A;
  box-shadow: 0px 5.5px 5px -3px #0E0E2C331A, 0px -1px 0px 0px #0E0E2C66 inset;
  border-radius: 50%;
  cursor: pointer;
`;

export default Slider;