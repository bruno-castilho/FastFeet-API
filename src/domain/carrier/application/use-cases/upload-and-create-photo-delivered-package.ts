import { PhotoDeliveredPackage } from '../../enterprise/entities/photo-delivered-package'
import { PhotoDeliveredPackageRepository } from '../repositories/photo-delivered-package-repository'
import { Uploader } from '../storage/uploader'
import { InvalidPhotoDeliveredPackageTypeError } from './errors/invalid-photo-delivered-package-type-error'

interface UploadAndCreatePhotoDeliveredPackageRequest {
  fileName: string
  fileType: string
  body: Buffer
}

export class UploadAndCreatePhotoDeliveredPackageUseCase {
  constructor(
    private photoDeliveredPackageRepository: PhotoDeliveredPackageRepository,
    private uploader: Uploader,
  ) {}

  async execute({
    fileName,
    fileType,
    body,
  }: UploadAndCreatePhotoDeliveredPackageRequest) {
    if (!/^(image\/(jpeg|png))$/.test(fileType))
      throw new InvalidPhotoDeliveredPackageTypeError(fileType)

    const { url } = await this.uploader.upload({ fileName, fileType, body })

    const photoDeliveredPackage = PhotoDeliveredPackage.create({
      url,
    })

    await this.photoDeliveredPackageRepository.create(photoDeliveredPackage)

    return {
      photoDeliveredPackage,
    }
  }
}
