import { DeliveryPersonRepository } from '@/domain/carrier/application/repositories/delivery-person-repository'
import { PrismaService } from '../prisma.service'
import { DeliveryPerson } from '@/domain/carrier/enterprise/entities/delivery-person'
import { PrismaDeliveryPersonMapper } from '../mappers/prisma-delivery-person-mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaDeliveryPersonRepository
  implements DeliveryPersonRepository
{
  constructor(private prismaService: PrismaService) {}

  async findById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
        role: 'DELIVERY_PERSON',
      },
    })

    if (!user) return null

    return PrismaDeliveryPersonMapper.toDomain(user)
  }

  async findByCPF(cpf: string): Promise<DeliveryPerson | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        cpf,
        role: 'DELIVERY_PERSON',
      },
    })

    if (!user) return null

    return PrismaDeliveryPersonMapper.toDomain(user)
  }

  async findByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
        role: 'DELIVERY_PERSON',
      },
    })

    if (!user) return null

    return PrismaDeliveryPersonMapper.toDomain(user)
  }

  async create(deliveryPerson: DeliveryPerson) {
    const data = PrismaDeliveryPersonMapper.toPrisma(deliveryPerson)

    await this.prismaService.user.create({
      data,
    })
  }

  async save(deliveryPerson: DeliveryPerson) {
    const data = PrismaDeliveryPersonMapper.toPrisma(deliveryPerson)

    await this.prismaService.user.update({
      data,
      where: {
        id: data.id,
        role: 'DELIVERY_PERSON',
      },
    })
  }

  async delete(deliveryPerson: DeliveryPerson) {
    await this.prismaService.user.delete({
      where: {
        id: deliveryPerson.id.toString(),
        role: 'DELIVERY_PERSON',
      },
    })
  }
}
