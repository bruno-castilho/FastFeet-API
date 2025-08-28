import { PhotoDeliveredPackageRepository } from '@/domain/carrier/application/repositories/photo-delivered-package-repository'
import { PhotoDeliveredPackage } from '@/domain/carrier/enterprise/entities/photo-delivered-package'

export class InMemoryPhotoDeliveredPackageRepository
  implements PhotoDeliveredPackageRepository
{
  public items: PhotoDeliveredPackage[] = []

  async findById(id: string) {
    const photoDeliveredPackage = this.items.find(
      (item) => item.id.toValue() === id,
    )

    if (!photoDeliveredPackage) {
      return null
    }

    return photoDeliveredPackage
  }

  async create(photoDeliveredPackage: PhotoDeliveredPackage) {
    this.items.push(photoDeliveredPackage)
  }
}
