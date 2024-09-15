import { PassportStrategy } from '@nestjs/passport'
import { AuthService } from '../auth.service'
import { Injectable } from '@nestjs/common'
import { Profile, Strategy, VerifyCallback } from 'passport-spotify'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class SpotifyStrategy extends PassportStrategy(Strategy, 'spotify') {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService
  ) {
    super({
      clientID: configService.get<string>('SPOTIFY_CLIENT_ID'),
      clientSecret: configService.get<string>('SPOTIFY_CLIENT_SECRET'),
      callbackURL: configService.get<string>('SPOTIFY_CALLBACK_URL'),
      scope: ['user-read-email', 'user-read-private']
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ): Promise<any> {
    return done(null, profile, { accessToken, refreshToken })
  }
}
