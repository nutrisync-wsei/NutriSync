import styled from 'styled-components';

import Text from '@/ui/components/Text';

const DAYS_OF_WEEK = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'];

type DietDaysProps = {
  activeDayIndex: number;
  onDayClick: (index: number) => void;
};

const DietDays = ({ activeDayIndex, onDayClick }: DietDaysProps) => {
  return (
    <Container>
      <ActiveIndicator activeDayIndex={activeDayIndex} />
      {DAYS_OF_WEEK.map((day, index) => (
        <Day key={day} onClick={() => onDayClick(index)}>
          <DayText isActive={activeDayIndex === index}>{day}</DayText>
        </Day>
      ))}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  margin: 0 10px;
`;

const Day = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 30px;
  z-index: 5;
`;

const DayText = styled(Text.Body)<{ isActive: boolean }>`
  text-align: center;
  color: ${({ theme, isActive }) =>
    isActive ? theme.palette.light : theme.palette.text};
  transition: color 0.3s;
`;

const ActiveIndicator = styled.div<{ activeDayIndex: number }>`
  position: absolute;
  z-index: 4;
  left: ${({ activeDayIndex }) => `${activeDayIndex * 14.28}%`};
  bottom: 0;
  width: 14.28%;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.primaryDark};
  transition: left 0.3s;
  border-radius: 5px;
`;

export default DietDays;
