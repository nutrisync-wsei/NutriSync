import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'
import { ImageInfoDto } from './image-info.dto'

export class IngredientDto {
  @ApiProperty({ example: '2 cups of sugar' })
  @IsString()
  text: string

  @ApiProperty({ example: 2 })
  @IsNumber()
  quantity: number

  @ApiProperty({ example: 'cups' })
  @IsString()
  measure?: string

  @ApiProperty({ example: 'Sugar' })
  @IsString()
  food: string

  @ApiProperty({ example: 100 })
  @IsNumber()
  weight: number

  @ApiProperty({ example: 'food_b49rs1kaw0jktabzkg2vvanvvsis' })
  @IsString()
  foodId: string

  @ApiProperty({ type: ImageInfoDto, required: false })
  @IsOptional()
  @Type(() => ImageInfoDto)
  image?: ImageInfoDto

  constructor(
    text: string,
    quantity: number,
    food: string,
    weight: number,
    foodId: string,
    image?: ImageInfoDto,
    measure?: string
  ) {
    this.text = text
    this.quantity = quantity
    this.measure = measure
    this.food = food
    this.weight = weight
    this.foodId = foodId
    this.image = image
  }
}
