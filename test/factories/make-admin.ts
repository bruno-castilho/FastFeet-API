import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { CPF } from '@/domain/carrier/enterprise/entities/value-objects/cpf'
import { Email } from '@/domain/carrier/enterprise/entities/value-objects/email'
import { Admin, AdminProps } from '@/domain/carrier/enterprise/entities/admin'

export function makeAdmin(
  override: Partial<AdminProps> = {},
  id?: UniqueEntityID,
) {
  const admin = Admin.create(
    {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      cpf: CPF.create('39053344705'),
      email: Email.create(faker.internet.email()),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return admin
}
