import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import mongoose from 'mongoose'

export type AuthServiceError =
  | BadRequestException
  | UnauthorizedException
  | NotFoundException

export type UserId = string | mongoose.Types.ObjectId
