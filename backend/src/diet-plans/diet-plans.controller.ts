import { Controller, Get, Param, Post } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import { DietPlansService } from './diet-plans.service'

@ApiTags('diet-plans')
@ApiBearerAuth()
@Controller('diet-plans')
export class DietPlansController {
  constructor(private dietPlansService: DietPlansService) {}

  @Post('/generateDietPlan/:userId')
  @ApiOperation({ summary: 'Generate a diet plan for a user' })
  @ApiResponse({ status: 200, description: 'Diet plan created successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  generateDietPlan(@Param('userId') userId: string) {
    return this.dietPlansService.generateDietPlan(userId)
  }

  @Get('/getMeals/:userId')
  @ApiOperation({ summary: 'Get meals for a user' })
  @ApiResponse({ status: 200, description: 'Meals retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Get('/getMeals/:userId')
  getMeals(@Param('userId') userId: string) {
    return this.dietPlansService.getMeals(userId)
  }
}
