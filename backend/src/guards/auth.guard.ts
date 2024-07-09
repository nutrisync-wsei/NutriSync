import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { Observable } from 'rxjs'
import { Messages } from 'src/messages'

type CtxRequest = Request & { userId?: string }

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    ctx: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: CtxRequest = ctx.switchToHttp().getRequest()

    const token = this.extractTokenFromHeader(request)

    if (!token) throw new UnauthorizedException(Messages.INVALID_TOKEN)

    try {
      const payload = this.jwtService.verify(token)
      request.userId = payload.userId
    } catch (error) {
      Logger.error(error.message)
      throw new UnauthorizedException(Messages.INVALID_TOKEN)
    }

    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    return request.headers['authorization']?.split(' ')[1]
  }
}
