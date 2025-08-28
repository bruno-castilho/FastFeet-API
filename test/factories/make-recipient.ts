import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Recipient,
  RecipientProps,
} from '@/domain/carrier/enterprise/entities/recipient'
import { Phone } from '@/domain/carrier/enterprise/entities/value-objects/phone'
import { Email } from '@/domain/carrier/enterprise/entities/value-objects/email'
import { CEP } from '@/domain/carrier/enterprise/entities/value-objects/cep'

export function makeRecipient(
  override: Partial<RecipientProps> = {},
  id?: UniqueEntityID,
) {
  const pckg = Recipient.create(
    {
      cep: CEP.create('00000-000'),
      city: faker.location.city(),
      country: faker.location.country(),
      state: faker.location.state(),
      neighborhood: faker.location.state(),
      complement: faker.location.secondaryAddress(),
      number: faker.number.int(),
      email: Email.create(faker.internet.email()),
      name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      phone: Phone.create('(00) 00000-0000'),
      street_address: faker.location.streetAddress(),
      ...override,
    },
    id,
  )

  return pckg
}
