import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, ValidateNested, IsObject } from 'class-validator'
import { Type } from 'class-transformer'
import { ImageInfoDto } from './image-info.dto'
import { IngredientDto } from './ingredient.dto'
import { NutrientsInfoDto } from './nutrients-info.dto'
import { NutrientInfoDto } from './nutrient-info.dto'

export class RecipeDetailsDto {
  @ApiProperty({ example: 'Chicken Soup' })
  @IsString()
  label: string

  @ApiProperty({ type: ImageInfoDto })
  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => ImageInfoDto)
  image: ImageInfoDto

  @ApiProperty({ example: 'http://example.com/recipe' })
  @IsString()
  url: string

  @ApiProperty({ type: Number })
  @IsString()
  calories: number

  @ApiProperty({ type: [IngredientDto] })
  @ValidateNested({ each: true })
  @Type(() => IngredientDto)
  ingredients: IngredientDto[]

  @ApiProperty({ type: NutrientsInfoDto })
  @ValidateNested()
  nutrients: NutrientInfoDto[]

  constructor(
    label: string,
    image: ImageInfoDto,
    url: string,
    calories: number,
    ingredients: IngredientDto[],
    nutrients: NutrientInfoDto[]
  ) {
    this.label = label
    this.image = image
    this.url = url
    this.calories = calories
    this.ingredients = ingredients
    this.nutrients = nutrients
  }
}
