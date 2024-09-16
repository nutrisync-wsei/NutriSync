import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min
} from 'class-validator'
import { ActivityLevel, Goal } from '../types/types'

export class UserProfileDto {
  @ApiProperty({ type: String, description: 'User MongoDB ID' })
  @IsString()
  userId: string

  @ApiProperty({ type: Number })
  @IsInt()
  @Min(0)
  @Max(120)
  age: number

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
    type: [String],
    description: 'Medical Conditions such as diabetes, hypertension, etc.'
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  medicalConditions?: string[]
}
