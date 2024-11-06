import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber } from 'class-validator'

export class NutrientInfoDto {
  @ApiProperty({ example: 'Calcium' })
  @IsString()
  label: string

  @ApiProperty({ example: 100 })
  @IsNumber()
  quantity: number

  @ApiProperty({ example: 'mg' })
  @IsString()
  unit: string

  constructor(label: string, quantity: number, unit: string) {
    this.label = label
    this.quantity = quantity
    this.unit = unit
  }
}
