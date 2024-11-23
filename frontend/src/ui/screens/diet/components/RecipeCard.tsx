import Image from 'next/image';
import styled from 'styled-components';

import { Meal } from '@/types/diet';
import Text from '@/ui/components/Text';

type RecipeCardProps = {
  meal: Meal;
};

const RecipeCard = ({ meal }: RecipeCardProps) => {
  const { image, label, servings, calories } = meal || {};

  return (
    <Container>
      <StyledImage
        src={image?.url}
        width={300}
        height={200}
        alt="recipe image"
      />
      <Content>
        <Title>{label}</Title>
        <Row>
          <Servings>Servings: {servings}</Servings>
          <Divider />
          <Calories>{calories / servings} kcal</Calories>
        </Row>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.tertiary};
  border-radius: 8px;
  padding: 15px 10px;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Content = styled.div`
  gap: 7px;
`;

const Title = styled(Text.H3)`
  color: ${({ theme }) => theme.palette.dark};
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Servings = styled(Text.Body)`
  color: ${({ theme }) => theme.palette.text};
`;

const Divider = styled.div`
  width: 1px;
  height: 12px;
  background-color: ${({ theme }) => theme.palette.text};
`;

const Calories = styled(Servings)``;

export default RecipeCard;
