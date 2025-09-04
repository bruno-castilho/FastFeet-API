import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PhotoDeliveredPackage } from '@/domain/carrier/enterprise/entities/photo-delivered-package'

import {
  Prisma,
  PhotoDeliveredPackage as PhotoDeliveredPackagePrisma,
} from '@prisma/client'

export class PrismaPhotoDeliveredPackageMapper {
  static toPrisma(
    raw: PhotoDeliveredPackage,
  ): Prisma.PhotoDeliveredPackageUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      packageId: raw.packageId?.toString(),
      url: raw.url,
    }
  }

  static toDomain(raw: PhotoDeliveredPackagePrisma): PhotoDeliveredPackage {
    return PhotoDeliveredPackage.create(
      {
        url: raw.url,
        packageId: raw.packageId ? new UniqueEntityID(raw.packageId) : null,
      },
      new UniqueEntityID(raw.id),
    )
  }
}
