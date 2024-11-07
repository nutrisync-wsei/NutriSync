import { Module } from '@nestjs/common'
import { UserProfileService } from './user-profile.service'
import { UserProfileController } from './user-profile.controller'
import { UserProfile, UserProfileSchema } from './schemas/user-profile.schema'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserProfile.name,
        schema: UserProfileSchema
      }
    ])
  ],
  providers: [UserProfileService],
  controllers: [UserProfileController],
  exports: [UserProfileService]
})
export class UserProfileModule {}
