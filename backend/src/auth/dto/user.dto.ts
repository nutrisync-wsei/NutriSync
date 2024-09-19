// user.dto.ts
import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsEmail } from 'class-validator'

export class UserDto {
  @ApiProperty()
  @IsString()
  username: string

  @ApiProperty()
  @IsEmail()
  email: string
}
