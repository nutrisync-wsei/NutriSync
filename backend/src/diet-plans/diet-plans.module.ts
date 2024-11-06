import { Module } from '@nestjs/common'
import { DietPlansController } from './diet-plans.controller'
import { DietPlansService } from './diet-plans.service'
import { HttpModule } from '@nestjs/axios'
import { MongooseModule } from '@nestjs/mongoose'
import { RecipeDetails, RecipeDetailsSchema } from './schemas/diet-plan.schema'

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: RecipeDetails.name, schema: RecipeDetailsSchema }
    ])
  ],
  controllers: [DietPlansController],
  providers: [DietPlansService]
})
export class DietPlansModule {}
