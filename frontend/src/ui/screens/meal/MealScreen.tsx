'use client';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useMeal } from '@/api/diet/hooks';
import Icon from '@/assets/Icon';
import SmallCard from '@/ui/components/SmallCard';
import Text from '@/ui/components/Text';

import Servings from './components/Servings';

const DietScreen = () => {
  const { mealId } = useParams();
  const router = useRouter();

  const { data: meal } = useMeal(mealId as string);

  const {
    label,
    nutrients,
    image: { url: imageUrl } = {},
    calories = 0,
    servings,
    ingredients,
  } = meal || {};

  const [servingsAmount, setServingsAmount] = useState(1);

  useEffect(() => {
    setServingsAmount(servings || 1);
  }, [servings]);

  const getAmountByServings = (val: number, toFixedValue: number = 0) => {
    return ((val / (servings || 1)) * servingsAmount).toFixed(toFixedValue);
  };

  return (
    <Container>
      <Header>
        <BackIcon width={15} height={20} onClick={() => router.back()} />
        <Title>{label}</Title>
      </Header>
      <NutrientsContainer>
        {calories && (
          <SmallCard title={getAmountByServings(calories)} subtitle={'kcal'} />
        )}
        {nutrients?.map((nutrient) => (
          <SmallCard
            key={nutrient.label}
            title={getAmountByServings(nutrient.quantity) + nutrient.unit}
            subtitle={nutrient.label}
          />
        ))}
      </NutrientsContainer>
      {imageUrl ? (
        <StyledImage src={imageUrl} width={300} height={200} alt="meal image" />
      ) : (
        <ImageSkeleton />
      )}

      <ServingsContainer>
        <Servings
          servingsAmount={servingsAmount}
          setServingsAmount={setServingsAmount}
        />
      </ServingsContainer>
      {ingredients && (
        <IngredientsContainer>
          <IngredientsTitle>Ingredients</IngredientsTitle>
          {ingredients.map((ingredient) => (
            <SingleIgredient key={ingredient?._id}>
              <IngredientName>{ingredient.food}</IngredientName>
              <IngredientAmount>
                {`${getAmountByServings(ingredient.quantity, 2)} ${ingredient.measure || ''}`}
              </IngredientAmount>
            </SingleIgredient>
          ))}
        </IngredientsContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  padding: 50px 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const Title = styled(Text.H4)`
  color: ${({ theme }) => theme.palette.dark};
`;

const NutrientsContainer = styled.div`
  display: flex;
  gap: 15px;
  padding: 10px 0;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

const ImageSkeleton = styled.div`
  width: 100%;
  height: 200px;
  background-color: ${({ theme }) => theme.palette.accent};
  border-radius: 8px;
`;

const BackIcon = styled(Icon.ArrowLeft)``;

const ServingsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const IngredientsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const IngredientsTitle = styled(Text.BodyBold)`
  color: ${({ theme }) => theme.palette.dark};
`;

const SingleIgredient = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IngredientName = styled(Text.Body)`
  text-transform: capitalize;
  color: ${({ theme }) => theme.palette.text};
`;

const IngredientAmount = styled(Text.Body)`
  color: ${({ theme }) => theme.palette.subtleText};
`;

export default DietScreen;
