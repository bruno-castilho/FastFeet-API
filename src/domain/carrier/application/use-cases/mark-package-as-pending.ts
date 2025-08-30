import { State } from '../../enterprise/entities/package'
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

    pckg.state = State.PENDING
    pckg.postedAt = new Date()

    this.packageRepository.save(pckg)
  }
}
