import { Injectable } from '@nestjs/common'
import { UserProfileDto } from 'src/user-profile/dto/user-profile.dto'
import { ACTIVITY_MULTIPLIERS } from 'src/user-profile/types/types'

@Injectable()
export class HealthIndicatorsService {
  calculateBMI(userProfile: UserProfileDto) {
    const heightInMeters = userProfile.height / 100
    return userProfile.weight / Math.pow(heightInMeters, 2)
  }

  // Calculations based on Mifflin-St Jeor Equation
  calculateBMR(userProfile: UserProfileDto) {
    const weightFactor = 10 * userProfile.weight
    const heightFactor = 6.25 * userProfile.height
    const ageFactor = 5 * userProfile.age
    const genderFactor = userProfile.gender === 'male' ? 5 : -161

    return weightFactor + heightFactor - ageFactor + genderFactor
  }

  calculateTDEE(userProfile: UserProfileDto) {
    const BMR = this.calculateBMR(userProfile)

    return BMR * ACTIVITY_MULTIPLIERS[userProfile.activityLevel]
  }
}
