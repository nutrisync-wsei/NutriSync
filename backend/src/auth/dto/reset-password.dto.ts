import { IsString, MinLength, Matches } from 'class-validator'

export class ResetPasswordDto {
  @IsString()
  resetToken: string

  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[0-9])/, {
    message:
      'Password must be at least 6 characters, containing min. one number'
  })
  newPassword: string
}
