import { MarkPackageAsDeliveredUseCase } from '@/domain/carrier/application/use-cases/mark-package-as-delivered'
import { PrismaPackageRepository } from '@/infra/database/prisma/repositories/prisma-package-repository'
import { PrismaPhotoDeliveredPackageRepository } from '@/infra/database/prisma/repositories/prisma-photo-delivered-package-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class MarkPackageAsDelivered extends MarkPackageAsDeliveredUseCase {
  constructor(
    packageRepository: PrismaPackageRepository,
    photoDeliveredPackageRepository: PrismaPhotoDeliveredPackageRepository,
  ) {
    super(packageRepository, photoDeliveredPackageRepository)
  }
}
