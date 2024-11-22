type UserGender = 'male' | 'female';
type UserAge = number;
type UserHeight = number;
type UserWeight = number;
type UserActivityLevel = 'low' | 'middle' | 'high';
type UserGoal = 'lose_weight' | 'maintain_weight' | 'gain_weight';

export type UserProgress = {
  timestamp?: Date;
  weight: number;
};

export type UserData = {
  gender: UserGender;
  age: UserAge;
  height: UserHeight;
  weight: UserWeight;
  activityLevel: UserActivityLevel;
  goal: UserGoal;
  dietaryRestrictions?: string[];
  targetWeight?: number;
  neckCircumference?: number;
  armCircumference?: number;
  chestCircumference?: number;
  waistCircumference?: number;
  hipsCircumference?: number;
  thighCircumference?: number;
  calfCircumference?: number;
  logs?: UserProgress[];
} & UserHealthIndicators & { user: string };

export type UserHealthIndicators = {
  BMI?: number;
  BMR?: number;
  TDEE?: number;
};
