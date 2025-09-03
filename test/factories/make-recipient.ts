import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Recipient,
  RecipientProps,
} from '@/domain/carrier/enterprise/entities/recipient'
import { Phone } from '@/domain/carrier/enterprise/entities/value-objects/phone'
import { Email } from '@/domain/carrier/enterprise/entities/value-objects/email'
import { CEP } from '@/domain/carrier/enterprise/entities/value-objects/cep'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaRecipientMapper } from '@/infra/database/prisma/mappers/prisma-recipient-mapper'

export function makeRecipient(
  override: Partial<RecipientProps> = {},
  id?: UniqueEntityID,
) {
  const recipient = Recipient.create(
    {
      cep: CEP.create('00000-000'),
      city: faker.location.city(),
      country: faker.location.country(),
      state: faker.location.state(),
      neighborhood: faker.location.state(),
      complement: faker.location.secondaryAddress(),
      number: Number(faker.location.buildingNumber()),
      email: Email.create(faker.internet.email()),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phone: Phone.create('(00) 00000-0000'),
      streetAddress: faker.location.streetAddress(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      ...override,
    },
    id,
  )

  return recipient
}

@Injectable()
export class RecipientFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaRecipient(
    data: Partial<RecipientProps> = {},
  ): Promise<Recipient> {
    const recipient = makeRecipient(data)

    await this.prisma.recipient.create({
      data: PrismaRecipientMapper.toPrisma(recipient),
    })

    return recipient
  }
}
