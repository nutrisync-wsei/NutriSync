import { Controller, Get, Param, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { DietPlansService } from './diet-plans.service'

@ApiTags('diet-plans')
@ApiBearerAuth()
@Controller('diet-plans')
export class DietPlansController {
  constructor(private dietPlansService: DietPlansService) {}

  @Post('/generateDietPlan/:userId')
  generateDietPlan(@Param('userId') userId: string) {
    return this.dietPlansService.generateDietPlan(userId)
  }

  @Get('/getMeals/:userId')
  getMeals(@Param('userId') userId: string) {
    return this.dietPlansService.getMeals(userId)
  }
}
