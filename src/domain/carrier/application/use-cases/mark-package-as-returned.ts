import { State } from '../../enterprise/entities/package'
import { PackageRepository } from '../repositories/package-repository'
import { PackageDoesNotExistsError } from './errors/package-does-not-exists-error'

interface MarkPackageAsReturnedUseCaseRequest {
  packageId: string
}

export class MarkPackageAsReturnedUseCase {
  constructor(private packageRepository: PackageRepository) {}

  async execute({ packageId }: MarkPackageAsReturnedUseCaseRequest) {
    const pckg = await this.packageRepository.findById(packageId)

    if (!pckg) throw new PackageDoesNotExistsError(packageId)

    pckg.state = State.RETURNED
  }
}
