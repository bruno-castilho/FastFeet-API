import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PackageRepository } from '../repositories/package-repository'
import { PhotoDeliveredPackageRepository } from '../repositories/photo-delivered-package-repository'
import { PackageDoesNotExistsError } from './errors/package-does-not-exists-error'
import { PhotoDeliveredPackageDoesNotExistsError } from './errors/photo-delivered-package-does-not-exists-error'
import { DeliveryPersonIsNotPickedUpThePackageError } from './errors/delivery-person-is-not-picked-up-the-package-error'

interface MarkPackageAsDeliveredUseCaseRequest {
  packageId: string
  deliveryPersonId: string
  photoDeliveredPackageId: string
}

export class MarkPackageAsDeliveredUseCase {
  constructor(
    private packageRepository: PackageRepository,
    private photoDeliveredPackageRepository: PhotoDeliveredPackageRepository,
  ) {}

  async execute({
    packageId,
    deliveryPersonId,
    photoDeliveredPackageId,
  }: MarkPackageAsDeliveredUseCaseRequest) {
    const pckg = await this.packageRepository.findById(packageId)

    if (!pckg) throw new PackageDoesNotExistsError(packageId)

    if (pckg.deliveredBy?.toValue() !== deliveryPersonId)
      throw new DeliveryPersonIsNotPickedUpThePackageError()

    const photoDeliveredPackage =
      await this.photoDeliveredPackageRepository.findById(
        photoDeliveredPackageId,
      )

    if (!photoDeliveredPackage)
      throw new PhotoDeliveredPackageDoesNotExistsError(photoDeliveredPackageId)

    photoDeliveredPackage.packageId = new UniqueEntityID(packageId)

    pckg.state = 'DELIVERED'
    pckg.deliveredAt = new Date()

    this.photoDeliveredPackageRepository.save(photoDeliveredPackage)
    this.packageRepository.save(pckg)
  }
}
