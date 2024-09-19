import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { UserDto } from './user.dto'

export class LoginResponseDto {
  @ApiProperty()
  @IsString()
  accessToken: string

  @ApiProperty({ type: UserDto })
  user: UserDto
}
