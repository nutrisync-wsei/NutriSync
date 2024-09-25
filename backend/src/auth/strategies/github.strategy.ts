import { PassportStrategy } from '@nestjs/passport'
import { AuthService } from '../auth.service'
import { Injectable } from '@nestjs/common'
import { Strategy, Profile } from 'passport-github2'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService
  ) {
    super({
      clientID: configService.get<string>('GH_CLIENT_ID'),
      clientSecret: configService.get<string>('GH_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GH_CALLBACK_URL'),
      scope: ['user:email']
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user?: any, info?: any) => void
  ): Promise<any> {
    return done(null, profile, { accessToken, refreshToken })
  }
}
