import { ApiProperty } from '@nestjs/swagger'
import { IsString, MinLength, Matches } from 'class-validator'
import { Messages } from 'src/messages'

export class ChangePasswordDto {
  @ApiProperty()
  @IsString()
  oldPassword: string

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[0-9])/, {
    message: Messages.MIN_6_CHARACTERS
  })
  newPassword: string
}
