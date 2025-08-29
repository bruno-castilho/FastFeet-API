import { PaginationParams } from '@/core/repositories/pagination-params'
import { Package } from '../../enterprise/entities/package'

export interface PackageRepository {
  findById(id: string): Promise<Package | null>
  create(pckg: Package): Promise<void>
  save(pckg: Package): Promise<void>
  delete(pckg: Package): Promise<void>
  findManyByDeliveryPerson(
    deliveryPersonId: string,
    params: PaginationParams,
  ): Promise<Package[]>

  findManyNearbyPanding(
    latitude: number,
    longitude: number,
    params: PaginationParams,
  ): Promise<Package[]>
}
