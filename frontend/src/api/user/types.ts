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
} & { user: string };
