import {
  BadRequestException,
  Injectable,
  NotFoundException,
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
import { nanoid } from 'nanoid'
import { ResetToken } from './schemas/reset-token.schema'
import { MailerService } from '@nestjs-modules/mailer'

type UserId = string | mongoose.Types.ObjectId

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(RefreshToken.name)
    private RefreshTokenModel: Model<RefreshToken>,
    @InjectModel(ResetToken.name)
    private ResetTokenModel: Model<ResetToken>,
    private jwtService: JwtService,
    private mailService: MailerService
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

  async changePassword(
    userId: UserId,
    oldPassword: string,
    newPassword: string
  ) {
    const user = await this.UserModel.findById(userId)

    if (!user) throw new NotFoundException('User not found')

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password)

    if (!isPasswordValid) throw new UnauthorizedException('Wrong credentials')

    const newHashedPassword = await bcrypt.hash(newPassword, 10)

    user.password = newHashedPassword

    await user.save()
  }

  async forgotPassword(email: string) {
    const user = await this.UserModel.findOne({ email })

    if (user) {
      const expiryDate = new Date()
      expiryDate.setHours(expiryDate.getHours() + 1)

      const resetToken = nanoid(64)

      await this.ResetTokenModel.create({
        token: resetToken,
        userId: user._id,
        expiryDate
      })

      this.sendPasswordRecoveryEmail(email, resetToken)
    }

    return {
      message:
        'If this user exists, an email will be sent to the provided email address.'
    }
  }

  async resetPassword(newPassword: string, resetToken: string) {
    const token = await this.ResetTokenModel.findOne({
      token: resetToken,
      expiryDate: {
        $gte: new Date()
      }
    })

    if (!token) throw new UnauthorizedException('Invalid link')

    const user = await this.UserModel.findById(token.userId)

    if (!user) throw new NotFoundException('User not found')

    user.password = await bcrypt.hash(newPassword, 10)

    await user.save()
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

  async sendPasswordRecoveryEmail(email: string, resetToken: string) {
    const message = `<p>There was an attempt to reset a password for this account. Click the link below to reset your password:</p>
          <p><a href="${process.env.RESET_PASSWORD_URL + resetToken}">Reset Password</a></p>
          <p>If that wasn't your request, ignore this message!</p>`

    await this.mailService.sendMail({
      from: 'NutriSync <nutrisync@gmail.com>',
      to: email,
      subject: 'Auth - password reset request',
      html: message
    })
  }
}
