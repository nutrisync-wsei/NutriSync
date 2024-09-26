import { Module } from '@nestjs/common'
import { HealthIndicatorsService } from './health-indicators.service'
import { HealthIndicatorsController } from './health-indicators.controller'

@Module({
  providers: [HealthIndicatorsService],
  controllers: [HealthIndicatorsController]
})
export class HealthIndicatorsModule {}
