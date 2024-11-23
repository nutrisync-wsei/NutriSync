import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { UserProfile } from './schemas/user-profile.schema'
import { Model } from 'mongoose'
import { UserProfileDto } from './dto/user-profile.dto'
import { Messages } from 'src/messages'
import { ProgressLogDto } from './dto/progress-log.dto'
import { FeedbackType, Goal } from './types/types'
import { FeedbackDto } from './dto/feedback-dto'

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

  analyzeProgress(logs: ProgressLogDto[], goal: string): FeedbackDto {
    if (logs.length < 2) {
      return {
        type: FeedbackType.NEUTRAL,
        message: Messages.NOT_ENOUGH_DATA,
        suggestion: Messages.ADD_MORE_MEASURES
      }
    }

    const currentWeight = logs[logs.length - 1]?.weight
    const previousWeight = logs[logs.length - 2]?.weight

    const feedback = new FeedbackDto()

    switch (goal) {
      case Goal.LOSE_WEIGHT:
        if (currentWeight < previousWeight) {
          feedback.type = FeedbackType.POSITIVE
          feedback.message = Messages.SUCCESSFUL_WEIGHT_LOSS
          feedback.suggestion = Messages.KEEP_UP_GOOD_WORK
        } else if (currentWeight > previousWeight) {
          feedback.type = FeedbackType.NEGATIVE
          feedback.message = Messages.FAILURE_WEIGHT_LOSS
          feedback.suggestion = Messages.REVIEW_DIET_ACTIVITY
        } else {
          feedback.type = FeedbackType.NEUTRAL
          feedback.message = Messages.STABLE_WEIGHT
          feedback.suggestion = Messages.OBSERVE
        }
        break
      case Goal.GAIN_WEIGHT:
        if (currentWeight > previousWeight) {
          feedback.type = FeedbackType.POSITIVE
          feedback.message = Messages.SUCCESSFUL_WEIGHT_GAIN
          feedback.suggestion = Messages.KEEP_UP_GOOD_WORK
        } else if (currentWeight < previousWeight) {
          feedback.type = FeedbackType.NEGATIVE
          feedback.message = Messages.FAILURE_WEIGHT_GAIN
          feedback.suggestion = Messages.INCREASE_CALORIES
        } else {
          feedback.type = FeedbackType.NEUTRAL
          feedback.message = Messages.STABLE_WEIGHT
          feedback.suggestion = Messages.OBSERVE
        }
        break
      case Goal.MAINTAIN_WEIGHT:
        if (Math.abs(currentWeight - previousWeight) < 0.2) {
          feedback.type = FeedbackType.POSITIVE
          feedback.message = Messages.EXCELLENT_WEIGHT_MAINTENANCE
          feedback.suggestion = Messages.KEEP_UP_GOOD_WORK
        } else {
          feedback.type = FeedbackType.NEGATIVE
          feedback.message = Messages.FAILURE_MAINTAINING
          feedback.suggestion = Messages.REVIEW_DIET_ACTIVITY
        }
        break
      default:
        feedback.type = FeedbackType.NEUTRAL
        feedback.message = Messages.NO_PROGRESS
        feedback.suggestion = Messages.START_TRACKING
    }

    return feedback
  }

  async generateFeedback(userId: string): Promise<FeedbackDto> {
    const userProfile = await this.findByUserId(userId)
    const progress = this.analyzeProgress(userProfile.logs, userProfile.goal)

    return progress
  }
}
