import axiosInstance from '@/api/axiosSetup';

const generatePlan = async (userId: string) => {
  const { data } = await axiosInstance.post(
    `/diet-plans/generateDietPlan/${userId}`,
  );

  return data;
};

const getMeals = async (userId: string) => {
  const { data } = await axiosInstance.get(`/diet-plans/getMeals/${userId}`);
  return data;
};

const DIET_QUERIES = {
  GENERATE_PLAN: generatePlan,
  GET_MEALS: getMeals,
};

export default DIET_QUERIES;
