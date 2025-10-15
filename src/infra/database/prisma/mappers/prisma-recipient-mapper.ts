import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Recipient } from '@/domain/carrier/enterprise/entities/recipient'
import { CEP } from '@/core/entities/value-objects/cep'
import { Email } from '@/core/entities/value-objects/email'
import { Phone } from '@/core/entities/value-objects/phone'
import { Prisma, Recipient as RecipientPrisma } from '@prisma/client'

export class PrismaRecipientMapper {
  static toPrisma(raw: Recipient): Prisma.RecipientUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      email: raw.email.value,
      phone: raw.phone.value,
      firstName: raw.firstName,
      lastName: raw.lastName,
      cep: raw.cep.value,
      neighborhood: raw.neighborhood,
      city: raw.city,
      state: raw.state,
      country: raw.country,
      streetAddress: raw.streetAddress,
      number: raw.number,
      complement: raw.complement,
      latitude: raw.latitude,
      longitude: raw.longitude,
    }
  }

  static toDomain(raw: RecipientPrisma): Recipient {
    return Recipient.create(
      {
        email: Email.create(raw.email),
        phone: Phone.create(raw.phone),
        firstName: raw.firstName,
        lastName: raw.lastName,
        cep: CEP.create(raw.cep),
        neighborhood: raw.neighborhood,
        city: raw.city,
        state: raw.state,
        country: raw.country,
        streetAddress: raw.streetAddress,
        number: raw.number,
        complement: raw.complement,
        latitude: raw.latitude,
        longitude: raw.longitude,
      },
      new UniqueEntityID(raw.id),
    )
  }
}
