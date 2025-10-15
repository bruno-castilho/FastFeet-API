import { SessionRepository } from '@/domain/users/application/repositories/session-repository'
import { PrismaService } from '../prisma.service'
import { Injectable } from '@nestjs/common'
import { Session } from '@/domain/users/enterprise/entities/session'
import { PrismaSessionMapper } from '../mappers/prisma-session-mapper'

@Injectable()
export class PrismaSessionRepository implements SessionRepository {
  constructor(private prismaService: PrismaService) {}

  async create(session: Session) {
    const data = PrismaSessionMapper.toPrisma(session)

    await this.prismaService.session.create({
      data,
    })
  }
}
