import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
  UseGuards
} from '@nestjs/common'
import { UserProfileService } from './user-profile.service'
import { UserProfileDto } from './dto/user-profile.dto'
import { AuthGuard } from 'src/guards/auth.guard'
import { Response } from 'express'
import { Messages } from 'src/messages'
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import { ProgressLogDto } from './dto/progress-log.dto'
import { FeedbackDto } from './dto/feedback-dto'

@ApiTags('user-profile')
@ApiBearerAuth()
@Controller('user-profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user profile' })
  @ApiBody({ type: UserProfileDto, description: 'Profile data to create' })
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 201, description: 'User profile created' })
  @ApiResponse({ status: 400, description: 'Failure creating profile' })
  async createUserProfile(
    @Body() userProfileDto: UserProfileDto,
    @Res() res: Response
  ) {
    try {
      const userProfile = await this.userProfileService.create(userProfileDto)
      return res.status(HttpStatus.CREATED).json(userProfile)
    } catch (error) {
      throw new BadRequestException(Messages.FAILURE_CREATING_PROFILE)
    }
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Retrieve a user profile by user ID' })
  @ApiParam({ name: 'userId', type: String, description: 'The ID of the user' })
  @ApiResponse({
    status: 200,
    description: 'User profile found',
    type: UserProfileDto
  })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  async getUserProfile(@Param('userId') userId: string, @Res() res: Response) {
    try {
      const userProfile = await this.userProfileService.findByUserId(userId)
      if (!userProfile) throw new NotFoundException(Messages.PROFILE_NOT_FOUND)

      return res.status(HttpStatus.OK).json(userProfile)
    } catch (error) {
      this.handleException(error, res)
    }
  }

  @Put(':userId')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Update an existing user profile including body dimensions'
  })
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'The ID of the user to update'
  })
  @ApiBody({ type: UserProfileDto, description: 'Updated profile data' })
  @ApiResponse({
    status: 200,
    description: 'User profile updated',
    type: UserProfileDto
  })
  @ApiResponse({ status: 400, description: 'Failure updating profile' })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  async updateUserProfile(
    @Param('userId') userId: string,
    @Body() userProfileDto: UserProfileDto,
    @Res() res: Response
  ) {
    try {
      const updatedProfile = await this.userProfileService.update(
        userId,
        userProfileDto
      )
      if (!updatedProfile)
        throw new NotFoundException(Messages.PROFILE_NOT_FOUND)

      return res.status(HttpStatus.OK).json(updatedProfile)
    } catch (error) {
      this.handleException(error, res)
    }
  }

  @Put('progress/:userId')
  @ApiOperation({ summary: 'Update user profile and log progress' })
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'The ID of the user to update'
  })
  @ApiBody({
    type: ProgressLogDto,
    description: 'Updated profile weight and timestamp'
  })
  @ApiResponse({
    status: 200,
    description: 'Progress updated and logged',
    type: UserProfileDto
  })
  @UseGuards(AuthGuard)
  async updateAndLogUserProfile(
    @Param('userId') userId: string,
    @Body() updates: ProgressLogDto,
    @Res() res: Response
  ) {
    try {
      const updatedProfile = await this.userProfileService.updateAndLogProgress(
        userId,
        updates
      )
      return res.status(HttpStatus.OK).json(updatedProfile)
    } catch (error) {
      console.log(error)
      this.handleException(error, res)
    }
  }

  @Get('progress/:userId')
  @ApiOperation({ summary: 'Get user progress logs' })
  @ApiParam({ name: 'userId', type: String, description: 'The ID of the user' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [ProgressLogDto],
    description: 'Progress data for the user'
  })
  async getUserProgress(
    @Param('userId') userId: string
  ): Promise<ProgressLogDto[]> {
    return this.userProfileService.getUserProgress(userId)
  }

  @Get('feedback/:userId')
  @ApiOperation({ summary: 'Generate a new user feedback' })
  @ApiParam({ name: 'userId', type: String, description: 'The ID of the user' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: FeedbackDto,
    description: 'User feedback'
  })
  async getFeedback(@Param('userId') userId: string): Promise<FeedbackDto> {
    return this.userProfileService.generateFeedback(userId)
  }

  private handleException(error: any, res: Response) {
    if (
      error instanceof BadRequestException ||
      error instanceof NotFoundException
    ) {
      res.status(error.getStatus()).send({ message: error.message })
    } else {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: Messages.INTERNAL_SERVER_ERROR })
    }
  }
}
