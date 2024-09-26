import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { HealthIndicatorsService } from './health-indicators.service'
import { UserProfileDto } from 'src/user-profile/dto/user-profile.dto'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import { AuthGuard } from 'src/guards/auth.guard'

@ApiTags('health-indicators')
@ApiBearerAuth()
@Controller('health-indicators')
export class HealthIndicatorsController {
  constructor(private healthIndicatorsService: HealthIndicatorsService) {}

  @Post('/metrics')
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Health metrics successfully calculated',
    schema: {
      example: {
        BMI: 22.5,
        BMR: 1432,
        TDEE: 2799
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiOperation({ summary: 'Calculate health metrics based on user profile' })
  getHealthMetrics(@Body() userProfileDto: UserProfileDto) {
    const BMI = this.healthIndicatorsService.calculateBMI(userProfileDto)
    const BMR = this.healthIndicatorsService.calculateBMR(userProfileDto)
    const TDEE = this.healthIndicatorsService.calculateTDEE(userProfileDto)

    return {
      BMI,
      BMR,
      TDEE
    }
  }
}
