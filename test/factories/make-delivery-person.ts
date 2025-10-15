import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  DeliveryPerson,
  DeliveryPersonProps,
} from '@/domain/carrier/enterprise/entities/delivery-person'
import { CPF } from '@/core/entities/value-objects/cpf'
import { Email } from '@/core/entities/value-objects/email'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaDeliveryPersonMapper } from '@/infra/database/prisma/mappers/prisma-delivery-person-mapper'

export function makeDeliveryPerson(
  override: Partial<DeliveryPersonProps> = {},
  id?: UniqueEntityID,
) {
  const deliveryPerson = DeliveryPerson.create(
    {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      cpf: CPF.create('06921016595'),
      email: Email.create(faker.internet.email()),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return deliveryPerson
}

@Injectable()
export class DeliveryPersonFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaDeliveryPerson(
    data: Partial<DeliveryPersonProps> = {},
  ): Promise<DeliveryPerson> {
    const deliveryPerson = makeDeliveryPerson(data)

    await this.prisma.user.create({
      data: PrismaDeliveryPersonMapper.toPrisma(deliveryPerson),
    })

    return deliveryPerson
  }
}
