import { Module } from '@nestjs/common'
import { DietPlansController } from './diet-plans.controller'
import { DietPlansService } from './diet-plans.service'
import { HttpModule } from '@nestjs/axios'
import { MongooseModule } from '@nestjs/mongoose'
import {
  DayOfEating,
  DayOfEatingSchema,
  Meal,
  MealSchema,
  RecipeDetails,
  RecipeDetailsSchema
} from './schemas/diet-plan.schema'
import { UserProfileModule } from 'src/user-profile/user-profile.module'

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: RecipeDetails.name, schema: RecipeDetailsSchema },
      { name: DayOfEating.name, schema: DayOfEatingSchema },
      { name: Meal.name, schema: MealSchema }
    ]),
    UserProfileModule
  ],
  controllers: [DietPlansController],
  providers: [DietPlansService]
})
export class DietPlansModule {}
