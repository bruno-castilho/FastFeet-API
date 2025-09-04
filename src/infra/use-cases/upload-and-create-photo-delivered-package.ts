import { Injectable } from '@nestjs/common'
import { UploadAndCreatePhotoDeliveredPackageUseCase } from '@/domain/carrier/application/use-cases/upload-and-create-photo-delivered-package'
import { R2Storage } from '../storage/r2-storage'
import { PrismaPhotoDeliveredPackageRepository } from '../database/prisma/repositories/prisma-photo-delivered-package-repository'

@Injectable()
export class UploadAndCreatePhotoDeliveredPackage extends UploadAndCreatePhotoDeliveredPackageUseCase {
  constructor(
    photoDeliveredPackageRepository: PrismaPhotoDeliveredPackageRepository,
    r2Storage: R2Storage,
  ) {
    super(photoDeliveredPackageRepository, r2Storage)
  }
}
