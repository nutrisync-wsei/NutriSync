import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignUpDto } from './dto/signUp.dto'
import { LoginDto } from './dto/login.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpData: SignUpDto) {
    return this.authService.signUp(signUpData)
  }

  @Post('login')
  async login(@Body() credentials: LoginDto) {
    return this.authService.login(credentials)
  }

  @Post('refresh')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken)
  }
}
