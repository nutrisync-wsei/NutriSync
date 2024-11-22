import { IsInt, Max, Min } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Prop } from '@nestjs/mongoose'

export class ProgressLogDto {
  @ApiProperty({ type: Date, description: 'Date of measurement' })
  @Prop({ type: Date, default: Date.now })
  timestamp: Date

  @ApiProperty({ type: Number })
  @IsInt()
  @Min(0)
  @Max(500)
  weight: number
}
