import { Injectable } from '@nestjs/common'
import { UserProfileDto } from 'src/user-profile/dto/user-profile.dto'
import { ACTIVITY_MULTIPLIERS } from 'src/user-profile/types/types'

@Injectable()
export class HealthIndicatorsService {
  calculateBMI(userProfile: UserProfileDto) {
    const heightInMeters = userProfile.height / 100
    return parseFloat(
      (userProfile.weight / Math.pow(heightInMeters, 2)).toFixed(2)
    )
  }

  // Calculations based on Mifflin-St Jeor Equation
  calculateBMR(userProfile: UserProfileDto) {
    const weightFactor = parseFloat((10 * userProfile.weight).toFixed(2))
    const heightFactor = parseFloat((6.25 * userProfile.height).toFixed(2))
    const ageFactor = parseFloat((5 * userProfile.age).toFixed(2))
    const genderFactor = userProfile.gender === 'male' ? 5 : -161

    return parseFloat(
      (weightFactor + heightFactor - ageFactor + genderFactor).toFixed(2)
    )
  }

  calculateTDEE(userProfile: UserProfileDto) {
    const BMR = this.calculateBMR(userProfile)

    return parseFloat(
      (BMR * ACTIVITY_MULTIPLIERS[userProfile.activityLevel]).toFixed(2)
    )
  }
}
