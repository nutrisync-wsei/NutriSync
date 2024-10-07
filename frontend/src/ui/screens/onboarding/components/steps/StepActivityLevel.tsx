import styled from 'styled-components';

import { UserData } from '@/api/user/types';
import { useOnboardingSteps } from '@/contexts/OnboardingStepsContext';
import Text from '@/ui/components/Text';

type ActivityLevelItem = {
  level: UserData['activityLevel'];
  description: string;
};

const ACTIVITY_LEVELS: ActivityLevelItem[] = [
  {
    level: 'low',
    description: 'Sedentary lifestyle, maximum 1 training per week',
  },
  {
    level: 'middle',
    description: 'Moderately active lifestyle, 2-3 training sessions per week',
  },
  {
    level: 'high',
    description:
      'Active lifestyle, engaging in 4 or more training sessions per week',
  },
];

const PickerItem = ({
  value,
  isActive,
  onClick,
}: {
  value: UserData['activityLevel'];
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <LevelItem onClick={onClick}>
      <Circle>
        <InnerCircle isActive={isActive} />
      </Circle>
      <ItemLabel isActive={isActive}>{value}</ItemLabel>
    </LevelItem>
  );
};

const StepActivityLevel = () => {
  const { data, setData } = useOnboardingSteps();

  return (
    <Container>
      <PickerContainer>
        <HorizontalLine />
        {ACTIVITY_LEVELS.map(({ level }) => (
          <PickerItem
            key={level}
            value={level}
            isActive={data?.activityLevel === level}
            onClick={() => setData({ ...data, activityLevel: level })}
          />
        ))}
      </PickerContainer>
      <Subtitle>
        {
          ACTIVITY_LEVELS.find((item) => item.level === data?.activityLevel)
            ?.description
        }
      </Subtitle>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100vw;
  padding: 0 20px;
`;

const PickerContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const HorizontalLine = styled.div`
  position: absolute;
  top: 27.5px;
  left: 0;
  right: 0;
  height: 1px;
  margin: 0 20px;
  background-color: ${({ theme }) => theme.palette.subtleText};
`;

const LevelItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9px;
  z-index: 2;
`;

const Circle = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.light};
  border: 1px solid ${({ theme }) => theme.palette.subtleText};
  padding: 4px;
  transition: 0.2s;
  cursor: pointer;
`;

const InnerCircle = styled.div<{
  isActive?: boolean;
}>`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  transition: 0.2s;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.palette.secondary : theme.palette.light};
`;

const ItemLabel = styled(Text.Body)<{
  isActive?: boolean;
}>`
  text-transform: uppercase;
  font-weight: 700;
  color: ${({ theme, isActive }) =>
    isActive ? theme.palette.text : theme.palette.subtleText};
`;

const Subtitle = styled(Text.Body)`
  text-align: center;
  max-width: 250px;
  margin: 50px auto 0;
  color: ${({ theme }) => theme.palette.text};
`;

export default StepActivityLevel;
