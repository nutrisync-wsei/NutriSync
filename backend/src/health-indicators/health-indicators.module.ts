import { Module } from '@nestjs/common'
import { HealthIndicatorsService } from './health-indicators.service'
import { HealthIndicatorsController } from './health-indicators.controller'
import { UserProfileModule } from 'src/user-profile/user-profile.module'

@Module({
  imports: [UserProfileModule],
  providers: [HealthIndicatorsService],
  controllers: [HealthIndicatorsController]
})
export class HealthIndicatorsModule {}
