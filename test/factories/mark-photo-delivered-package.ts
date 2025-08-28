import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  PhotoDeliveredPackage,
  PhotoDeliveredPackageProps,
} from '@/domain/carrier/enterprise/entities/photo-delivered-package'

export function makePhotoDeliveredPackage(
  override: Partial<PhotoDeliveredPackageProps> = {},
  id?: UniqueEntityID,
) {
  const photodeliveredpackagePerson = PhotoDeliveredPackage.create(
    {
      url: faker.internet.url(),
      ...override,
    },
    id,
  )

  return photodeliveredpackagePerson
}
