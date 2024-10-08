import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Icon from '@/assets/Icon';
import Text from '@/ui/components/Text';

const ITEM_WIDTH = 2;
const ITEM_GAP = 16;
const ITEM_SIZE = ITEM_WIDTH + ITEM_GAP;

type SliderPickerProps = {
  initialValue?: number;
  min: number;
  max: number;
  unit: string;
  onChangeValue: (value: number) => void;
};

const SliderPicker = ({
  initialValue = 0,
  min,
  max,
  unit,
  onChangeValue,
}: SliderPickerProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState(initialValue);

  const items = Array.from({ length: max - min + 1 }, (_, i) => i);

  useEffect(() => {
    onChangeValue(value);
  }, [value, onChangeValue]);

  useEffect(() => {
    if (typeof initialValue !== 'undefined') {
      ref?.current?.scrollTo({
        left: (initialValue - min) * ITEM_SIZE,
        behavior: 'instant',
      });
    }
  }, [initialValue, min]);

  return (
    <Container>
      <SliderContainer>
        <ScrollContainer
          ref={ref}
          onScroll={(e) => {
            const scrollLeft = (e.target as HTMLDivElement)?.scrollLeft;

            const scrollByItem = Math.round(scrollLeft / ITEM_SIZE);

            setValue(scrollByItem + min);
          }}
        >
          {items.map((_, i) => (
            <Item key={i} higher={i % 10}></Item>
          ))}
        </ScrollContainer>
        <Needle>
          <StyledNeedleTriangle />
        </Needle>
      </SliderContainer>
      <ValueContainer>
        <Value>{value}</Value>
        <Unit>{unit}</Unit>
      </ValueContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 16px;
  margin-top: 40px;
`;

const ScrollContainer = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  gap: ${ITEM_GAP}px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding: 0 50%;
  width: 100%;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Item = styled.div<{
  higher: number;
}>`
  width: ${ITEM_WIDTH}px;
  height: ${({ higher }) => (higher ? 50 : 68)}px;
  flex-shrink: 0;
  background-color: black;
  scroll-snap-align: center;
`;

const Needle = styled.div`
  position: absolute;
  width: 4px;
  height: 100px;
  background-color: ${({ theme }) => theme.palette.secondary};

  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const StyledNeedleTriangle = styled(Icon.NeedleTriangle).attrs(({ theme }) => ({
  color: theme.palette.secondary,
  width: 28,
  height: 28,
}))`
  position: absolute;
  top: -35px;
  left: 50%;
  transform: translateX(-50%);
`;

const ValueContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 28px;
`;

const Value = styled(Text.Subtitle)`
  color: ${({ theme }) => theme.palette.dark};
`;

const Unit = styled(Value)`
  color: ${({ theme }) => theme.palette.dark};
`;

export default SliderPicker;
