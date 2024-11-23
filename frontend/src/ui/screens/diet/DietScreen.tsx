'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styled from 'styled-components';

import { useMeals } from '@/api/diet/hooks';
import Tabs from '@/ui/components/Tabs';

import DietDays from './components/DietDays';
import DietScreenHeader from './components/DietScreenHeader';
import RecipeCard from './components/RecipeCard';

const WEEK_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const DIET_TAB_CONFIG = [
  {
    id: 'breakfast',
    title: 'Breakfast',
  },
  {
    id: 'lunch',
    title: 'Lunch',
  },
  {
    id: 'dinner',
    title: 'Dinner',
  },
];

const DietScreen = () => {
  const router = useRouter();
  const [activeTabId, setActiveTabId] = useState(DIET_TAB_CONFIG[0].id);

  const [activeDayIndex, setActiveDayIndex] = useState(0);

  const { data: meals } = useMeals();

  const currentDayMeals = meals?.find(
    (meal) => meal.day === WEEK_DAYS[activeDayIndex],
  );

  return (
    <Container>
      <DietScreenHeader />
      <DietDays
        activeDayIndex={activeDayIndex}
        onDayClick={setActiveDayIndex}
      />
      <Tabs
        tabConfig={DIET_TAB_CONFIG.map((tab) => {
          const mealData = currentDayMeals?.meals?.find(
            (meal) => tab.title === meal.mealType,
          );

          return {
            ...tab,
            component: (
              <CardContainer
                onClick={() => router.push(`/meal/${mealData?._id}`)}
              >
                {mealData && <RecipeCard meal={mealData} />}
              </CardContainer>
            ),
          };
        })}
        activeTabId={activeTabId}
        setActiveTabId={setActiveTabId}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 50px;
`;

const CardContainer = styled.div`
  padding: 0 20px;
`;

export default DietScreen;
