import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'
import { AuthGuard } from './guards/auth.guard'
import { Messages } from './messages'

@UseGuards(AuthGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  someProtectedRoute(@Req() request) {
    return { message: Messages.ACCESS_GRANTED, userId: request.userId }
  }
}
