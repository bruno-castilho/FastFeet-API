import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PackageRepository } from '../repositories/package-repository'
import { RecipientRepository } from '../repositories/recipient-repository'
import { PackageDoesNotExistsError } from './errors/package-does-not-exists-error'
import { RecipientDoesNotExistsError } from './errors/recipient-does-not-exists-error'

interface UpdatePackageUseCaseRequest {
  packageId: string
  heightInCentimeters: number
  widthInCentimeters: number
  weightInGrams: number
  recipientId: string
}

export class UpdatePackageUseCase {
  constructor(
    private packageRepository: PackageRepository,
    private recipientRepository: RecipientRepository,
  ) {}

  async execute({
    packageId,
    heightInCentimeters,
    recipientId,
    weightInGrams,
    widthInCentimeters,
  }: UpdatePackageUseCaseRequest) {
    const pckg = await this.packageRepository.findById(packageId)

    if (!pckg) throw new PackageDoesNotExistsError(packageId)

    const recipientExists = await this.recipientRepository.findById(recipientId)

    if (!recipientExists) {
      throw new RecipientDoesNotExistsError(recipientId)
    }

    pckg.heightInCentimeters = heightInCentimeters
    pckg.widthInCentimeters = widthInCentimeters
    pckg.weightInGrams = weightInGrams
    pckg.recipientId = new UniqueEntityID(recipientId)

    await this.packageRepository.save(pckg)

    return pckg
  }
}
