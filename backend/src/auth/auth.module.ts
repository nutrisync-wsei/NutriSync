import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './schemas/user.schema'
import {
  RefreshToken,
  RefreshTokenSchema
} from './schemas/refresh-token.schema'
import { ResetToken, ResetTokenSchema } from './schemas/reset-token.schema'
import { GithubStrategy } from './strategies/github.strategy'
import { SpotifyStrategy } from './strategies/spotify.strategy'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      },
      {
        name: RefreshToken.name,
        schema: RefreshTokenSchema
      },
      {
        name: ResetToken.name,
        schema: ResetTokenSchema
      }
    ])
  ],
  controllers: [AuthController],
  providers: [GithubStrategy, SpotifyStrategy, AuthService]
})
export class AuthModule {}
