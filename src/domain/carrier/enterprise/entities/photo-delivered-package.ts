import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface PhotoDeliveredPackageProps {
  url: string
  packageId?: UniqueEntityID | null
}

export class PhotoDeliveredPackage extends Entity<PhotoDeliveredPackageProps> {
  static create(props: PhotoDeliveredPackageProps, id?: UniqueEntityID) {
    return new PhotoDeliveredPackage(props, id)
  }

  get url() {
    return this.props.url
  }

  set url(url: string) {
    this.props.url = url
  }

  get packageId() {
    return this.props.packageId || null
  }

  set packageId(packageId: UniqueEntityID | null) {
    this.props.packageId = packageId
  }
}
