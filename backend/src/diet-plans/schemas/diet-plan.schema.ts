import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { User } from 'src/auth/schemas/user.schema'

@Schema()
export class ImageInfo {
  @Prop()
  url: string
}

export const ImageInfoSchema = SchemaFactory.createForClass(ImageInfo)

@Schema()
export class NutrientInfo {
  @Prop({ required: true })
  label: string

  @Prop({ required: true })
  quantity: number

  @Prop({ required: true })
  unit: string
}

export const NutrientInfoSchema = SchemaFactory.createForClass(NutrientInfo)

@Schema()
export class Ingredient {
  @Prop({ required: true })
  text: string

  @Prop({ required: true })
  quantity: number

  @Prop({ required: true })
  food: string

  @Prop({ required: true })
  weight: number

  @Prop({ required: true })
  foodId: string

  @Prop({ type: ImageInfoSchema })
  image?: ImageInfo

  @Prop()
  measure?: string
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient)

@Schema()
export class RecipeDetails extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User | Types.ObjectId

  @Prop({ required: true })
  label: string

  @Prop({ type: ImageInfoSchema })
  image: ImageInfo

  @Prop()
  url: string

  @Prop({ required: true })
  calories: number

  @Prop({ type: [IngredientSchema], default: [] })
  ingredients: Ingredient[]

  @Prop({ type: [NutrientInfoSchema], required: true, default: [] })
  nutrients: NutrientInfo[]

  @Prop()
  servings: number
}

export const RecipeDetailsSchema = SchemaFactory.createForClass(RecipeDetails)

@Schema()
export class Meal {
  @Prop({ required: true, type: RecipeDetailsSchema })
  recipeDetails: RecipeDetails
}

export const MealSchema = SchemaFactory.createForClass(Meal)

@Schema()
export class DayOfEating {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User | Types.ObjectId

  @Prop({ type: [MealSchema], default: [] })
  meals: Meal[]

  @Prop()
  day: string
}

export const DayOfEatingSchema = SchemaFactory.createForClass(DayOfEating)

@Schema()
export class WeekOfEating {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User | Types.ObjectId

  @Prop({ type: [DayOfEatingSchema], default: [] })
  days: DayOfEating[]
}

export const WeekOfEatingSchema = SchemaFactory.createForClass(WeekOfEating)
