import { IsEmail, IsString, Matches, MinLength } from 'class-validator'
import { Messages } from 'src/messages'

export class SignUpDto {
  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[0-9])/, {
    message: Messages.MIN_6_CHARACTERS
  })
  password: string
}
