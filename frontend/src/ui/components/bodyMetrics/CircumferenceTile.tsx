import styled from 'styled-components';

import Text from '@/ui/components/Text';

import { CircumferenceType } from './types';

type CircumferenceTileProps = {
  title: string;
  value: number;
  type: CircumferenceType;
  unit?: string;
  onClick: (type: CircumferenceType) => void;
};

const CircumferenceTile = ({
  title,
  value,
  type,
  unit = 'cm',
  onClick,
}: CircumferenceTileProps) => {
  return (
    <Container onClick={() => onClick(type)}>
      <Heading>{title}</Heading>

      <Value>
        {value ? (
          <>
            {value} {unit}
          </>
        ) : (
          'N/A'
        )}
      </Value>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 5px 8px;
  width: 90px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.palette.accent};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.palette.peach}DD;
  }
`;

const Heading = styled(Text.Small)`
  color: ${({ theme }) => theme.palette.dark};
`;

const Value = styled(Text.SmallestLight)`
  color: ${({ theme }) => theme.palette.dark};
`;

export default CircumferenceTile;
