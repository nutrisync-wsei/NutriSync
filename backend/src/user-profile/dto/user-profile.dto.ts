import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsNumber,
  IsString,
  Max,
  Min
} from 'class-validator'
import { ActivityLevel, Gender, Goal } from '../types/types'

export class UserProfileDto {
  @ApiProperty({ type: String, description: 'User MongoDB ID' })
  @IsString()
  user: string

  @ApiProperty({ type: Number })
  @IsInt()
  @Min(0)
  @Max(120)
  age: number

  @ApiProperty({
    enum: Gender,
    description: 'Gender'
  })
  @IsEnum(Gender)
  gender: Gender

  @ApiProperty({ type: Number })
  @IsInt()
  @Min(100)
  @Max(250)
  height: number

  @ApiProperty({ type: Number })
  @IsInt()
  @Min(0)
  @Max(500)
  weight: number

  @ApiProperty({
    enum: ActivityLevel,
    description: 'Activity level of the user'
  })
  @IsEnum(ActivityLevel)
  activityLevel: ActivityLevel

  @ApiProperty({ enum: Goal, description: 'User goal' })
  @IsOptional()
  @IsEnum(Goal)
  goal: Goal

  @ApiPropertyOptional({
    type: [String],
    description: 'Dietary Restrictions like gluten-free, vegan, etc.'
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  dietaryRestrictions?: string[]

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

  @ApiPropertyOptional({
    type: Number,
    description: 'BMI indicator'
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  BMI?: number

  @ApiPropertyOptional({
    type: Number,
    description: 'BMR indicator'
  })
  @IsOptional()
  @IsNumber()
  @Min(1200)
  @Max(10000)
  BMR?: number

  @ApiPropertyOptional({
    type: Number,
    description: 'TDEE indicator'
  })
  @IsOptional()
  @IsNumber()
  TDEE?: number
}
