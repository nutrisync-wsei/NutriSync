import axiosInstance from '@/api/axiosSetup';
import { DietPlan, DietResponse } from '@/types/diet';

import { formatDietData } from './utils';

const generatePlan = async (userId: string) => {
  const { data } = await axiosInstance.post(
    `/diet-plans/generateDietPlan/${userId}`,
  );

  return data;
};

const getMeals = async (userId: string): Promise<DietPlan> => {
  const { data } = await axiosInstance.get<DietResponse>(
    `/diet-plans/getMeals/${userId}`,
  );

  return formatDietData(data);
};

const DIET_QUERIES = {
  GENERATE_PLAN: generatePlan,
  GET_MEALS: getMeals,
};

export default DIET_QUERIES;
