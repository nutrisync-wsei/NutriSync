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
  Req,
  Res,
  UseGuards
} from '@nestjs/common'
import { UserProfileService } from './user-profile.service'
import { UserProfileDto } from './dto/user-profile.dto'
import { AuthGuard } from 'src/guards/auth.guard'
import { Request, Response } from 'express'
import { Messages } from 'src/messages'

@Controller('user-profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createUserProfile(
    @Body() userProfileDto: UserProfileDto,
    @Req() _: Request,
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
  async getUserProfile(@Param('userId') userId: string, @Res() res: Response) {
    try {
      const userProfile = await this.userProfileService.findByUserId(userId)
      if (!userProfile) {
        throw new NotFoundException(Messages.PROFILE_NOT_FOUND)
      }

      return res.status(HttpStatus.OK).json(userProfile)
    } catch (error) {
      this.handleException(error, res)
    }
  }

  @Put(':userId')
  @UseGuards(AuthGuard)
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
      if (!updatedProfile) {
        throw new NotFoundException(Messages.PROFILE_NOT_FOUND)
      }
      return res.status(HttpStatus.OK).json(updatedProfile)
    } catch (error) {
      this.handleException(error, res)
    }
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