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
  Get
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
import { ApiExcludeEndpoint } from '@nestjs/swagger'

type AuthServiceError =
  | BadRequestException
  | UnauthorizedException
  | NotFoundException

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
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
  async login(
    @Body() credentials: LoginDto,
    @Res()
    res: Response<{
      accessToken: string
      user: { username: string; email: string }
    }>
  ) {
    try {
      const result = await this.authService.login(credentials)

      return res.status(HttpStatus.OK).send(result)
    } catch (error) {
      this.handleException(error, res)
    }
  }

  @Post('refresh')
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
    @Res() res: Response<{ accessToken: string; refreshToken: string }>
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

  @ApiExcludeEndpoint()
  @Put('change-password')
  @UseGuards(AuthGuard)
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() request: Request & { userId: string },
    @Res() res: Response<{ message: string }>
  ) {
    try {
      await this.authService.changePassword(
        request.userId,
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

  @ApiExcludeEndpoint()
  @Post('forgot-password')
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

  @ApiExcludeEndpoint()
  @Put('reset-password')
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
