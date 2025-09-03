import { State } from '../../enterprise/entities/package'
import { DeliveryPersonRepository } from '../repositories/delivery-person-repository'
import { PackageRepository } from '../repositories/package-repository'
import { DeliveryPersonDoesNotExistsError } from './errors/delivery-person-does-not-exists-error'
import { PackageDoesNotExistsError } from './errors/package-does-not-exists-error'

interface MarkPackageAsPickedUpUseCaseRequest {
  packageId: string
  deliveryPersonId: string
}

export class MarkPackageAsPickedUpUseCase {
  constructor(
    private packageRepository: PackageRepository,
    private deliveryPersonRepository: DeliveryPersonRepository,
  ) {}

  async execute({
    packageId,
    deliveryPersonId,
  }: MarkPackageAsPickedUpUseCaseRequest) {
    const pckg = await this.packageRepository.findById(packageId)

    if (!pckg) throw new PackageDoesNotExistsError(packageId)

    const deliveryPerson =
      await this.deliveryPersonRepository.findById(deliveryPersonId)

    if (!deliveryPerson)
      throw new DeliveryPersonDoesNotExistsError(deliveryPersonId)

    pckg.state = State.PICKEDUP
    pckg.pickedUpAt = new Date()
    pckg.deliveredBy = deliveryPerson.id

    this.packageRepository.save(pckg)
  }
}
