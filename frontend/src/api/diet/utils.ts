import { DietPlan, DietResponse } from '@/types/diet';

const getMealType = (label: string): string => {
  if (label.includes('Breakfast')) {
    return 'Breakfast';
  }
  if (label.includes('Lunch')) {
    return 'Lunch';
  }
  if (label.includes('Dinner')) {
    return 'Dinner';
  }
  return '';
};

export const formatDietData = (data: DietResponse): DietPlan => {
  return data.map((diet) => ({
    _id: diet._id,
    day: diet.day,
    meals: diet.meals.map((meal) => ({
      ...meal.recipeDetails,
      mealType: getMealType(meal.recipeDetails.label),
      label: meal.recipeDetails.label.split(']')[1].trim(),
    })),
  }));
};
