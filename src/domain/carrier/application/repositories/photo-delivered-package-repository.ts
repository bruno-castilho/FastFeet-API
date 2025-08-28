import { PhotoDeliveredPackage } from '../../enterprise/entities/photo-delivered-package'

export interface PhotoDeliveredPackageRepository {
  findById(id: string): Promise<PhotoDeliveredPackage | null>
  create(photodeliveredpackage: PhotoDeliveredPackage): Promise<void>
}
