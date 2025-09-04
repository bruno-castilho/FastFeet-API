import { PrismaService } from '../prisma.service'
import { Injectable } from '@nestjs/common'
import { PhotoDeliveredPackageRepository } from '@/domain/carrier/application/repositories/photo-delivered-package-repository'

import { PhotoDeliveredPackage } from '@/domain/carrier/enterprise/entities/photo-delivered-package'
import { PrismaPhotoDeliveredPackageMapper } from '../mappers/prisma-photo-delivered-package-mapper'

@Injectable()
export class PrismaPhotoDeliveredPackageRepository
  implements PhotoDeliveredPackageRepository
{
  constructor(private prismaService: PrismaService) {}

  async findById(id: string) {
    const photoDeliveredPackage =
      await this.prismaService.photoDeliveredPackage.findUnique({
        where: {
          id,
        },
      })

    if (!photoDeliveredPackage) return null

    return PrismaPhotoDeliveredPackageMapper.toDomain(photoDeliveredPackage)
  }

  async create(photoDeliveredPackage: PhotoDeliveredPackage) {
    const data = PrismaPhotoDeliveredPackageMapper.toPrisma(
      photoDeliveredPackage,
    )

    await this.prismaService.photoDeliveredPackage.create({
      data,
    })
  }

  async save(photoDeliveredPackage: PhotoDeliveredPackage) {
    const data = PrismaPhotoDeliveredPackageMapper.toPrisma(
      photoDeliveredPackage,
    )

    await this.prismaService.photoDeliveredPackage.update({
      data,
      where: {
        id: data.id,
      },
    })
  }
}
