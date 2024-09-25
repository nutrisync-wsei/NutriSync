export enum ActivityLevel {
  SEDENTARY = 'sedentary',
  LIGHTLY_ACTIVE = 'lightly_active',
  MODERATELY_ACTIVE = 'moderately_active',
  VERY_ACTIVE = 'very_active',
  EXTRA_ACTIVE = 'extra_active'
}

export enum Goal {
  LOSE_WEIGHT = 'lose_weight',
  MAINTAIN_WEIGHT = 'maintain_weight',
  GAIN_WEIGHT = 'gain_weight'
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

export const ACTIVITY_MULTIPLIERS = {
  [ActivityLevel.SEDENTARY]: 1.2,
  [ActivityLevel.LIGHTLY_ACTIVE]: 1.55,
  [ActivityLevel.MODERATELY_ACTIVE]: 1.725,
  [ActivityLevel.VERY_ACTIVE]: 1.9,
  [ActivityLevel.EXTRA_ACTIVE]: 2.2
}
