type Image = {
  url: string;
  _id: string;
};

type Ingredient = {
  text: string;
  quantity: number;
  food: string;
  weight: number;
  foodId: string;
  image?: Image;
  measure: string | null;
  _id: string;
};

type Nutrient = {
  label: string;
  quantity: number;
  unit: string;
  _id: string;
};

export type Meal = {
  user: string;
  label: string;
  mealType: string;
  image: Image;
  url: string;
  calories: number;
  ingredients: Ingredient[];
  nutrients: Nutrient[];
  servings: number;
  _id: string;
};

type DietDetails = {
  recipeDetails: Meal;
  _id: string;
};

type Diet = {
  _id: string;
  day: string;
  user: string;
  __v: number;
  meals: DietDetails[];
};

export type DietResponse = Diet[];

export type DietPlan = {
  _id: string;
  day: string;
  meals: Meal[];
}[];
