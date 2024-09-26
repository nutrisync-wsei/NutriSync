import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, Matches, MinLength } from 'class-validator'
import { Messages } from 'src/messages'

export class SignUpDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[0-9])/, {
    message: Messages.MIN_6_CHARACTERS
  })
  password: string
}
