import { Controller, Post, Body, Put, UseGuards, Req } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignUpDto } from './dto/signUp.dto'
import { LoginDto } from './dto/login.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { ChangePasswordDto } from './dto/change-password.dto'
import { AuthGuard } from 'src/guards/auth.guard'
import { ForgotPasswordDto } from './dto/forgot-password.dto'
import { ResetPasswordDto } from './dto/reset-password.dto'

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

  @Put('change-password')
  @UseGuards(AuthGuard)
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() request
  ) {
    return this.authService.changePassword(
      request.userId,
      changePasswordDto.oldPassword,
      changePasswordDto.newPassword
    )
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto.email)
  }

  @Put('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(
      resetPasswordDto.newPassword,
      resetPasswordDto.resetToken
    )
  }
}
