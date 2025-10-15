import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeliveryPerson } from '@/domain/carrier/enterprise/entities/delivery-person'
import { CPF } from '@/core/entities/value-objects/cpf'
import { Email } from '@/core/entities/value-objects/email'
import { Prisma, User } from '@prisma/client'

export class PrismaDeliveryPersonMapper {
  static toPrisma(raw: DeliveryPerson): Prisma.UserUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      email: raw.email.value,
      firstName: raw.firstName,
      lastName: raw.lastName,
      cpf: raw.cpf.value,
      password: raw.password,
      role: 'DELIVERY_PERSON',
    }
  }

  static toDomain(raw: User): DeliveryPerson {
    return DeliveryPerson.create(
      {
        firstName: raw.firstName,
        lastName: raw.lastName,
        cpf: CPF.create(raw.cpf),
        email: Email.create(raw.email),
        password: raw.password,
      },
      new UniqueEntityID(raw.id),
    )
  }
}
