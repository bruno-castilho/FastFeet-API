import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  DeliveryPerson,
  DeliveryPersonProps,
} from '@/domain/carrier/enterprise/entities/delivery-person'
import { CPF } from '@/domain/carrier/enterprise/entities/value-objects/cpf'
import { Email } from '@/domain/carrier/enterprise/entities/value-objects/email'

export function makeDeliveryPerson(
  override: Partial<DeliveryPersonProps> = {},
  id?: UniqueEntityID,
) {
  const deliveryPerson = DeliveryPerson.create(
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

  return deliveryPerson
}
