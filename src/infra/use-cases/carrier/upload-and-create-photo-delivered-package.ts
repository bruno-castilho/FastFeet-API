import { Injectable } from '@nestjs/common'
import { UploadAndCreatePhotoDeliveredPackageUseCase } from '@/domain/carrier/application/use-cases/upload-and-create-photo-delivered-package'
import { PrismaPhotoDeliveredPackageRepository } from '@/infra/database/prisma/repositories/prisma-photo-delivered-package-repository'
import { S3Storage } from '@/infra/storage/s3-storage'

@Injectable()
export class UploadAndCreatePhotoDeliveredPackage extends UploadAndCreatePhotoDeliveredPackageUseCase {
  constructor(
    photoDeliveredPackageRepository: PrismaPhotoDeliveredPackageRepository,
    s3Storage: S3Storage,
  ) {
    super(photoDeliveredPackageRepository, s3Storage)
  }
}
