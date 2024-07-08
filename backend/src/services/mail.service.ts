import { Injectable } from '@nestjs/common'
import * as nodemailer from 'nodemailer'

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'eusebio49@ethereal.email',
        pass: 'Ds3pV2vU36jfrDYfwu'
      }
    })
  }

  async sendPasswordResetEmail(to: string, token: string) {
    const resetLink = `http://localhost:3000/auth/reset-password?token=${token}`
    const mailOptions = {
      from: 'NUTRISYNC',
      to,
      subject: 'Auth - password reset request',
      html: `<p>There was an attempt to reset a password for this account. Click the link below to reset your password:</p>
      <p><a href="${resetLink}">Reset Password</a></p>
      <p>If that wasn't your request, ignore this message!</p>`
    }

    await this.transporter.sendMail(mailOptions)
  }
}
