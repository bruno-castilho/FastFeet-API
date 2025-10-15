import { UserRepository } from '@/domain/users/application/repositories/user-repository'
import { PrismaService } from '../prisma.service'
import { Injectable } from '@nestjs/common'
import { User } from '@/domain/users/enterprise/entities/user'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper'

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prismaService: PrismaService) {}

  async findByCPF(cpf: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        cpf,
      },
    })

    if (!user) return null

    return PrismaUserMapper.toDomain(user)
  }

  async findByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) return null

    return PrismaUserMapper.toDomain(user)
  }

  async create(user: User) {
    const data = PrismaUserMapper.toPrisma(user)

    await this.prismaService.user.create({
      data,
    })
  }
}
