import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsNumber, Min, Max, IsOptional } from 'class-validator'

export class BodyDimensionsDto {
  @ApiPropertyOptional({
    type: Number,
    description: 'Target weight of the user [kg]'
  })
  @IsOptional()
  @IsNumber()
  @Min(40)
  @Max(300)
  targetWeight?: number

  @ApiPropertyOptional({
    type: Number,
    description: 'Neck circumference [cm]'
  })
  @IsOptional()
  @IsNumber()
  @Min(20)
  @Max(60)
  neckCircumference?: number

  @ApiPropertyOptional({
    type: Number,
    description: 'Arm circumference [cm]'
  })
  @IsOptional()
  @IsNumber()
  @Min(20)
  @Max(80)
  armCircumference?: number

  @ApiPropertyOptional({
    type: Number,
    description: 'Chest circumference [cm]'
  })
  @IsOptional()
  @IsNumber()
  @Min(55)
  @Max(200)
  chestCircumference?: number

  @ApiPropertyOptional({
    type: Number,
    description: 'Waist circumference [cm]'
  })
  @IsOptional()
  @IsNumber()
  @Min(40)
  @Max(150)
  waistCircumference?: number

  @ApiPropertyOptional({
    type: Number,
    description: 'Hips circumference [cm]'
  })
  @IsOptional()
  @IsNumber()
  @Min(60)
  @Max(200)
  hipsCircumference?: number

  @ApiPropertyOptional({
    type: Number,
    description: 'Thigh circumference [cm]'
  })
  @IsOptional()
  @IsNumber()
  @Min(30)
  @Max(80)
  thighCircumference?: number

  @ApiPropertyOptional({
    type: Number,
    description: 'Calf circumference [cm]'
  })
  @IsOptional()
  @IsNumber()
  @Min(15)
  @Max(60)
  calfCircumference?: number
}
