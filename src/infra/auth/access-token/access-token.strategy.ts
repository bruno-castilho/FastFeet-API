import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { EnvService } from '@/infra/env/env.service'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { z } from 'zod'

const tokenPayloadSchema = z.object({
  sub: z.uuid(),
  sessionId: z.uuid(),
  role: z.enum(['DELIVERY_PERSON', 'ADMIN']),
  iat: z.number(),
})

export type UserPayload = z.infer<typeof tokenPayloadSchema>

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'access-token',
) {
  constructor(
    private prismaService: PrismaService,
    config: EnvService,
  ) {
    const secret = config.get('ACCESS_TOKEN_SECRET')
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
      algorithms: ['HS256'],
    })
  }

  async validate(payload: UserPayload) {
    const validatedPayload = tokenPayloadSchema.parse(payload)

    const session = await this.prismaService.session.findUnique({
      where: {
        id: validatedPayload.sessionId,
      },
    })

    if (!session) throw new UnauthorizedException({ message: 'Unauthorized' })

    return validatedPayload
  }
}
