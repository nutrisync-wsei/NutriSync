import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { UserProfile } from './schemas/user-profile.schema'
import { Model } from 'mongoose'
import { UserProfileDto } from './dto/user-profile.dto'
import { Messages } from 'src/messages'
import { BodyDimensionsDto } from './dto/body-dimensions.dto'

@Injectable()
export class UserProfileService {
  constructor(
    @InjectModel(UserProfile.name) private UserProfileModel: Model<UserProfile>
  ) {}

  async create(profileData: UserProfileDto) {
    const { userId } = profileData

    const infoInUse = await this.findByUserId(userId)

    if (infoInUse) throw new BadRequestException(Messages.USER_PROFILE_EXISTS)

    return await this.UserProfileModel.create(profileData)
  }

  async findByUserId(userId: string) {
    return await this.UserProfileModel.findOne({ user: userId })
  }

  async update(userId: string, profileData: UserProfileDto) {
    const userExists = await this.findByUserId(userId)

    if (!userExists)
      throw new BadRequestException(Messages.USER_PROFILE_NOT_FOUND)

    return await this.UserProfileModel.findOneAndUpdate(
      { user: userId },
      profileData,
      { new: true }
    )
  }

  async delete(userId: string) {
    return await this.UserProfileModel.findOneAndDelete({ user: userId })
  }

  async updateBodyDimensions(
    userId: string,
    bodyDimensions: BodyDimensionsDto
  ) {
    const userProfile = await this.findByUserId(userId)

    if (!userProfile)
      throw new BadRequestException(Messages.USER_PROFILE_NOT_FOUND)

    Object.assign(userProfile, bodyDimensions)

    return await userProfile.save()
  }
}
