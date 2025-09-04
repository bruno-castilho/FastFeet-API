import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Package } from '../../enterprise/entities/package'
import { PackageRepository } from '../repositories/package-repository'
import { RecipientRepository } from '../repositories/recipient-repository'
import { RecipientDoesNotExistsError } from './errors/recipient-does-not-exists-error'

interface CreatePackageUseCaseRequest {
  heightInCentimeters: number
  widthInCentimeters: number
  weightInGrams: number
  recipientId: string
}

export class CreatePackageUseCase {
  constructor(
    private packageRepository: PackageRepository,
    private recipientRepository: RecipientRepository,
  ) {}

  async execute({
    heightInCentimeters,
    recipientId,
    weightInGrams,
    widthInCentimeters,
  }: CreatePackageUseCaseRequest) {
    const recipientExists = await this.recipientRepository.findById(recipientId)

    if (!recipientExists) {
      throw new RecipientDoesNotExistsError(recipientId)
    }

    const pckg = Package.create({
      heightInCentimeters,
      widthInCentimeters,
      weightInGrams,
      state: 'CREATED',
      recipientId: new UniqueEntityID(recipientId),
    })

    await this.packageRepository.create(pckg)
  }
}
