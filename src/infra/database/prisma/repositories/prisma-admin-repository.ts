import { AdminRepository } from '@/domain/carrier/application/repositories/admin-repository'
import { PrismaService } from '../prisma.service'
import { Injectable } from '@nestjs/common'
import { PrismaAdminMapper } from '../mappers/prisma-admin-mapper'
import { Admin } from '@/domain/carrier/enterprise/entities/admin'

@Injectable()
export class PrismaAdminRepository implements AdminRepository {
  constructor(private prismaService: PrismaService) {}

  async findByCPF(cpf: string): Promise<Admin | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        cpf,
        role: 'ADMIN',
      },
    })

    if (!user) return null

    return PrismaAdminMapper.toDomain(user)
  }
}
