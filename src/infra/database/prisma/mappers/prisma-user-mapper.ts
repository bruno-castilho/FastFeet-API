import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CPF } from '@/core/entities/value-objects/cpf'
import { Email } from '@/core/entities/value-objects/email'
import { User } from '@/domain/users/enterprise/entities/user'
import { Role } from '@/domain/users/enterprise/entities/value-objects/role'
import { Prisma, User as UserPrisma } from '@prisma/client'

export class PrismaUserMapper {
  static toPrisma(raw: User): Prisma.UserUncheckedCreateInput {
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

  static toDomain(raw: UserPrisma): User {
    return User.create(
      {
        firstName: raw.firstName,
        lastName: raw.lastName,
        cpf: CPF.create(raw.cpf),
        email: Email.create(raw.email),
        password: raw.password,
        role: Role.create(raw.role),
      },
      new UniqueEntityID(raw.id),
    )
  }
}
