import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Session } from '@/domain/users/enterprise/entities/session'

import { Prisma, Session as SessionPrisma } from '@prisma/client'

export class PrismaSessionMapper {
  static toPrisma(raw: Session): Prisma.SessionUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      accessToken: raw.accessToken,
      refreshToken: raw.refreshToken,
      userAgent: raw.userAgent,
      ip: raw.ip,
      userId: raw.userId.toString(),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    }
  }

  static toDomain(raw: SessionPrisma): Session {
    return Session.create(
      {
        accessToken: raw.accessToken,
        refreshToken: raw.refreshToken,
        userAgent: raw.userAgent,
        ip: raw.ip,
        userId: new UniqueEntityID(raw.userId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }
}
