import { PackageRepository } from '../repositories/package-repository'
import { PackageNotFoundError } from './errors/package-not-found'

interface GetPackageUseCaseRequest {
  packageId: string
}

export class GetPackageUseCase {
  constructor(private packageRepository: PackageRepository) {}

  async execute({ packageId }: GetPackageUseCaseRequest) {
    const pckg = await this.packageRepository.findById(packageId)

    if (!pckg) throw new PackageNotFoundError(packageId)

    return pckg
  }
}
