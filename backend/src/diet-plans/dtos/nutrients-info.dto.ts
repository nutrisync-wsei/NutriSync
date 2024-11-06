import { ApiProperty } from '@nestjs/swagger'
import { ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { NutrientInfoDto } from './nutrient-info.dto'

export class NutrientsInfoDto {
  @ApiProperty({ type: NutrientInfoDto, isArray: true })
  @ValidateNested({ each: true })
  @Type(() => NutrientInfoDto)
  nutrients: NutrientInfoDto[]
}
