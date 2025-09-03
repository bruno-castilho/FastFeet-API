import { PackageRepository } from '../repositories/package-repository'
import { PackageDoesNotExistsError } from './errors/package-does-not-exists-error'

interface GetPackageUseCaseRequest {
  packageId: string
}

export class GetPackageUseCase {
  constructor(private packageRepository: PackageRepository) {}

  async execute({ packageId }: GetPackageUseCaseRequest) {
    const pckg = await this.packageRepository.findById(packageId)

    if (!pckg) throw new PackageDoesNotExistsError(packageId)

    return { pckg }
  }
}
