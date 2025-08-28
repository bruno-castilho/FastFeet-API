import { Package } from '../../enterprise/entities/package'

export interface PackageRepository {
  findById(id: string): Promise<Package | null>
  create(pckg: Package): Promise<void>
  save(pckg: Package): Promise<void>
  delete(pckg: Package): Promise<void>
}
