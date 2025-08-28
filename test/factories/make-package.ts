import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Package,
  PackageProps,
  State,
} from '@/domain/carrier/enterprise/entities/package'
import { randomUUID } from 'node:crypto'

export function makePackage(
  override: Partial<PackageProps> = {},
  id?: UniqueEntityID,
) {
  const pckg = Package.create(
    {
      weightInGrams: faker.number.int(),
      heightInCentimeters: faker.number.int(),
      widthInCentimeters: faker.number.int(),
      recipientId: new UniqueEntityID(randomUUID()),
      state: State.CREATED,
      ...override,
    },
    id,
  )

  return pckg
}
