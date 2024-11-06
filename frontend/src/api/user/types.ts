type UserGender = 'male' | 'female';
type UserAge = number;
type UserHeight = number;
type UserWeight = number;
type UserActivityLevel = 'low' | 'middle' | 'high';
type UserGoal = 'lose_weight' | 'maintain_weight' | 'gain_weight';

export type UserData = {
  gender: UserGender;
  age: UserAge;
  height: UserHeight;
  weight: UserWeight;
  activityLevel: UserActivityLevel;
  goal: UserGoal;
  dietaryRestrictions?: string[];
  medicalConditions?: string[];
  targetWeight?: number;
  neckCircumference?: number;
  armCircumference?: number;
  chestCircumference?: number;
  waistCircumference?: number;
  hipsCircumference?: number;
  thighCircumference?: number;
  calfCircumference?: number;
} & { user: string };

export type UserHealthIndicators = {
  BMI: number;
  BMR: number;
  TDEE: number;
};
