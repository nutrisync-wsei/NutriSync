import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    JwtModule.register({ global: true, secret: 'CHANGE_ME' }),
    MongooseModule.forRoot(
      'mongodb+srv://user:welcome123@manageme.6igt2tx.mongodb.net/dev'
    ),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
