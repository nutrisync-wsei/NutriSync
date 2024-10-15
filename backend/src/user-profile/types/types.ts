export enum ActivityLevel {
  LOW = 'low',
  MIDDLE = 'middle',
  HIGH = 'high'
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
  [ActivityLevel.LOW]: 1.2,
  [ActivityLevel.MIDDLE]: 1.55,
  [ActivityLevel.HIGH]: 1.9
}
