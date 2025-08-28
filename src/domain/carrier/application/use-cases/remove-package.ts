import { PackageRepository } from '../repositories/package-repository'
import { PackageDoesNotExistsError } from './errors/package-does-not-exists-error'

interface RemovePackageUseCaseRequest {
  packageId: string
}

export class RemovePackageUseCase {
  constructor(private packageRepository: PackageRepository) {}

  async execute({ packageId }: RemovePackageUseCaseRequest) {
    const pckg = await this.packageRepository.findById(packageId)

    if (!pckg) throw new PackageDoesNotExistsError(packageId)

    await this.packageRepository.delete(pckg)
  }
}
