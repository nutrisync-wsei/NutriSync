import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { UserProfile } from './schemas/user-profile.schema'
import { Model } from 'mongoose'
import { UserProfileDto } from './dto/user-profile.dto'
import { Messages } from 'src/messages'
import { ProgressLogDto } from './dto/progress-log.dto'

@Injectable()
export class UserProfileService {
  constructor(
    @InjectModel(UserProfile.name) private UserProfileModel: Model<UserProfile>
  ) {}

  async create(profileData: UserProfileDto) {
    const { user } = profileData

    const infoInUse = await this.findByUserId(user)

    if (infoInUse) throw new BadRequestException(Messages.USER_PROFILE_EXISTS)

    return await this.UserProfileModel.create(profileData)
  }

  async findByUserId(userId: string) {
    return await this.UserProfileModel.findOne({ user: userId })
  }

  async update(userId: string, profileData: Partial<UserProfileDto>) {
    const userExists = await this.findByUserId(userId)

    if (!userExists)
      throw new BadRequestException(Messages.USER_PROFILE_NOT_FOUND)

    return await this.UserProfileModel.findOneAndUpdate(
      { user: userId },
      { $set: profileData },
      { new: true }
    )
  }

  async delete(userId: string) {
    return await this.UserProfileModel.findOneAndDelete({ user: userId })
  }

  async updateAndLogProgress(
    userId: string,
    progressUpdate: Omit<ProgressLogDto, 'timestamp'>
  ) {
    const userProfile = await this.findByUserId(userId)

    if (!userProfile)
      throw new BadRequestException(Messages.USER_PROFILE_NOT_FOUND)

    if (Object.keys(progressUpdate).length === 0) {
      throw new BadRequestException(Messages.INVALID_UPDATE_DATA)
    }

    const updatedLog: ProgressLogDto = {
      ...progressUpdate,
      timestamp: new Date()
    }

    userProfile.logs.push(updatedLog)
    await userProfile.save()
    return userProfile
  }

  async getUserProgress(userId: string): Promise<ProgressLogDto[]> {
    const userProfile = await this.findByUserId(userId)

    if (!userProfile)
      throw new BadRequestException(Messages.USER_PROFILE_NOT_FOUND)

    return userProfile.logs
  }
}
