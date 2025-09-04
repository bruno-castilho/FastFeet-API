import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  PhotoDeliveredPackage,
  PhotoDeliveredPackageProps,
} from '@/domain/carrier/enterprise/entities/photo-delivered-package'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaPhotoDeliveredPackageMapper } from '@/infra/database/prisma/mappers/prisma-photo-delivered-package-mapper'

export function makePhotoDeliveredPackage(
  override: Partial<PhotoDeliveredPackageProps> = {},
  id?: UniqueEntityID,
) {
  const photoDeliveredPackage = PhotoDeliveredPackage.create(
    {
      url: faker.internet.url(),
      ...override,
    },
    id,
  )

  return photoDeliveredPackage
}

@Injectable()
export class PhotoDeliveredPackageFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaPhotoDeliveredPackage(
    data: Partial<PhotoDeliveredPackageProps> = {},
  ): Promise<PhotoDeliveredPackage> {
    const photoDelivered = makePhotoDeliveredPackage(data)

    await this.prisma.photoDeliveredPackage.create({
      data: PrismaPhotoDeliveredPackageMapper.toPrisma(photoDelivered),
    })

    return photoDelivered
  }
}
