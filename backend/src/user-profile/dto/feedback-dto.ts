import { ApiProperty } from '@nestjs/swagger'
import { FeedbackType } from '../types/types'

export class FeedbackDto {
  @ApiProperty({
    description: 'Specifies the type of feedback',
    enum: FeedbackType
  })
  type: FeedbackType

  @ApiProperty({
    description: 'Detailed message for the user',
    type: String
  })
  message: string

  @ApiProperty({
    description: 'Additional suggestions or actions the user can take',
    type: String,
    required: false
  })
  suggestion?: string
}
