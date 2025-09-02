import { RecipientRepository } from '@/domain/carrier/application/repositories/recipient-repository'
import { PrismaService } from '../prisma.service'
import { Recipient } from '@/domain/carrier/enterprise/entities/recipient'
import { PrismaRecipientMapper } from '../mappers/prisma-recipient-mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaRecipientRepository implements RecipientRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(id: string) {
    const recipient = await this.prismaService.recipient.findUnique({
      where: {
        id,
      },
    })

    if (!recipient) return null

    return PrismaRecipientMapper.toDomain(recipient)
  }

  async create(recipient: Recipient) {
    const data = PrismaRecipientMapper.toPrisma(recipient)

    await this.prismaService.recipient.create({
      data,
    })
  }

  async save(recipient: Recipient) {
    const data = PrismaRecipientMapper.toPrisma(recipient)

    await this.prismaService.recipient.update({
      data,
      where: {
        id: data.id,
      },
    })
  }

  async delete(recipient: Recipient) {
    await this.prismaService.recipient.delete({
      where: {
        id: recipient.id.toString(),
      },
    })
  }
}
