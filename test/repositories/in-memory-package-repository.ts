import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { PackageRepository } from '@/domain/carrier/application/repositories/package-repository'
import { Package } from '@/domain/carrier/enterprise/entities/package'

export class InMemoryPackageRepository implements PackageRepository {
  public items: Package[] = []

  async findById(id: string) {
    const pckg = this.items.find((item) => item.id.toValue() === id)

    if (!pckg) {
      return null
    }

    return pckg
  }

  async create(pckg: Package) {
    this.items.push(pckg)
  }

  async save(pckg: Package) {
    const itemIndex = this.items.findIndex((item) => item.id === pckg.id)

    this.items[itemIndex] = pckg

    DomainEvents.dispatchEventsForAggregate(pckg.id)
  }

  async delete(pckg: Package) {
    const itemIndex = this.items.findIndex((item) => item.id === pckg.id)

    this.items.splice(itemIndex, 1)
  }

  async findManyByDeliveryPerson(
    deliveryPersonId: string,
    { page }: PaginationParams,
  ) {
    const packages = this.items
      .filter((item) => item.deliveredBy?.toString() === deliveryPersonId)
      .slice((page - 1) * 20, page * 20)

    return packages
  }

  async findManyNearbyPanding(
    latitude: number,
    longitude: number,
    { page }: PaginationParams,
  ) {
    const packages = this.items.slice((page - 1) * 20, page * 20)

    return packages
  }
}
