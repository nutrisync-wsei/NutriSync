import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { SignUpDto } from './dto/signUp.dto'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './schemas/user.schema'
import mongoose, { Model } from 'mongoose'
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto'
import { JwtService } from '@nestjs/jwt'
import { RefreshToken } from './schemas/refresh-token.schema'
import { v4 as uuidv4 } from 'uuid'

type UserId = string | mongoose.Types.ObjectId

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(RefreshToken.name)
    private RefreshTokenModel: Model<RefreshToken>,
    private jwtService: JwtService
  ) {}

  async signUp(signUpData: SignUpDto) {
    const { email, password, name } = signUpData

    const emailInUse = await this.UserModel.findOne({ email })

    if (emailInUse) throw new BadRequestException('Email already in use')

    const hashedPassword = await bcrypt.hash(password, 10)

    await this.UserModel.create({
      name,
      email,
      password: hashedPassword
    })
  }

  async login(credentials: LoginDto) {
    const { email, password } = credentials

    const user = await this.UserModel.findOne({ email })

    if (!user) throw new UnauthorizedException('Wrong credentials')

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) throw new UnauthorizedException('Wrong credentials')

    const tokens = await this.generateUserTokens(user._id as string)

    return {
      ...tokens,
      user: user.name
    }
  }

  async refreshToken(token: string) {
    const refreshToken = await this.RefreshTokenModel.findOne({
      token,
      expiryDate: {
        $gte: new Date()
      }
    })

    if (!refreshToken) throw new UnauthorizedException('Invalid refresh token')

    return this.generateUserTokens(refreshToken.userId)
  }

  async generateUserTokens(userId: UserId) {
    const accessToken = this.jwtService.sign({ userId }, { expiresIn: '1h' })
    const refreshToken = uuidv4()

    await this.storeRefreshToken(refreshToken, userId as string)

    return {
      accessToken,
      refreshToken
    }
  }

  async storeRefreshToken(token: string, userId: string) {
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + 3) // 3 days

    await this.RefreshTokenModel.updateOne(
      { userId },
      { $set: { expiryDate, token } },
      { upsert: true }
    )
  }
}
