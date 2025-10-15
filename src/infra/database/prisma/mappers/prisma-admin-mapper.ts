import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Admin } from '@/domain/carrier/enterprise/entities/admin'

import { CPF } from '@/core/entities/value-objects/cpf'
import { Email } from '@/core/entities/value-objects/email'
import { Prisma, User } from '@prisma/client'

export class PrismaAdminMapper {
  static toPrisma(raw: Admin): Prisma.UserUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      email: raw.email.value,
      firstName: raw.firstName,
      lastName: raw.lastName,
      cpf: raw.cpf.value,
      password: raw.password,
      role: 'ADMIN',
    }
  }

  static toDomain(raw: User): Admin {
    return Admin.create(
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
