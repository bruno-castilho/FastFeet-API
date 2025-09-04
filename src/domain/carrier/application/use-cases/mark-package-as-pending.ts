import { PackageRepository } from '../repositories/package-repository'
import { PackageDoesNotExistsError } from './errors/package-does-not-exists-error'

interface MarkPackageAsPendingUseCaseRequest {
  packageId: string
}

export class MarkPackageAsPendingUseCase {
  constructor(private packageRepository: PackageRepository) {}

  async execute({ packageId }: MarkPackageAsPendingUseCaseRequest) {
    const pckg = await this.packageRepository.findById(packageId)

    if (!pckg) throw new PackageDoesNotExistsError(packageId)

    pckg.state = 'PENDING'
    pckg.postedAt = new Date()

    await this.packageRepository.save(pckg)
  }
}
