import { MarkPackageAsDeliveredUseCase } from '@/domain/carrier/application/use-cases/mark-package-as-delivered'
import { PrismaPackageRepository } from '../database/prisma/repositories/prisma-package-repository'
import { Injectable } from '@nestjs/common'
import { PrismaPhotoDeliveredPackageRepository } from '../database/prisma/repositories/prisma-photo-delivered-package-repository'

@Injectable()
export class MarkPackageAsDelivered extends MarkPackageAsDeliveredUseCase {
  constructor(
    packageRepository: PrismaPackageRepository,
    photoDeliveredPackageRepository: PrismaPhotoDeliveredPackageRepository,
  ) {
    super(packageRepository, photoDeliveredPackageRepository)
  }
}
