import { PackageRepository } from '../repositories/package-repository'
import { PackageNotFoundError } from './errors/package-not-found'

interface RemovePackageUseCaseRequest {
  packageId: string
}

export class RemovePackageUseCase {
  constructor(private packageRepository: PackageRepository) {}

  async execute({ packageId }: RemovePackageUseCaseRequest) {
    const pckg = await this.packageRepository.findById(packageId)

    if (!pckg) throw new PackageNotFoundError(packageId)

    await this.packageRepository.delete(pckg)
  }
}
