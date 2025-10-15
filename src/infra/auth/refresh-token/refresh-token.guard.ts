import { IS_REFRESH_KEY } from '@/infra/auth/decorators/refresh.decorator'
import { Role, ROLES_KEY } from '@/infra/auth/decorators/roles.decorator'
import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class RefreshTokenGuard extends AuthGuard('refresh-token') {
  constructor(private reflector: Reflector) {
    super()
  }

  async canActivate(context: ExecutionContext) {
    const isRefresh = this.reflector.getAllAndOverride<boolean>(
      IS_REFRESH_KEY,
      [context.getHandler(), context.getClass()],
    )

    if (!isRefresh) return true

    await super.canActivate(context)

    const {
      user: { role: userRole },
    } = context.switchToHttp().getRequest()

    if (userRole === 'ADMIN') return true

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    return requiredRoles?.some((role) => userRole === role)
  }
}
