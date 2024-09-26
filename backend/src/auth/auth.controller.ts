import {
  Controller,
  Post,
  Body,
  Put,
  UseGuards,
  Req,
  Res,
  HttpStatus,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
  Get,
  Param
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignUpDto } from './dto/signUp.dto'
import { LoginDto } from './dto/login.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { ChangePasswordDto } from './dto/change-password.dto'
import { AuthGuard } from 'src/guards/auth.guard'
import { ForgotPasswordDto } from './dto/forgot-password.dto'
import { ResetPasswordDto } from './dto/reset-password.dto'
import { Response } from 'express'
import { Messages } from 'src/messages'
import { Profile } from 'passport-spotify'
import { SpotifyOauthGuard } from 'src/guards/spotify.oauth.guard'
import { GithubOauthGuard } from 'src/guards/github.oauth.guard'
import {
  ApiBearerAuth,
  ApiBody,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import { LoginResponseDto } from './dto/login-response.dto'
import { TokensDto } from './dto/tokens.dto'
import { AuthServiceError } from './types'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: SignUpDto })
  @ApiResponse({ status: 201, description: 'Account created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async signUp(
    @Body() signUpData: SignUpDto,
    @Res() res: Response<{ message: string }>
  ) {
    try {
      this.authService.signUp(signUpData)

      // TODO: Should we login user here?
      return res
        .status(HttpStatus.CREATED)
        .send({ message: Messages.ACCOUNT_CREATED })
    } catch (error) {
      this.handleException(error, res)
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Authenticate a user and provide tokens' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: LoginResponseDto
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(
    @Body() credentials: LoginDto,
    @Res()
    res: Response<LoginResponseDto>
  ) {
    try {
      const result = await this.authService.login(credentials)

      return res.status(HttpStatus.OK).send(result)
    } catch (error) {
      this.handleException(error, res)
    }
  }

  @Post('refresh-token')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Refresh authentication tokens' })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({
    status: 200,
    type: TokensDto
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
    @Res() res: Response<TokensDto>
  ) {
    try {
      const result = await this.authService.refreshToken(
        refreshTokenDto.refreshToken
      )
      return res.status(HttpStatus.OK).send(result)
    } catch (error) {
      this.handleException(error, res)
    }
  }

  @Put('change-password/:userId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change user password' })
  @ApiParam({ name: 'userId', type: String, description: 'The ID of the user' })
  @ApiBody({ type: ChangePasswordDto })
  @ApiResponse({ status: 200, description: 'Password changed' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(AuthGuard)
  async changePassword(
    @Param('userId') userId: string,
    @Body() changePasswordDto: ChangePasswordDto,
    @Res() res: Response<{ message: string }>
  ) {
    try {
      await this.authService.changePassword(
        userId,
        changePasswordDto.oldPassword,
        changePasswordDto.newPassword
      )
      return res
        .status(HttpStatus.OK)
        .send({ message: Messages.PASSWORD_CHANGED })
    } catch (error) {
      this.handleException(error, res)
    }
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Initiate process for password recovery' })
  @ApiBody({ type: ForgotPasswordDto })
  @ApiResponse({ status: 200, description: 'Password recovery email sent' })
  @ApiResponse({
    status: 500,
    description: 'Failed to send password recovery email'
  })
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
    @Res() res: Response<{ message: string }>
  ) {
    try {
      const result = await this.authService.forgotPassword(
        forgotPasswordDto.email
      )
      return res.status(HttpStatus.OK).send(result)
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: Messages.PASSWORD_RECOVERY_EMAIL_FAILED })
    }
  }

  @Put('reset-password')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reset user password using token sent via email' })
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({ status: 200, description: 'Password reset' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @Res() res: Response<{ message: string }>
  ) {
    try {
      await this.authService.resetPassword(
        resetPasswordDto.newPassword,
        resetPasswordDto.resetToken
      )
      return res
        .status(HttpStatus.OK)
        .send({ message: Messages.PASSWORD_RESET })
    } catch (error) {
      this.handleException(error, res)
    }
  }

  private handleException(error: AuthServiceError, res: Response) {
    if (error instanceof BadRequestException) {
      return res.status(HttpStatus.BAD_REQUEST).send({ message: error.message })
    } else if (error instanceof UnauthorizedException) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .send({ message: error.message })
    } else if (error instanceof NotFoundException) {
      return res.status(HttpStatus.NOT_FOUND).send({ message: error.message })
    }
    throw error
  }

  @ApiExcludeEndpoint()
  @UseGuards(SpotifyOauthGuard)
  @Get('spotify')
  spotifyLogin() {
    // This route redirects to Spotify login page
  }

  @ApiExcludeEndpoint()
  @UseGuards(SpotifyOauthGuard)
  @Get('spotify/callback')
  async spotifyCallback(@Req() req: any, @Res() res: Response) {
    const { user }: { user: Profile } = req

    if (!user) {
      res.redirect('/')
      return
    }

    const { accessToken } = await this.authService.validateOAuthUser(
      user.emails[0].value,
      user.displayName
    )

    res.set('authorization', `Bearer ${accessToken}`)

    return res.status(200).json({
      accessToken,
      user: {
        username: user.displayName,
        email: user.emails[0].value
      }
    })
  }

  @ApiExcludeEndpoint()
  @UseGuards(GithubOauthGuard)
  @Get('github')
  githubLogin() {
    // This route redirects to Github login page
  }

  @ApiExcludeEndpoint()
  @UseGuards(GithubOauthGuard)
  @Get('github/callback')
  async githubCallback(@Req() req: any, @Res() res: Response) {
    const { user }: { user: Profile } = req

    if (!user) {
      res.redirect('/')
      return
    }

    const { accessToken } = await this.authService.validateOAuthUser(
      user.emails[0].value,
      user.username
    )

    res.set('authorization', `Bearer ${accessToken}`)

    return res.status(200).json({
      accessToken,
      user: {
        username: user.username,
        email: user.emails[0].value
      }
    })
  }
}
