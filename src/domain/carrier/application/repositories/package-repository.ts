import { Package } from '../../enterprise/entities/package'

export interface PackageRepository {
  create(pckg: Package): Promise<void>
}
