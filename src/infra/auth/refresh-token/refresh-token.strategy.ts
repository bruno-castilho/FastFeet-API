import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { EnvService } from '@/infra/env/env.service'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
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
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh-token',
) {
  constructor(
    private prismaService: PrismaService,
    config: EnvService,
  ) {
    const publicKey = config.get('REFRESH_TOKEN_PUBLIC_KEY')

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req?.cookies?.refresh_token
        },
      ]),
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithms: ['RS256'],
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
