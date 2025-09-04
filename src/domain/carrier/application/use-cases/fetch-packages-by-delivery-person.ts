import { PackageRepository } from '../repositories/package-repository'

interface FetchPackageByDeliveryPersonUseCaseRequest {
  deliveryPersonId: string
  page: number
}

export class FetchPackagesByDeliveryPersonUseCase {
  constructor(private packageRepository: PackageRepository) {}

  async execute({
    deliveryPersonId,
    page,
  }: FetchPackageByDeliveryPersonUseCaseRequest) {
    const packages = await this.packageRepository.findManyByDeliveryPerson(
      deliveryPersonId,
      { page },
    )

    return { packages }
  }
}
