import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaSessionMapper } from '@/infra/database/prisma/mappers/prisma-session-mapper'
import {
  Session,
  SessionProps,
} from '@/domain/users/enterprise/entities/session'

export function makeSession(
  override: Partial<SessionProps> = {},
  id?: UniqueEntityID,
) {
  const session = Session.create(
    {
      ip: faker.internet.ip(),
      userAgent: faker.internet.userAgent(),
      userId: new UniqueEntityID(),
      accessToken: faker.internet.jwt(),
      refreshToken: faker.internet.jwt(),
      updatedAt: new Date(),
      createdAt: new Date(),
      ...override,
    },
    id,
  )

  return session
}

@Injectable()
export class SessionFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaSession(
    data: Partial<SessionProps> = {},
    id?: UniqueEntityID,
  ): Promise<Session> {
    const session = makeSession(data, id)

    await this.prisma.session.create({
      data: PrismaSessionMapper.toPrisma(session),
    })

    return session
  }
}
