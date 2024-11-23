import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

import Text from '@/ui/components/Text';

type ServingsProps = {
  servingsAmount: number;
  setServingsAmount: Dispatch<SetStateAction<number>>;
};

const Servings = ({ servingsAmount, setServingsAmount }: ServingsProps) => {
  return (
    <Container>
      <Title>Servings</Title>
      <AmountButton
        onClick={() =>
          servingsAmount > 1 && setServingsAmount((prev) => prev - 1)
        }
      >
        -
      </AmountButton>
      <AmountText>{servingsAmount}</AmountText>
      <AmountButton onClick={() => setServingsAmount((prev) => prev + 1)}>
        +
      </AmountButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AmountButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.secondary};
  width: 25px;
  height: 25px;
  border-radius: 8px;
  font-size: 16px;
  line-height: 16px;
`;

const Title = styled(Text.Body)`
  color: ${({ theme }) => theme.palette.dark};
`;

const AmountText = styled(Title)``;

export default Servings;
