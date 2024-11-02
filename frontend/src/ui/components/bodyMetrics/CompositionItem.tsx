import { CircularProgressbar } from 'react-circular-progressbar';
import styled, { useTheme } from 'styled-components';

import Text from '@/ui/components/Text';

type CompositionItemProps = {
  name: string;
  percentage: number;
};

const CompositionItem = ({ name, percentage }: CompositionItemProps) => {
  const theme = useTheme();

  return (
    <Container>
      <ProgressContainer>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          strokeWidth={13}
          styles={{
            text: {
              fill: theme.palette.dark,
              fontSize: '25px',
              fontFamily: 'Rubik',
              fontWeight: 400,
              transform: 'translateY(2px)',
            },
          }}
        />
      </ProgressContainer>
      <Name>{name}</Name>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  /* padding: 10px; */
  /* border-radius: 8px; */
  /* background-color: ${({ theme }) => theme.palette.accent};
  transition: background-color 0.2s; */

  &:hover {
    /* background-color: ${({ theme }) => theme.palette.peach}DD; */
  }
`;

const ProgressContainer = styled.div`
  width: 45px;
  height: 45px;
`;

const Name = styled(Text.TinyLight)`
  width: 45px;
  transform: rotate(-90deg);
  text-transform: uppercase;
  text-align: center;
  color: ${({ theme }) => theme.palette.dark};
`;

export default CompositionItem;
