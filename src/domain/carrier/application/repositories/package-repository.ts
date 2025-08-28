import { Package } from '../../enterprise/entities/package'

export interface PackageRepository {
  findById(id: string): Promise<Package | null>
  create(pckg: Package): Promise<void>
}
